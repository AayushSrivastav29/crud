// Create a shipping system that should allow crud operation for staff
// and let the user specify the time and days of operations for the staff.
// The system should automatically show the list of staff available for delivery of goods based on the day and time entered.

//steps-
//backend server✅
//fpage (for staff)- create+ read✅ + DEL button✅ + updaTE
//spage- input details=table of available staff

import express from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "shippingdb",
});

// // at front page
// app.get("/", (req, res) => {
//   res.json("hello this is the front page");
// });

//read
app.get("/", (req, res) => {
  const q = "SELECT * FROM staff";
  db.query(q, (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(data);
    }
  });
});

//create
app.post("/add", (req, res) => {
  const q =
    "INSERT INTO staff (id,name, phoneNo ,startTime,endTime,daysAvailable) VALUES (?,?,?,?,?,?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.phoneNo,
    req.body.startTime,
    req.body.endTime,
    Array.isArray(req.body.daysAvailable)
      ? req.body.daysAvailable.join(",")
      : "", // Ensure daysAvailable is handled properly
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json("Data created successfully");
    }
  });
});

//delete
app.delete("/:id", (req, res) => {
  //param=url till id
  const id = req.params.id;
  const q = "DELETE FROM staff WHERE id=?";

  db.query(q, [id], (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json("Data deleted successfully");
    }
  });
});

// Update a staff member by ID
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE staff SET name=?, phoneNo=?,startTime=?,endTime=?,daysAvailable=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.phoneNo,
    req.body.startTime,
    req.body.endTime,
    Array.isArray(req.body.daysAvailable)
      ? req.body.daysAvailable.join(",")
      : "", // Ensure daysAvailable is handled properly
    id,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json("Data updated successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("connected to backend !");
});
