const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(session({
    secret: "cats",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./auth'); // Make sure path is correct

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get('/', (req, res) => {
    res.send(`<a href="/auth/google">Login with Google</a>`);
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

// ✅ FIX: use middleware properly
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

app.get('/auth/failure', (req, res) => {
    res.send("Something went wrong");
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}, you are authenticated.`);
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.listen(5000, () => {
    console.log(`Listening on http://localhost:5000`);
});
