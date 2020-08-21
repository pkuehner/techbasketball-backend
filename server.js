const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    Entry = require('./api/models/blogEntryModel'),
    nodeMailer = require("nodemailer");

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Blogdb')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var corsOptions = {
    origin: ['http://localhost:4200', 'http://ec2-100-25-46-122.compute-1.amazonaws.com:4200'],
    credentials: true,
};
app.use(cors(corsOptions)); //enable cors on all requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('card'));
app.use(session({
    secret: 'card',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


const LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === "test" && password === "ball") {
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
));

passport.serializeUser(function (user, done) {
    if (user) done(null, user);
});

passport.deserializeUser(function (id, done) {
    done(null, id);
});



const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if (error) res.status(400).json({"statusCode": 200, "message": error});
            req.login(user, function (error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

app.route('/authenticate').post(auth(), (req, res) => {
    console.log('he')
    res.status(200).json({"statusCode": 200, "message": 'hello'});
    console.log(req.isAuthenticated())
});

const blogRoutes = require('./api/routes/blogRoutes');
blogRoutes(app);

const homeRoutes = require('./api/routes/homeRoutes');
homeRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port);
