const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        msg: 'The API is running! Go catch it!',
        success: true
    });
});

app.use('/', require('./routes/auth'));

app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
