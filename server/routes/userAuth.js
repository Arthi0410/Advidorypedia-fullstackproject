const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { JWT_SECRET_KEY } = require('../config/key');
const { UserModal } = require('../modals/server1')

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        // Check if user exists
        const existingUser = await UserModal.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json('Passwords not matching');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const chashedPassword = await bcrypt.hash(confirmPassword, salt);

        // Create new user
        const newUser = await UserModal.create({ username, email, password: hashedPassword, confirmPassword: chashedPassword });
        // await newUser.create();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Signup successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};


// Get posts endpoint
router.get('/posts', authenticateJWT, async (req, res) => {
    const page = req.query.page || 1;
    const pageSize = 10; // Adjust as needed
    const skip = (page - 1) * pageSize;

    try {
        let posts = [];

        // Attempt to fetch posts from the database
        posts = await Post.find().skip(skip).limit(pageSize).exec();

        // If no posts are found in the database, fetch from external API
        if (posts.length === 0) {
            const response = await axios.get('https://dummyjson.com/posts', {
                params: {
                    page,
                    pageSize
                }
            });
            posts = response.data;
        }

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' }); // Adjust expiration time as needed
};

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModal.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Protected route 
router.get('/profile', authenticateJWT, (req, res) => {
    const { id } = req.user; // Assuming the user ID is stored in the JWT payload
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching user details' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'Profile accessed successfully', user });
    });
});


module.exports = router;