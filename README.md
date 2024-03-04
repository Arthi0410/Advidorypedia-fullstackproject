
Full Stack Assignment

This repository contains a full-stack application developed using Node.js, Express.js, React.js, and a database of choice. The application implements user signup functionality, post listing with infinite scrolling, JWT authentication, and follows best practices for security and usability.

Technology Stack: 

  Node.js and npm: Used for server-side JavaScript development and package management.
  Express.js: A Node.js web application framework used for building the backend API.
  Database: MongoDB is chosen as the database for storing user data and posts.
  jsonwebtoken: Library used for JWT generation and validation.
  React.js: Used for building the frontend components and handling client-side functionality.
  Tailwind CSS: Utilized for responsive design and styling, ensuring screens are visually appealing and consistent with the "MelodyVerse" theme.

  
Features:

  Signup Screen
  Provides fields for username, email, password (with confirmation), and optional fields like name and profile picture.
  Implements validation for required fields and email format using React state management and validation libraries.
  Includes a terms and conditions checkbox.
  Displays clear error messages and success messages.
  Simulates sending a welcome email notification upon successful signup.
  Redirects to the post list screen after successful signup using React Router.
  
  Post List Screen
  Implements a screen where users can scroll infinitely, and posts are rendered using GET API of posts.
  Utilizes Tailwind CSS for responsive design, ensuring screens are visually appealing and consistent with the "MelodyVerse" theme.
  
API Endpoints:

  POST /signup: Registers a new user with provided username, email, and password. Validates input, ensures unique usernames and emails, hashes passwords securely, stores user data in the   MongoDB database, and returns a success message and JWT token upon successful registration.
  
  GET /posts: Implements a paginated implementation of fetching posts data from the MongoDB database. Ensures secure and non-authenticated APIs are rejected.
  
JWT Implementation:

  Generates JWT tokens with appropriate payload and expiration time upon successful login.
  Validates JWT tokens in protected routes to ensure user authentication.
  Implements robust token refresh mechanisms if desired.
