# Skinalyze AI

A mobile application for skin analysis using artificial intelligence. This project is built with React Native and Expo.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Expo CLI (`npm install -g expo-cli`)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skinalyze-ai
```

2. Install dependencies:
```bash
npm install
```

3. Install required packages:
```bash
npm install @react-native-async-storage/async-storage
npm install react-native-safe-area-context
npm install expo-router
```

## Project Structure

```
skinalyze-ai/
├── app/
│   ├── utils/
│   │   ├── auth.ts         # Authentication utilities
│   │   └── validation.ts   # Form validation utilities
│   ├── index.tsx          # Welcome screen
│   ├── login.tsx          # Login screen
│   ├── signup.tsx         # Signup screen
│   └── home.tsx           # Home screen
├── assets/                # Images and other static assets
└── package.json          # Project dependencies
```

## Running the Project

1. Start the development server:
```bash
npx expo start
```

2. You'll see a QR code in your terminal. To run the app:
   - On Android: Scan the QR code using the Expo Go app
   - On iOS: Scan the QR code using the Camera app

3. To run on a local network:
   - Make sure your computer and mobile device are on the same network
   - Press 'a' in the terminal to run on Android emulator
   - Press 'i' to run on iOS simulator
   - Press 'w' to run in web browser

## Local Development

### Running on Local IP

1. Find your computer's local IP address:
   - Windows: Open CMD and type `ipconfig`
   - Mac/Linux: Open terminal and type `ifconfig` or `ip addr`

2. Start the development server with your local IP:
```bash
npx expo start --host <your-local-ip>
```

3. On your mobile device:
   - Install Expo Go from the App Store/Play Store
   - Open Expo Go
   - Enter the URL: `exp://<your-local-ip>:19000`

### Development Tips

- Use `npm start` to start the development server
- Use `npm run android` to run on Android
- Use `npm run ios` to run on iOS
- Use `npm run web` to run in web browser

## Features

- User Authentication
  - Email validation
  - Strong password requirements
  - Local storage for credentials
- Form Validation
  - Real-time email validation
  - Password strength checking
  - Visual feedback for errors
- Modern UI/UX
  - Clean and intuitive interface
  - Responsive design
  - Loading states

## Password Requirements

The application enforces strong password requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Troubleshooting

1. If you encounter any issues with dependencies:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

2. If the app doesn't connect to the development server:
   - Ensure your computer and mobile device are on the same network
   - Check if your firewall is blocking the connection
   - Try using a different port by setting the `EXPO_DEVTOOLS_LISTEN_ADDRESS` environment variable

3. For iOS simulator issues:
   - Make sure Xcode is installed
   - Run `xcode-select --install` if needed

4. For Android emulator issues:
   - Make sure Android Studio is installed
   - Ensure ANDROID_HOME environment variable is set

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or concerns, please open an issue in the repository. 