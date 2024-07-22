// const express = require("express");
// const mysql = require("mysql2"); // Changed to mysql2
// const bcrypt = require("bcryptjs");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const db = mysql.createConnection({
//   host: "127.0.0.1", // Changed to IPv4 loopback address
//   user: "root",
//   password: "12345678",
//   database: "Equip9DB",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected...");
// });

// const secretKey = "your_secret_key";

// // POST API to Create Record
// app.post("/register", (req, res) => {
//   const {
//     first_name,
//     last_name,
//     mobile_number,
//     password,
//     created_by,
//     updated_by,
//   } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 8);

//   const sql = "CALL CreateUser(?, ?, ?, ?, ?, ?)";
//   db.query(
//     sql,
//     [
//       first_name,
//       last_name,
//       mobile_number,
//       hashedPassword,
//       created_by,
//       updated_by,
//     ],
//     (err, result) => {
//       if (err) return res.status(500).send({ message: "Error on the server." });
//       res.status(200).send({ message: "User created successfully!" });
//     }
//   );
// });

// // POST API to Login
// app.post("/login", (req, res) => {
//   const { mobile_number, password } = req.body;

//   const sql = "SELECT * FROM registration WHERE mobile_number = ?";
//   db.query(sql, [mobile_number], (err, result) => {
//     if (err) return res.status(500).send({ message: "Error on the server." });

//     if (result.length > 0) {
//       const user = result[0];
//       const passwordIsValid = bcrypt.compareSync(password, user.password);

//       if (passwordIsValid) {
//         const token = jwt.sign({ id: user.id }, secretKey, {
//           expiresIn: 86400, // 24 hours
//         });

//         return res.status(200).send({
//           auth: true,
//           token: token,
//           user: user,
//         });
//       } else {
//         return res
//           .status(401)
//           .send({ auth: false, token: null, message: "Invalid password!" });
//       }
//     } else {
//       return res.status(404).send({ message: "User not found!" });
//     }
//   });
// });

// // Middleware to verify token
// function verifyToken(req, res, next) {
//   const token = req.headers["x-access-token"];
//   if (!token)
//     return res.status(403).send({ auth: false, message: "No token provided." });

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err)
//       return res
//         .status(500)
//         .send({ auth: false, message: "Failed to authenticate token." });

//     req.userId = decoded.id;
//     next();
//   });
// }

// // GET API to Access Protected Route
// app.get("/welcome", verifyToken, (req, res) => {
//   const sql = "SELECT * FROM registration WHERE id = ?";
//   db.query(sql, [req.userId], (err, result) => {
//     if (err) return res.status(500).send({ message: "Error on the server." });

//     const user = result[0];
//     const hours = new Date().getUTCHours();
//     let greeting;

//     if (hours < 12) {
//       greeting = "Good Morning";
//     } else if (hours < 18) {
//       greeting = "Good Afternoon";
//     } else {
//       greeting = "Good Evening";
//     }

//     res.status(200).send({
//       message: `${greeting}, Mr. ${user.first_name} ${user.last_name}`,
//     });
//   });
// });

// // Logout endpoint
// app.post("/logout", (req, res) => {
//   res.status(200).send({ auth: false, token: null });
// });
// app.get("/", (req, res) => {
//   res.status(200).send({ auth: 'hello', token: null });
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/db')
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);


db.getConnection()
  .then((connection) => {
    console.log("MySQL Connected!");
    connection.release();
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


