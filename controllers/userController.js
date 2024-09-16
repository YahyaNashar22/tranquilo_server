import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";


// Sign up
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            username, password: hash
        });
        await user.save();

        const token = createToken(user);
        const decoded = verifyToken(token);

        res.status(201).cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
        }).json({ message: "user created successfully", payload: decoded })
    } catch (error) {
        res.status(500).json({ message: "user cannot be created !", error: error.message })
        console.log(error)
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({
            message: "username not found!"
        });
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(401).json({
            message: "invalid password"
        });

        const token = createToken(user);
        const decoded = verifyToken(token);

        res.cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None"
        }).status(200).json({
            message: "login successful",
            payload: decoded
        })


    } catch (error) {
        res.status(500).json({ message: "problem logging in!", error: error.message })
        console.log(error)
    }
}

// logout
export const logout = (req, res) => {
    console.log("cookie cleared");
    Object.keys(req.cookies).forEach(cookieName => {
        // Clear each cookie by setting its value to null and setting an expired date
        res.clearCookie(cookieName);
    });
    return res
        .clearCookie("userToken")
        .status(200)
        .send("successfully logged out");
};

// Edit user
export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            message: 'user does not exist!'
        });


        const updatedUser = await User.findByIdAndUpdate(id, {
            username, password
        }, { new: true });

        return res.status(200).json({
            message: "user updated successfully",
            payload: updatedUser
        })
    } catch (error) {
        res.status(500).json({ message: "problem editing user!", error: error.message })
        console.log(error)
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            message: 'user does not exist!'
        });

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            message: "user deleted successfully",
            payload: user
        })

    } catch (error) {
        res.status(500).json({ message: "problem deleting user!", error: error.message })
        console.log(error)
    }
}

// Fetch a single user by ID
export const getOneUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID and populate related fields like favorites and orderHistory if needed
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Return the user data
        const token = createToken(user);
        const decoded = verifyToken(token);

        res.cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None"
        }).status(200).json({
            message: "refetch successful",
            payload: decoded
        })


    } catch (error) {
        // Handle errors
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
        console.log(error);
    }
};