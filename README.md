# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Firebase Setup and Deployment

If you are using Firebase features like Hosting, Functions, or Firestore, you'll need the Firebase CLI.

1.  **Install Firebase CLI**:
    If you don't have it, install it globally:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```
    This will open a browser window to authenticate with your Google account.

3.  **Initialize Firebase in your project (if not already done)**:
    If this project wasn't initialized with Firebase, or you need to set up specific features:
    *   For **Firestore**:
        ```bash
        firebase init firestore
        ```
        Follow the prompts. This will create `firestore.rules` and `firestore.indexes.json`.
    *   For **Cloud Functions**:
        Navigate to your project root (or where you want the `functions` directory).
        ```bash
        firebase init functions
        ```
        Follow the prompts:
        - Choose an existing project or create a new one.
        - Select TypeScript as the language.
        - Choose to use ESLint if desired.
        - Install dependencies when prompted.
        This will create a `functions` directory with a basic setup. You may need to customize `functions/package.json` (e.g., for Node version like 20, add `"type": "module"` for ES Modules) and `functions/tsconfig.json`.
    *   For **Hosting**:
        ```bash
        firebase init hosting
        ```
        Follow the prompts. Configure it to use your Next.js build output directory (usually `.next` or a custom `out` directory if using static export, though for Next.js dynamic features, server-side hosting or Cloud Functions/Cloud Run is typical). For Firebase Hosting with Next.js, you might be using framework-aware hosting or deploying functions that serve your Next.js app.

4.  **Deploy to Firebase**:
    *   To deploy only Cloud Functions:
        ```bash
        firebase deploy --only functions
        ```
    *   To deploy only Hosting:
        ```bash
        firebase deploy --only hosting
        ```
    *   To deploy Firestore rules:
        ```bash
        firebase deploy --only firestore:rules
        ```
        (Note: `firestore.rules` is the default rules file name)
    *   To deploy multiple services:
        ```bash
        firebase deploy --only functions,hosting,firestore
        ```
    *   To deploy all configured Firebase services:
        ```bash
        firebase deploy
        ```

Remember to check your `firebase.json` file to see which services are configured for deployment.
