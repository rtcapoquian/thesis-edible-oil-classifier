  // pages/contact.tsx
  "use client";

  import React from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { useForm, SubmitHandler } from "react-hook-form";
  import { Button } from "@/components/ui/button"; // Import the Button component

  interface ContactFormInputs {
    name: string;
    email: string;
    message: string;
  }

  const ContactForm: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<ContactFormInputs>();

    const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
      console.log(data);
      // You can handle form submission here, e.g., send data to an API
      reset(); // Reset form fields after submission
    };

    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Me</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="border border-gray-300 rounded-md w-full p-2 mt-1"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border border-gray-300 rounded-md w-full p-2 mt-1"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                className="border border-gray-300 rounded-md w-full p-2 mt-1"
                rows={4}
                placeholder="Your Message"
              />
            </div>
            <Button variant="default" className="py-4 px-8 mt-4">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const ContactPage: React.FC = () => {
    return (
      <div className="container mx-auto px-4">
        <ContactForm />
      </div>
    );
  };

  export default ContactPage;
