const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../model/UserInfo');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPass });
    await newUser.save();
    res.json({ msg: "User registered" });
};

exports.login = async(req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
}

exports.verify = async (req,res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ msg: `Hello user ${decoded.id}, this is your profile` });
    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
}