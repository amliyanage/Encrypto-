# Password Manager 🔒

**Password Manager** is a secure mobile application designed to help users store and manage their passwords safely. Built with **React Native** and **Expo**, this app uses **Redux** for state management and provides a user-friendly interface with **React Navigation**.

## Features ✨

- **Secure Password Storage**: Store and manage your passwords securely.
- **Cross-platform Support**: Works on Android, iOS, and Web.
- **Easy Navigation**: User-friendly navigation with **React Navigation**.
- **Async Storage**: Data is stored locally using **AsyncStorage** for quick and secure access.
- **Responsive UI**: Designed with **React Native Paper** for a clean and modern look.

## Tech Stack ⚙️

- **React Native**: Framework for building cross-platform mobile applications.
- **Expo**: Toolset for faster development of React Native apps.
- **React Navigation**: For handling navigation between different screens.
- **Redux & Redux Toolkit**: For state management across the app.
- **Axios**: For making HTTP requests.
- **React Native Paper**: UI library for React Native components.
- **React Native Reanimated**: For smooth animations.
- **React Native Safe Area Context**: For handling safe areas on various devices.

## Installation 🚀

### Prerequisites

- **Node.js** (>= 16.x.x)
- **Expo CLI**: Install Expo globally using npm or yarn:
  ```bash
  npm install -g expo-cli
  ```

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/amliyanage/Encrypto-.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd PasswordManager
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the app**:
   You can run the app on different platforms:

   - **Android**:
     ```bash
     npm run android
     ```

   - **iOS**:
     ```bash
     npm run ios
     ```

   - **Web**:
     ```bash
     npm run web
     ```

   - **Start the app in general**:
     ```bash
     npm start
     ```

   This will launch Expo, and you can scan the QR code with the Expo Go app on your mobile device to see the app in action.

## Project Structure 📂

- **/assets**: Images and other static assets.
- **/components**: Reusable components for the UI.
- **/redux**: Redux store, slices, and reducers for state management.
- **/screens**: The main screens of the application.
- **/navigation**: Navigation-related files, including stack and tab navigators.
- **App.tsx**: Entry point of the app.

## Dependencies 🛠️

- **@expo-google-fonts/poppins**: Poppins font for better typography.
- **@react-native-async-storage/async-storage**: To store data locally on the device.
- **@react-navigation/native** & **@react-navigation/stack**: For handling the navigation between screens.
- **@reduxjs/toolkit**: For managing application state.
- **axios**: For handling HTTP requests.
- **expo-status-bar**: Status bar management for Expo apps.
- **react-native-paper**: UI library for consistent design.
- **react-native-reanimated**: For animations in React Native.
- **react-redux**: For connecting Redux state to React components.

## Development Setup 🔧

If you'd like to contribute or set up the development environment, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/amliyanage/Encrypto-.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app on your preferred platform (Android, iOS, Web).

### Development Commands

- **Run on Android**:
  ```bash
  npm run android
  ```

- **Run on iOS**:
  ```bash
  npm run ios
  ```

- **Run on Web**:
  ```bash
  npm run web
  ```

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
