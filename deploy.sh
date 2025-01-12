#!/bin/bash

# Navigate to your project directory (if needed)
# cd /path/to/your/project

# Run the build command
echo "Running 'npm run build'..."
npm run build

# Check if the build command succeeded
if [ $? -eq 0 ]; then
  echo "Build successful!"

  # Navigate to the 'out' directory (or the directory where your build output is)
  cd out

  # Add all changes to git
  git add .

  # Commit the changes
  git commit -m "Automated commit after build"

  # Push the changes to GitHub
  git push origin main

else
  echo "Build failed. Aborting push."
  exit 1
fi
