import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import cookieSession from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import './auth/passport.js';
import { authRoute } from './routes/auth.js';
import { createConnection } from './config/db.js';
import { userRoute } from './routes/user.js';
import cloudinary from 'cloudinary';

dotenv.config();

createConnection();

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(express.json());

//cors
app.use(
  cors({
    origin: ['http://localhost:3000/login', 'http://localhost:3000'],
    credentials: true,
  })
);

// app.use(
//   cookieSession({
//     name: 'session',
//     keys: [`${process.env.SESSION_SECRET}`],
//   })
// );

app.use(
  session({
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,   
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use('/user', userRoute);
app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.send('home');
});

app.listen(process.env.PORT, () => {
  console.log(`up and running ${process.env.PORT}`);
});
