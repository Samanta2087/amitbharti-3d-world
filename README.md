# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e62ca31b-ffd3-430e-ae74-d6a12103fe4f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e62ca31b-ffd3-430e-ae74-d6a12103fe4f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Firebase Authentication
- Google reCAPTCHA
- Intergrad Ad Network

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e62ca31b-ffd3-430e-ae74-d6a12103fe4f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication and configure providers:
   - Email/Password
   - Google
   - Facebook
   - Phone
3. Copy your Firebase config and add to `.env` file
4. Set up Google reCAPTCHA at https://www.google.com/recaptcha/
5. Add your reCAPTCHA site key to `.env` file

## Ad Network Setup

This project includes integration with:
- Adsterra
- Monetag
- Intergrad (with multiple ad formats)

Make sure to replace the ad keys with your actual keys from the respective ad networks.