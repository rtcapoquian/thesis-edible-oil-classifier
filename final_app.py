import tkinter as tk
from tkinter import messagebox, ttk
import time
import threading
import joblib
import pandas as pd
import numpy as np
import os
import csv
import serial
import random

# Config
# SERIAL_PORT = '/dev/ttyUSB0'  # linux-based port
SERIAL_PORT = 'COM7'    # windows-based port
BAUD_RATE = 9600
MODEL_DIR = 'models'
DATA_DIR = 'data'
os.makedirs(DATA_DIR, exist_ok=True)

class EdibleOilApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Edible Oil Classifier")
        self.root.geometry("720x480")
        self.root.configure(bg="#2c2c2c")
        self.current_model = None
        self.duration = 0

        # Initialize pages
        self.pages = {}
        self.init_pages()
        self.show_page("HomePage")

    def init_pages(self):
        self.pages["HomePage"] = HomePage(self)
        self.pages["ModelSelectionPage"] = ModelSelectionPage(self)
        self.pages["DataGatheringPage"] = DataGatheringPage(self)
        self.pages["ConfirmationPage"] = ConfirmationPage(self)
        self.pages["ProgressPage"] = ProgressPage(self)
        self.pages["SamplePrepPage"] = SamplePrepPage(self)
        self.pages["SampleConfirmationPage"] = SampleConfirmationPage(self)
        self.pages["SampleProgressPage"] = SampleProgressPage(self)
        self.pages["TrainClassifyPage"] = TrainClassifyPage(self)
        self.pages["TrainingPage"] = TrainingPage(self)
        self.pages["ClassificationPage"] = ClassificationPage(self)

    def show_page(self, page_name):
        for page in self.pages.values():
            page.hide()
        self.pages[page_name].show()


class BasePage(tk.Frame):
    def __init__(self, parent, controller):
        super().__init__(controller.root)
        self.controller = controller
        self.configure(bg="#2c2c2c")

    def show(self):
        self.pack(fill="both", expand=True)

    def hide(self):
        self.pack_forget()


class HomePage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        tk.Label(self.center_frame, text="Animal/Plant Edible Oil Classifier",
                 fg="white", bg="#2c2c2c", font=("Arial", 18, "bold")).pack(pady=20)
        tk.Button(self.center_frame, text="Start", bg="green", fg="white",
                  font=("Arial", 16), command=lambda: controller.show_page("DataGatheringPage")).pack(pady=20)

class DataGatheringPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)
        
        tk.Button(self, text="Back", bg="red", fg="white",
                  command=lambda: controller.show_page("HomePage")).place(x=10, y=10)

        tk.Label(self.center_frame, text="Proceed to Gather Baseline Data?", fg="white", bg="#2c2c2c", font=("Arial", 16)).pack(pady=20)
        tk.Button(self.center_frame, text="Proceed", bg="blue", fg="white", font=("Arial", 16),
                  command=self.start_baseline_collection).pack(pady=20)

    def start_baseline_collection(self):
        self.controller.duration = 61  # Baseline duration is fixed at 60 seconds
        #self.controller.show_page("ConfirmationPage")
        self.controller.show_page("ConfirmationPage")

