const client = require('../config/db')
const bcrypt = require("bcrypt");

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;

        if (role && req.user.role !== "admin") {
            return res.status(403).json({
                msg: "Not authorized to change role"
            });
        }

        let updatedPassword = null;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const result = await client.query(
            `UPDATE users SET
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                password = COALESCE($3, password),
                role = COALESCE($4, role)
             WHERE id = $5
             RETURNING id, name, email, role`,
            [name, email, updatedPassword, role, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "User updated successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (req.user.role !== "admin" && req.user.id != userId) {
            return res.status(403).json({
                msg: "Not authorized to delete this user"
            });
        }

        const result = await client.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "User deleted successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = { updateUserDetails, deleteUser }