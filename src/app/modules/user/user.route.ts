import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// Create a user
router.post("/users", UserController.createdUser);

// Fetch all users
router.get("/users", UserController.fetchUser);

// Update a user by ID
router.put("/users/:userId", UserController.updateUser);

// Delete a user by ID
router.delete("/users/:userId", UserController.deleteUser);

export const UserRouter = router;