# BASELINE DATA GATHERING FOR ACTUAL PROTOTYPE
class ConfirmationPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        tk.Button(self, text="Back", bg="red", fg="white",
                  command=lambda: controller.show_page("DataGatheringPage")).place(x=10, y=10)

        tk.Label(self.center_frame, text="Ensure the chamber is free of samples and only exposed to clean air.",
                 fg="white", bg="#2c2c2c", font=("Arial", 14), wraplength=400).pack(pady=20)

        tk.Button(self.center_frame, text="Confirm and Start Gathering", bg="green", fg="white", font=("Arial", 14),
                  command=self.start_baseline_gathering).pack(pady=20)

    def start_baseline_gathering(self):
        self.controller.show_page("ProgressPage")
        thread = threading.Thread(target=self.collect_baseline_data)
        thread.start()

    def collect_baseline_data(self):
        duration = self.controller.duration
        filename = os.path.join(DATA_DIR, "baseline_data.csv")

        # Initialize the serial connection
        try:
            ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
            time.sleep(3)  # Allow time for the serial connection to establish
        except Exception as e:
            messagebox.showerror("Error", f"Unable to connect to the serial port: {e}")
            return

        # Open the CSV file for writing
        with open(filename, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow(["MQ2", "MQ3", "MQ4", "MQ5", "MQ6", "MQ7", "MQ8", "MQ9", "MQ135", "MQ137"])

            start_time = time.time()

            try:
                while time.time() - start_time < duration:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    if line:
                        data = line.split(',')
                        if len(data) == 10:
                            csvwriter.writerow(data)
                            # Notify ProgressPage to update progress
                            elapsed_time = int(time.time() - start_time)
                            self.controller.pages["ProgressPage"].update_progress(elapsed_time)
                        else:
                            print(f"Skipped invalid data: {data}")
                    else:
                        print("No data received from the serial port.")
            except Exception as e:
                messagebox.showerror("Error", f"An error occurred during data collection: {e}")
            finally:
                ser.close()

        # Notify completion
        self.controller.pages["ProgressPage"].mark_completion()

class ProgressPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        self.progress = ttk.Progressbar(self.center_frame, mode="determinate", length=300)
        self.progress.pack(expand=True, pady=50)

        self.label = tk.Label(self.center_frame, text="Gathering Baseline Data...", fg="white", bg="#2c2c2c", font=("Arial", 14))
        self.label.pack(pady=10)

        self.complete_label = None
        self.proceed_button = None

    def update_progress(self, elapsed_time):
        self.progress["value"] = (elapsed_time / 60) * 100
        self.progress.update()
        self.label.config(text=f"Elapsed Time: {elapsed_time} seconds / 60 seconds")

    '''
    def mark_completion(self):
        if self.complete_label is None:
            self.complete_label = tk.Label(self.center_frame, text="Baseline data gathering complete.",
                                           fg="green", bg="#2c2c2c", font=("Arial", 14))
            self.complete_label.pack(pady=20)

        if self.proceed_button is None:
            self.proceed_button = tk.Button(self.center_frame, text="Proceed", bg="blue", fg="white", font=("Arial", 14),
                                            command=self.proceed_to_sample_collection)
            self.proceed_button.pack(pady=20)
    '''
            
    def mark_completion(self):
        self.controller.show_page("SamplePrepPage")
        self.controller.pages["SamplePrepPage"].start_timer()

class SamplePrepPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        self.progress = ttk.Progressbar(self.center_frame, mode="determinate", length=300)
        self.progress.pack(expand=True, pady=50)

        self.label = tk.Label(self.center_frame, text="Preparing Sample Chamber...",
                              fg="white", bg="#2c2c2c", font=("Arial", 14))
        self.label.pack(pady=10)

    def start_timer(self):
        self.progress["value"] = 0  # Reset progress bar
        self.elapsed_time = 0  # Reset elapsed time
        self.update_progress()

    def update_progress(self):
        if self.elapsed_time < 61:
            self.progress["value"] = (self.elapsed_time / 61) * 100
            self.progress.update()
            self.label.config(text=f"Buffer Time: {self.elapsed_time} seconds / 60 seconds")

            self.elapsed_time += 1
            self.after(1000, self.update_progress)
        else:
            self.controller.duration = 601
            self.label.config(text="Sample preparation complete.")
            self.controller.show_page("SampleConfirmationPage")
            self.controller.pages["SampleConfirmationPage"].start_sample_gathering()

class SampleConfirmationPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)
        
        '''
        tk.Button(self, text="Back", bg="red", fg="white",
                  command=lambda: controller.show_page("SampleDataGatheringPage")).place(x=10, y=10)

        tk.Label(self.center_frame, text="Ensure the sample is placed in the chamber and properly secured.",
                 fg="white", bg="#2c2c2c", font=("Arial", 14), wraplength=400).pack(pady=20)

        tk.Button(self.center_frame, text="Confirm and Start Gathering", bg="green", fg="white", font=("Arial", 14),
                  command=self.start_sample_gathering).pack(pady=20)
        '''

        tk.Label(self.center_frame, text="Collecting Sample Data...",
                 fg="white", bg="#2c2c2c", font=("Arial", 14), wraplength=400).pack(pady=20)
    def start_sample_gathering(self):
        """Start the sample data gathering process in a separate thread."""
        self.controller.show_page("SampleProgressPage")
        thread = threading.Thread(target=self.collect_sample_data)
        thread.start()

    def collect_sample_data(self):
        """Collect sample data from the serial port."""
        duration = self.controller.duration
        filename = os.path.join(DATA_DIR, "sample_data.csv")
        start_time = time.time()

        try:
            ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
            time.sleep(3)
        except Exception as e:
            messagebox.showerror("Error", f"Unable to open serial port: {e}")
            return

        with open(filename, 'w', newline='') as csvfile:
            csvwriter = csv.writer(csvfile)
            csvwriter.writerow(["MQ2", "MQ3", "MQ4", "MQ5", "MQ6", "MQ7", "MQ8", "MQ9", "MQ135", "MQ137"])

            try:
                while time.time() - start_time < duration:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    if line:
                        data = line.split(',')
                        if len(data) == 10:
                            csvwriter.writerow(data)

                            elapsed_time = int(time.time() - start_time)
                            self.controller.pages["SampleProgressPage"].update_progress(elapsed_time)
                        else:
                            print(f"Skipped invalid data: {data}")
                    else:
                        print("No data received from the serial port.")
            except Exception as e:
                messagebox.showerror("Error", f"An error occurred during data collection: {e}")
            finally:
                ser.close()

        # Notify completion
        self.controller.pages["SampleProgressPage"].mark_completion()



class SampleProgressPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        self.progress = ttk.Progressbar(self.center_frame, mode="determinate", length=300)
        self.progress.pack(expand=True, pady=50)

        self.label = tk.Label(self.center_frame, text="Gathering Sample Data...", fg="white", bg="#2c2c2c", font=("Arial", 14))
        self.label.pack(pady=10)

        self.complete_label = None
        self.proceed_button = None

    def update_progress(self, elapsed_time):
        self.progress["value"] = (elapsed_time / 600) * 100
        self.progress.update()
        self.label.config(text=f"Elapsed Time: {elapsed_time} seconds / 600 seconds")

    def mark_completion(self):
        if self.complete_label is None:
            self.complete_label = tk.Label(self.center_frame, text="Sample data gathering complete.",
                                           fg="green", bg="#2c2c2c", font=("Arial", 14))
            self.complete_label.pack(pady=20)

        if self.proceed_button is None:
            self.proceed_button = tk.Button(self.center_frame, text="Proceed", bg="blue", fg="white", font=("Arial", 14),
                                            command=self.proceed_to_sample_collection)
            self.proceed_button.pack(pady=20)

    def proceed_to_sample_collection(self):
        self.controller.show_page("TrainClassifyPage")

class TrainClassifyPage(BasePage): 
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        tk.Button(self, text="Back", bg="red", fg="white",
                  command=lambda: controller.show_page("SampleProgressPage")).place(x=10, y=10)
        
        tk.Button(self, text="Restart", bg="orange", fg="white",
                  command=self.restart_app).place(x=60, y=10)

        tk.Label(self.center_frame, text="Train or Classify?", fg="white", bg="#2c2c2c", font=("Arial", 16)).pack(pady=20)
        tk.Button(self.center_frame, text="Save Gathered Data for Training", bg="blue", fg="white", font=("Arial", 16),
                  command=lambda: controller.show_page("TrainingPage")).pack(pady=10)
        tk.Button(self.center_frame, text="Classify with Gathered Data", bg="blue", fg="white", font=("Arial", 16),
                  command=self.go_to_model_selection).pack(pady=10)
        
    def restart_app(self):
        if messagebox.askyesno("Restart", "Are you sure you want to restart?"):
            self.controller.show_page("HomePage")

    def go_to_model_selection(self):
        """Navigate to ModelSelectionPage to choose a model for classification."""
        self.controller.show_page("ModelSelectionPage")

class ModelSelectionPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)
        
        tk.Button(self, text="Back", bg="red", fg="white",
                  command=lambda: controller.show_page("TrainClassifyPage")).place(x=10, y=10)
        
        tk.Button(self, text="Restart", bg="orange", fg="white",
                  command=self.restart_app).place(x=60, y=10)

        tk.Label(self.center_frame, text="Select Model for Classification", fg="white", bg="#2c2c2c", font=("Arial", 16)).pack(pady=20)
        tk.Button(self.center_frame, text="XGBClassifier", bg="blue", fg="white", font=("Arial", 16),
                  command=lambda: self.set_model("xgbclassifier")).pack(pady=15)
        tk.Button(self.center_frame, text="SGDClassifier", bg="blue", fg="white", font=("Arial", 16),
                  command=lambda: self.set_model("sgdclassifier")).pack(pady=15)

    def set_model(self, model_type):
        """Set the selected model and navigate to ClassificationPage."""
        model_path = os.path.join(MODEL_DIR, f'jan2_{model_type}_model.joblib')
        if os.path.exists(model_path):
            self.controller.current_model = joblib.load(model_path)
            messagebox.showinfo("Model Selection", f"{model_type.upper()} model loaded successfully.")
            self.controller.show_page("ClassificationPage")
        else:
            messagebox.showerror("Error", "Model file not found.")

    def restart_app(self):
        if messagebox.askyesno("Restart", "Are you sure you want to restart?"):
            self.controller.show_page("HomePage")


class TrainingPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)
        
        tk.Button(self, text="Restart", bg="orange", fg="white",
                  command=self.restart_app).place(x=60, y=10)
        
        tk.Button(self, text="Back", bg="red", fg="white",
                  command=self.go_back).place(x=10, y=10)
        
        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        self.status_label = tk.Label(self.center_frame, text="", fg="white", bg="#2c2c2c", font=("Arial", 14))
        self.status_label.pack(pady=20)

        self.start_button = tk.Button(self.center_frame, text="Save Data for Training", bg="green", fg="white", font=("Arial", 16),
                                      command=self.start_training)
        self.start_button.pack(pady=20)

    def restart_app(self):
        if messagebox.askyesno("Restart", "Are you sure you want to restart?"):
            self.controller.show_page("HomePage")

    def go_back(self):
        self.start_button.pack(pady=20)  # Add again the save for training button
        self.controller.show_page("TrainClassifyPage")

    def start_training(self):
        self.start_button.pack_forget()  # Hide save for training button
        try:
            baseline_path = os.path.join(DATA_DIR, "baseline_data.csv")
            sample_path = os.path.join(DATA_DIR, "sample_data.csv")
            training_data_dir = os.path.join(DATA_DIR, "training_data")
            os.makedirs(training_data_dir, exist_ok=True)

            if not os.path.exists(baseline_path) or not os.path.exists(sample_path):
                messagebox.showerror("Error", "Baseline or sample data is missing.")
                return

            baseline_data = pd.read_csv(baseline_path)
            sample_data = pd.read_csv(sample_path)

            if baseline_data.empty or sample_data.empty:
                messagebox.showerror("Error", "One or more files are empty.")
                return
            if not all(baseline_data.columns == sample_data.columns):
                messagebox.showerror("Error", "Column mismatch between baseline and sample data.")
                return

            baseline_mean = baseline_data.mean()
            adjusted_data = sample_data - baseline_mean

            existing_files = [f for f in os.listdir(training_data_dir) if f.startswith("training_data_")]
            next_index = len(existing_files) + 1
            training_file_path = os.path.join(training_data_dir, f"training_data_{next_index}.csv")
            adjusted_data.to_csv(training_file_path, index=False)

            self.status_label.config(text=f"Training data saved.\nDirectory: {training_file_path}")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred during training: {e}")
    

