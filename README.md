# Klonit Summer TCG App

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

---

## 📂 Repository Instructions

### Branch Workflow
- **Protected branches:** `main` and `dev`  
  - `main` → stable production branch  
  - `dev` → integration branch for all features and bugfixes
- **Feature branches:**  
  1. Create a GitHub issue for your task or bug  
  2. Create a branch using this format:
     ```
     feature/{issue-number}-short-description
     ```
     Example:
     ```
     feature/7-add-search-bar
     ```
  3. Push the branch and open a Pull Request to `dev`  
  4. Reference the issue in the PR with:
     ```
     Fixes #{issue-number}
     ```
     This will automatically close the issue when the PR merges.

### Pull Requests
- PRs must be **approved by the Code Owner** (currently only the project lead).  
- **Do not push directly to `main` or `dev`** — always use feature branches.  
- Keep PRs focused on a single feature or bug fix for easier review.

---

## 🚀 Get started with Expo

1. Install dependencies

   ```bash
   npm install
````

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a:

* [development build](https://docs.expo.dev/develop/development-builds/introduction/)
* [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
* [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
* [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory.
This project uses [file-based routing](https://docs.expo.dev/router/introduction).

---

## 🧹 Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

---

## 📚 Learn more

To learn more about developing your project with Expo, look at the following resources:

* [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
* [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

---

## 🌎 Join the community

Join our community of developers creating universal apps.

* [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
* [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

### ✅ Quick Workflow Recap

1. Create GitHub issue → Create branch → Commit → Open PR → Link to issue
2. Only `dev` and `main` are protected; merge via PR only
3. Project lead approves and merges PRs
