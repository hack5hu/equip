# Equip9

**Equip9** is a comprehensive application consisting of a backend service and a React Native frontend. This repository contains two main folders:

- **Equip9-BE**: The backend service built with Node.js and SQL.
- **Equip9-FE**: The React Native frontend application.

## Project Structure

```
/Equip9
    /Equip9-BE     # Backend service with Node.js and SQL
    /Equip9-FE     # React Native frontend application
```

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
- **Yarn** (Optional): You can use Yarn as an alternative to npm. Install it from [yarnpkg.com](https://yarnpkg.com/).

### Setup Instructions

#### 1. Backend Setup (Equip9-BE)

1. Navigate to the `Equip9-BE` directory:
   ```bash
   cd Equip9/Equip9-BE
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `Equip9-BE` directory.
   - Add your environment-specific variables to this file. Refer to `.env.example` if available.

4. Start the backend server:
   ```bash
   npm start
   ```

#### 2. Frontend Setup (Equip9-FE)

1. Navigate to the `Equip9-FE` directory:
   ```bash
   cd Equip9/Equip9-FE
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `Equip9-FE` directory.
   - Add your environment-specific variables to this file. Refer to `.env.example` if available.

4. Start the React Native development server:
   ```bash
   npm start
   ```

5. Run the app on an emulator or physical device:
   - For iOS: `npm run ios`
   - For Android: `npm run android`

## Folder-Specific Details

### Equip9-BE (Backend)

- **Technology Stack**: Node.js, SQL
- **Configuration**: `.env` file for environment variables
- **Scripts**:
  - `npm start`: Start the backend server

### Equip9-FE (Frontend)

- **Technology Stack**: React Native
- **Configuration**: `.env` file for environment variables
- **Scripts**:
  - `npm start`: Start the React Native development server
  - `npm run ios`: Build and run the app on an iOS simulator
  - `npm run android`: Build and run the app on an Android emulator

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/YourFeatureName`.
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, please contact:

- **Email**: your-email@example.com
- **GitHub Issues**: [GitHub Issues](https://github.com/yourusername/your-repo/issues)

---

This README provides a comprehensive overview of the project, setup instructions, and contribution guidelines. Make sure to replace placeholder content (e.g., email address, repository URL) with your actual information.