class ClassificationPage(BasePage):
    def __init__(self, controller):
        super().__init__(controller, controller)

        tk.Button(self, text="Restart", bg="orange", fg="white",
                  command=self.restart_app).place(x=60, y=10)

        tk.Button(self, text="Back", bg="red", fg="white",
                  command=self.go_back).place(x=10, y=10)

        self.center_frame = tk.Frame(self, bg="#2c2c2c")
        self.center_frame.pack(expand=True)

        self.result_label = tk.Label(self.center_frame, text="", fg="white", bg="#2c2c2c", font=("Arial", 24))
        self.result_label.pack(pady=10)

        self.confidence_label = tk.Label(self.center_frame, text="", fg="white", bg="#2c2c2c", font=("Arial", 14))
        self.confidence_label.pack(pady=10)

        self.start_button = tk.Button(self.center_frame, text="Classify Gathered Data", bg="green", fg="white",
                                      font=("Arial", 16), command=self.start_classification)
        self.start_button.pack(pady=20)

    def restart_app(self):
        if messagebox.askyesno("Restart", "Are you sure you want to restart?"):
            self.clear_results()
            self.controller.show_page("HomePage")

    def go_back(self):
        self.clear_results()
        self.start_button.pack(pady=20)  # Add again the classify button
        self.controller.show_page("ModelSelectionPage")

    def clear_results(self):
        self.result_label.config(text="", fg="white")
        self.confidence_label.config(text="")
        self.start_button.pack_forget()  # Hide classify button

    def start_classification(self):
        self.start_button.pack_forget()  # Hide classify button
        try:
            baseline_path = os.path.join(DATA_DIR, "baseline_data.csv")
            sample_path = os.path.join(DATA_DIR, "sample_data.csv")
            processed_path = os.path.join(DATA_DIR, "processed_data.csv")

            if not os.path.exists(baseline_path) or not os.path.exists(sample_path):
                messagebox.showerror("Error", "Baseline or sample data is missing.")
                return

            baseline_data = pd.read_csv(baseline_path)
            sample_data = pd.read_csv(sample_path)

            if baseline_data.empty or sample_data.empty:
                messagebox.showerror("Error", "One or more files are empty.")
                return
            if not all(baseline_data.columns == sample_data.columns):
                messagebox.showerror("Error", "Column mismatch between baseline and sample data.")
                return

            baseline_mean = baseline_data.mean()
            adjusted_data = sample_data - baseline_mean

            adjusted_data.to_csv(processed_path, index=False)

            predictions = self.controller.current_model.predict(adjusted_data)
            total_points = len(predictions)
            num_plant_based = (predictions == 1).sum()

            final_classification = "Plant-based" if num_plant_based / total_points > 0.5 else "Animal-based"
            num_classifications = (predictions == 1).sum() if final_classification == "Plant-based" else \
                                   (predictions == 0).sum()
            classification_color = "green" if final_classification == "Plant-based" else "orange"
            confidence_score = (num_classifications / total_points) * 100

            self.result_label.config(text=f"{final_classification}", font=("Arial", 36), fg=classification_color)
            self.confidence_label.config(text=f"Confidence: {confidence_score:.2f}%", font=("Arial", 16), fg="white")
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred during classification: {e}")

# Main loop
if __name__ == "__main__":
    root = tk.Tk()
    app = EdibleOilApp(root)
    root.mainloop()
