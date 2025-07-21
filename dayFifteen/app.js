const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Session middleware for Passport
app.use(session({
    secret: 'cats', // replace with a strong secret in production
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Import and configure Google OAuth strategy
require('./auth'); // adjust path if you place auth.js inside /auth

// Middleware to check if user is authenticated
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

// Routes
app.get('/', (req, res) => {
    res.send(`<h2>Welcome</h2><a href="/auth/google">Login with Google</a>`);
});

// Start Google OAuth flow
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

// Failure route
app.get('/auth/failure', (req, res) => {
    res.send("Something went wrong with authentication.");
});

// Protected route
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`
        <h2>Hello, ${req.user.displayName}!</h2>
        <p>You are authenticated.</p>
        <a href="/logout">Logout</a>
    `);
});

// Logout route
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start server
app.listen(5000, () => {
    console.log(`✅ Server running at http://localhost:5000`);
});
