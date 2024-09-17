# MyFlix-Angular-Clients

## Overview
MyFlix-Angular-Clients is an Angular-based single-page application (SPA) that provides users with access to a movie database. Users can sign up, log in, browse a list of movies, view movie details, add movies to their list of favorites, and manage their user profile. The application features responsive design and dynamic navigation with dialog boxes for various user interactions like sign up, login, and user updates.

**See the live app:** [View app live](https://nodem9.github.io/myFlix-angular-clients/)

### Features

- **Welcome Page:** Initial page with Sign Up and Login buttons.
- Login/Sign Up Dialog Forms: Modal dialog boxes for user registration and login.
- **Movie List Page:**  Home page after login that displays a list of movies fetched from the **<small>myFlix-app movie API</small>**.
- **Movie Filtering:** Search movies dynamically using the movie filter.
  - The movie-filter component contains a search functionality, allowing users to search for a specific movie through an input form.
- **View Movie Details:** Users can view detailed information about a movie, including:
  - **Genre:** Click the "View Genre" button to see the genre of the movie.
  - **Director's Info:** Click the "View Director" button to read the director's biography and other information.
  - **Movie Synopsis:** Click the "View Synopsis" button to read the full plot synopsis of the movie.
  - Each of these details is displayed in a dialog box when the respective button is clicked.
- **User Profile Management:**
  - View user details fetched from the **<small>myFlix-app movie API</small>**.
  - Update user information via a modal form.
  - Delete user account.
  - View and manage a list of favorite movies.
- **Favorite Movies:** Add or remove movies from the user's list of favorites.
- **Persistent User Data:** User data, including favorite movies, is stored in localStorage.
- **Navigation Bar:** Shared across the app with links to Home, Profile, and Logout.
- **Dialog Boxes:** Custom dialog component for handling modal interactions across the app.
- **API Backend:** Fetches movie and user data from the **<small>myFlix-app movie API</small>**, which uses **<small>MongoDB</small>** to store movies and users documents.
- **User Authentication:** The backend API uses has authentication mechanism for user authentication. During registration, the API checks for username collisions to ensure unique usernames. When logging in, the API verifies both the username and password, and if incorrect, an error message is displayed via a snackbar to notify the user.

## Pages and Components

1. **Welcome Page**

- Contains two buttons: Sign Up and Login.
- Clicking these buttons opens a dialog box containing the respective forms.

2. **Movie List Page**

- Displays a list of movies.
- Movies can be searched and filtered using the movie-filter component.
- Each movie is rendered using the movie-card component.
- Users can add movies to their list of favorites from this page.

3. **User Profile Page**

- Displays user details.
- Shows a list of the user’s favorite movies.
- Allows users to update their profile via a dialog box (**user-update-form** component).
- Users can delete their profile.

4. **Navigation Bar**

- Shared across the app using a two-way binding mechanism.
- Contains links to:
  - myFlix: The website name.
  - Home: Navigates to the movie list page.
  - Profile: Navigates to the user’s profile page.
  - Logout: Logs the user out and redirects them to the welcome page.

5. **DialogBox Component**

- A reusable component to provide dialog boxes for various forms in the app, such as user registration, login, and user profile update.

6. **Forms**

- User Login Form: Allows users to log in via a dialog box.
- User Registration Form: Enables new users to sign up via a dialog box.
- User Update Form: Allows users to update their profile information via a dialog box.
- All forms are built with reactive form structures based on the UserData model.

## Models

### UserData Model

- Defined in the UserData.ts file located in the model/ directory.
- Provides the structure for user data with various properties like username, password, email, and favoriteMovies.

## Application Structure

```bash
bash
src/
├── app/
│   ├── components/
│   │   ├── welcome-page/
│   │   ├── movie-list/
│   │   ├── movie-card/
│   │   ├── movie-filter/
│   │   ├── user-profile/
│   │   ├── user-update-form/
│   │   ├── user-login-form/
│   │   ├── user-registration-form/
│   │   ├── navigationbar/
│   │   └── dialogbox/
│   ├── model/
│   │   └── UserData.ts
│   ├── services/
│   │   └── movie.service.ts
│   ├── app.component.ts
│   └── app.module.ts
└── main.ts
```

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://github.com/NodEm9/myflix-angular-clients.git
cd myflix-angular-clients
```

2. **Install Dependencies: Ensure you have Node.js installed, then run:**

```bash
npm install
```

3. **Run the Application: Start the Angular development server:**

```bash
ng serve
```

Navigate to http://localhost:4200/ in your browser to view the app.

4. **Build: To build the app for production:**

```bash
ng build
```

## Technologies Used

- **<small> Angular:</small>** Framework for building the front-end SPA.
- **<small>Angular Router</small>:** For navigating between different views in the app.
**<small>Reactive Forms:</small>** Used for managing form inputs and validations.
- **<small>RxJS:</small>** For handling asynchronous operations such as HTTP requests.
- **<small>Angular Material:</small>** For UI components, including dialog boxes.
- **<small>TypeScript:</small>** Strongly typed programming language to build scalable applications.
- **LocalStorage:</small>** For persisting user data such as favorite movies.

## Key Functionalities

1. **<snall>Two-Way Data Binding:</small>** Between components such as the navigation bar and movie list to ensure seamless UI updates.
2. **<small>Routing:</small>** Angular routing to navigate between home, profile, and other pages.
3. **<small>Dialogs:</small>** Use of a reusable dialog box component for login, registration, and updates.
4. **<small>Favorites:</small>** The ability for users to favorite movies, which is stored in localStorage.

## Future Improvements

- Add pagination to the movie list page for better performance when handling large datasets.
- Integrate a recommendation system based on user favorite movies.

## Contributing

- Fork the project.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -am 'Add new feature'). 
- Push to the branch (git push origin feature-branch).
- Create a pull request.

- **Note:** Do not forget to squash your commits before pushing your code. If you need help on how to squash commit refer to this short video with detailed explaination. https://www.youtube.com/watch?v=V5KrD7CmO4o&t=209s
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
