import db from "../config/db.js";

// GET ALL
export const getEmployees = (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE
export const createEmployee = (req, res) => {
  const { name, email, phone, position, salary } = req.body;

  const sql =
    "INSERT INTO employees (name, email, phone, position, salary) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, phone, position, salary], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee created ✅" });
  });
};

// UPDATE
export const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, position, salary } = req.body;

  const sql =
    "UPDATE employees SET name=?, email=?, phone=?, position=?, salary=? WHERE id=?";

  db.query(sql, [name, email, phone, position, salary, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee updated ✅" });
  });
};

// DELETE
export const deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM employees WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Employee deleted 🗑️" });
  });
};
