import express from 'express';
import cors from "cors"
import cookieparser from 'cookie-parser'
const app = express();
import session from "express-session";
import passport from  "passport";
import {Strategy} from "passport-google-oauth20"
import { User } from './Models/user.model.js';
import dotenv from "dotenv/config";



// Some security options using Middlewares
app.use(express.json({ limit: "16kb" }));

// like to encode space to %20 or +
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}))

app.use(cookieparser())

// Configuring the Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

//  Configuring the Session
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:true,
    })
)

// Configuring the Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Google Strategy
passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const userType =  'Buyer'; // Default or session userType

            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    userType: userType,  // Set userType here
                });

                await user.save();
            }

            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    })
);

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

// Store userType in the session during Google OAuth initiation
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:process.env.CLIENT_REDIRECT_URL,
    failureRedirect:process.env.CLIENT_SIGNUP_URL
}));

export { app };
