# PokeCardGame

This project is my first small project in Angular. It is a card game based on the Pokémon universe. The goal of this project is for me to learn solid **Angular** fundamentals.  
This project is based on a tutorial by **simpletech** (https://www.youtube.com/watch?v=U71TQN68QGU). I adapted their backend REST API using Django and deployed it in a web service on Render.
Backend docs : (https://playing-cards-backend.onrender.com/api/swagger-ui/)

![Game Screenshot](public/app-demo.png)

# User Features:

-   The user can log in and log out (no subscription yet)
-   The user can view their cards
-   The user can search their cards by name
-   The user can filter and order their cards
-   The user can view the details of a card and edit or delette it if needed
-   The user can create a new card and preview it while creating

# Tech Features:

-   Authentication is done via a token and an interceptor and guard
-   Card creation and editing are implemented using reactive forms
-   UI components styling is done with Angular Material
-   UX features : loader , progress bar and nice animations
-   Optimizations : lazy loading
