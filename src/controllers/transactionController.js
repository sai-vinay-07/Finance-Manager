const express = require('express');
const client = require('../config/db')


const addTransaction = async (req, res) => {
    try {

        const { amount, category_id, description } = req.body;

        const userId = req.user.id

        const result = await client.query('INSERT INTO transactions (user_id, amount, category_id, description) VALUES ($1, $2, $3, $4) RETURNING *', [userId, amount, category_id, description])

        return res.status(201).json({
            msg: "Transaction Added Successfully",
            data: result.rows[0]
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

const getTranscationofUser = async (req, res) => {
    try {

        const userId = req.user.id

        const result = await client.query("SELECT * FROM transactions WHERE user_id = $1", [userId])

        return res.status(200).json({
            msg: "All user transcations",
            data: result.rows
        })

    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await client.query(
            `SELECT t.amount, c.type
             FROM transactions t
             JOIN category c ON t.category_id = c.id
             WHERE t.user_id = $1`,
            [userId]
        );

        let income = 0;
        let expenses = 0;

        result.rows.forEach((d) => {
            if (d.type === "income") {
                income += Number(d.amount);
            } else {
                expenses += Number(d.amount);
            }
        });

        return res.status(200).json({
            msg: "Dashboard Of User",
            TotalIncome: income,
            TotalExpenses: expenses,
            Balance: income - expenses
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getAllUsers = async(req,res)=>{
    try {
        const result = await client.query("SELECT * FROM users")
        return res.status(200).json({
            msg: "All Users",
            data: result.rows
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const getAllTransactions = async(req,res)=>{
    try {
        const result = await client.query("SELECT * FROM transactions")     
        return res.status(200).json({
            msg: "All Transactions",
            data: result.rows
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

const getTranscationofUserByAdmin = async (req, res) => {
    try {
        
        const userId = req.params.id

        const result = await client.query("SELECT * FROM transactions WHERE user_id = $1", [userId])        

        return res.status(200).json({
            msg: "All user transcations",
            data: result.rows
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = { addTransaction, getTranscationofUser, getDashboard , getAllUsers, getAllTransactions, getTranscationofUserByAdmin}