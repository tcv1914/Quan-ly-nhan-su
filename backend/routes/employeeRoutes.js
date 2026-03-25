import express from "express";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//phải login mới dùng được
router.get("/", verifyToken, getEmployees);
router.post("/", verifyToken, createEmployee);
router.put("/:id", verifyToken, updateEmployee);
router.delete("/:id", verifyToken, deleteEmployee);

// GET → tất cả đều xem được
router.get("/", verifyToken, getEmployees);

// POST → chỉ admin + hr
router.post("/", verifyToken, authorizeRoles("admin", "hr"), createEmployee);

// UPDATE → admin + hr
router.put("/:id", verifyToken, authorizeRoles("admin", "hr"), updateEmployee);

// DELETE → chỉ admin
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteEmployee);

export default router;
