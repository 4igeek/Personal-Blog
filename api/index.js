const routes = require('./routes/routes');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

// Middleware
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());



app.use('/api', routes);

app.listen(process.env.PORT, async () => {
    console.log("Server is running on Port: " + process.env.PORT);
});