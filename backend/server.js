

// require('dotenv').config();
// console.log("SendGrid API key loaded:", !!process.env.SENDGRID_API_KEY);

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const sgMail = require('@sendgrid/mail');

// // Routes
// const authRoutes = require('./routes/auth');
// const profileRoutes = require('./routes/profile');
// const sendEmailRoutes = require('./routes/sendEmail'); // router with /send-email

// // Init SendGrid
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'MediAssist backend running' });
// });

// // Mount routes
// app.use('/api', authRoutes);
// app.use('/api', profileRoutes);
// app.use('/api', sendEmailRoutes); // only here, no inline route

// MongoDB connection
// mongoose
//   .connect('mongodb://127.0.0.1:27017/mediassist')
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(5000, () => console.log('Server listening on port 5000'));
//   })
//   .catch((err) => console.error('DB error:', err));


// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch((err) => console.error('DB error:', err));
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

require('dotenv').config();

console.log("SendGrid API key loaded:", !!process.env.SENDGRID_API_KEY);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const sendEmailRoutes = require('./routes/sendEmail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MediAssist backend running' });
});

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', sendEmailRoutes);

// MongoDB Atlas Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');

//     const PORT = process.env.PORT || 5000;

//     app.listen(PORT, () =>
//       console.log(`Server listening on port ${PORT}`)
//     );
//   })
//   .catch((err) => console.error('DB error:', err));

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB CONNECTION FAILED:");
  console.error(err);
  process.exit(1);
});