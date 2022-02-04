require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Database
const connectDB = require('./config/db')

// Middleware
const authMiddleware = require('./middleware/auth')

// Router
const authRouter = require('./routes/auth/auth.router')
const userRouter = require('./routes/user/user.router')
const postRouter = require('./routes/post/post.router')
const questionRouter = require('./routes/question/question.router')
const responseRouter = require('./routes/response/response.router')

// connect database
connectDB()

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
// -- Test Route
app.get('/', (req, res) => res.send('Server up and running'))

// --Authentication Route
app.use('/api/v1/auth', authRouter);

// --User Route
app.use('/api/v1/users', authMiddleware, userRouter);

// --Post Route
app.use('/api/v1/users/:userId/posts', authMiddleware, postRouter);

// --Question Route
app.use('/api/v1/posts/:postId/questions', authMiddleware, questionRouter);

// --Response Route
app.use('/api/v1/questions/:questionId/responses', authMiddleware, responseRouter);

// if endpoint not found route
app.use(function (req, res, next) {
  res.status(404).json({ error: 'Not Found', message: 'Ooops, URL not found'})
})

module.exports = app;