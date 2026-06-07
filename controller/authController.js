const connection = require("../config/db");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const { name, email, password, role } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

        connection.query(
            sql,
            [name, email, hashedPassword, role],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "User Saved In Database",
                    userId: result.insertId
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getUsers = (req, res) => {

    connection.query(
        "SELECT * FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                users: result
            });
        }
    );
};


const updateUser = (req, res) => {

    const { id } = req.params;
    const { name } = req.body;

    const sql = "UPDATE users SET name = ? WHERE id = ?";

    connection.query(
        sql,
        [name, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "User Updated Successfully"
            });
        }
    );
};

const deleteUser = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";

    connection.query(
        sql,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
            });
        }
    );
};

const login = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Email or Password"
                });
            }

            const isMatch = await bcrypt.compare(
                password,
                result[0].password
            );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Email or Password"
                });
            }

            const token = jwt.sign(
                {
                    id: result[0].id,
                    email: result[0].email,
                    role: result[0].role
                },
                process.env.JWT_SECRET
            );

            res.status(200).json({
                success: true,
                message: "Login Successful",
                token: token
            });
        }
    );
};





module.exports = {
    register,
    getUsers,
    updateUser,
    deleteUser,
    login
};