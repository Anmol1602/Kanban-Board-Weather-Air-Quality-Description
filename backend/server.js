const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const jsonfile = require('jsonfile');
const winston = require('winston'); // For logging

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Logging configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});

const DATA_FILE_USER = path.join(__dirname, 'data/users.json');
const DATA_FILE = path.join(__dirname, 'data/contacts.json');

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anmol16072002@gmail.com',
        pass: 'uejs jcyl sweg llvv', // Ensure you use an environment variable or a more secure way for passwords
    },
});

// Helper to ensure directory exists for user data
const ensureDirectoryExists_user = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Helper to ensure directory exists for contacts data
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure the `data` directory exists for user and contact data
ensureDirectoryExists_user(path.dirname(DATA_FILE_USER));
ensureDirectoryExists(path.dirname(DATA_FILE));

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        logger.warn(`Signup failed - Missing required fields for email: ${email}`);
        return res.status(400).send('Missing required fields');
    }

    const newUser = { name, email, password };

    try {
        let users = [];
        try {
            users = await jsonfile.readFile(DATA_FILE_USER);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            logger.info('Users file not found, initializing new file...');
        }

        if (users.some((user) => user.email === email)) {
            logger.warn(`Signup failed - Email already registered: ${email}`);
            return res.status(400).send('Email already registered');
        }

        users.push(newUser);
        await jsonfile.writeFile(DATA_FILE_USER, users, { spaces: 2 });

        // Send welcome email
        const mailOptions = {
            from: 'anmol16072002@gmail.com',
            to: email,
            subject: 'Welcome to Our Service',
            text: `Hello ${name},\n\nThank you for signing up! We're excited to have you onboard.\n\nBest regards,\nTeam`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error('Error sending signup email:', error);
            } else {
                logger.info('Signup email sent:', info.response);
            }
        });

        logger.info(`New user signed up: ${email}`);
        res.status(201).json(newUser);
    } catch (error) {
        logger.error('Error handling signup:', error);
        res.status(500).send('Internal server error');
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.warn(`Login failed - Missing required fields for email: ${email}`);
        return res.status(400).send('Missing required fields');
    }

    fs.readFile(DATA_FILE_USER, (err, data) => {
        const users = err ? [] : JSON.parse(data);
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            logger.warn(`Login failed - Invalid credentials for email: ${email}`);
            return res.status(400).send('Invalid credentials');
        }

        // Send login email
        const mailOptions = {
            from: 'anmol16072002@gmail.com',
            to: email,
            subject: 'Login Notification',
            text: `Hello ${user.name},\n\nYou have successfully logged in to your account.\n\nBest regards,\nTeam`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error('Error sending login email:', error);
            } else {
                logger.info('Login notification email sent:', info.response);
            }
        });

        logger.info(`User logged in: ${email}`);
        res.json({ name: user.name, email: user.email });
    });
});

// Endpoint to fetch user profile
app.get('/user-profile', (req, res) => {
    const { email } = req.query;
    if (!email) {
        logger.warn('User profile request failed - Missing email');
        return res.status(400).send('Missing required email');
    }

    fs.readFile(DATA_FILE_USER, (err, data) => {
        if (err) {
            logger.error('Error reading users file for profile:', err);
            return res.status(500).send('Internal server error');
        }

        const users = JSON.parse(data);
        const user = users.find((u) => u.email === email);

        if (!user) {
            logger.warn(`User profile not found: ${email}`);
            return res.status(404).send('User not found');
        }

        logger.info(`User profile fetched: ${email}`);
        res.json(user);
    });
});

// Contact form submission endpoint
app.post('/submit', (req, res) => {
    const userData = req.body;

    if (!userData || !userData.name || !userData.email || !userData.message) {
        logger.warn('Contact form submission failed - Invalid data');
        return res.status(400).send('Invalid data');
    }

    fs.stat(DATA_FILE, (err, stats) => {
        if (err && err.code === 'ENOENT') {
            return fs.writeFile(DATA_FILE, JSON.stringify([userData], null, 2), (err) => {
                if (err) {
                    logger.error('Error creating file for contact submission:', err);
                    return res.status(500).send('Internal server error');
                }
                logger.info('Contact form submitted successfully');
                return res.status(201).send('Data saved successfully');
            });
        }

        if (stats.size >= 5 * 1024 * 1024) {
            logger.warn('File size limit reached for contact submissions');
            return res.status(400).send('File size limit reached');
        }

        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                logger.error('Error reading contact data file:', err);
                return res.status(500).send('Internal server error');
            }

            let users = [];
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                logger.error('Error parsing contact data:', parseError);
                return res.status(500).send('Internal server error');
            }

            users.push(userData);

            fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    logger.error('Error writing contact data file:', err);
                    return res.status(500).send('Internal server error');
                }
                logger.info('Contact form data saved');
                res.status(201).send('Data saved successfully');
            });
        });
    });
});

app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
