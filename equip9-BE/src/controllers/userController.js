const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { promisify } = require("util");

const secretKey = process.env.SECRET_KEY;

// Promisify db.query to use with async/await
const query = promisify(db.query).bind(db);

exports.registerUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, password, createdBy, updatedBy } =
    req.body;

  if (!firstName || !mobileNumber || !password || !createdBy || !updatedBy) {
    return res
      .status(500)
      .send({ message: "All fields are required.", status: false });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const sql =
    "INSERT INTO users (firstName, lastName, mobileNumber, password, createdBy, updatedBy) VALUES (?, ?, ?,?,?,?)";

  db.pool.query(
    sql,
    [firstName, lastName, mobileNumber, hashedPassword, createdBy, updatedBy],
    (err, results) => {
      console.log(err);
      if (err) {
        if (err?.code === "ER_DUP_ENTRY") {
          res.status(500).send({
            message: "Number Already exists",
            status: false,
            error: err?.code,
          });
          console.error("Database error:", err);
        } else {
          res.status(500).send({
            message: "Error on the server.",
            status: false,
            error: err?.code,
          });
        }
      } else {
        res
          .status(200)
          .send({ message: "User created successfully!", status: true });
      }
    }
  );
};

exports.loginUser = async (req, res) => {
  const { mobileNumber, password } = req.body;
  const sql = "SELECT * FROM users WHERE mobileNumber = ?";

  db.pool.query(sql, [mobileNumber], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res
        .status(500)
        .send({ message: "Error on the server.", error: err, status: false });
    } else {
      if (result.length > 0) {
        const user = result[0];
        console.log(user);
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log(passwordIsValid);
        if (passwordIsValid) {
          const token = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: 86400, // 24 hours
          });

          return res.status(200).send({
            auth: true,
            token: token,
            user: user,
            status: true,
          });
        } else {
          return res.status(200).send({
            auth: false,
            token: null,
            message: "Invalid user/password!",
            status: false,
          });
        }
      } else {
        return res
          .status(404)
          .send({ message: "User not found!", status: false });
      }
    }
  });
};


exports.logoutUser = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: "Failed to destroy the session",
            status: false,
          });
        }
        res.status(200).send({
          auth: false,
          token: null,
          status: true,
          message: "Logged out successfully",
        });
      });
    } else {
      res.status(200).send({
        auth: false,
        token: null,
        status: true,
        message: "Logged out successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      auth: false,
      message: "An unexpected error occurred",
      status: false,
    });
  }
};

