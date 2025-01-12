#!/bin/bash

# Navigate to your project directory (if needed)
# cd /path/to/your/project

# Run the build command
echo "Running 'npm run build'..."
npm run build

# Check if the build command succeeded
if [ $? -eq 0 ]; then
  echo "Build successful!"

  # Navigate to the 'output' directory
  cd output

  # Initialize git if not already initialized
  if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/your-username/your-repo.git
  fi

  # Add all changes in the output folder to git
  git add .

  # Commit the changes
  git commit -m "Automated commit after build - deploying to Azure Static Web App"

  # Push the changes to GitHub
  git push origin main --force

else
  echo "Build failed. Aborting push."
  exit 1
fi
