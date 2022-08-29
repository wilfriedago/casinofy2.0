import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../Models/User";

class UserController {
  /**
   * Create new user record
   */
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const user = await User.create({ ...req.body, id });
      return res.status(200).json({ user, msg: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "Failed to create user record", status: 500 });
    }
  }

  /**
   * Get all users records with pagination
   */
  async readWithPagination(req: Request, res: Response) {
    try {
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const users = await User.findAndCountAll({ where: {}, limit, offset });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to read users records", status: 500 });
    }
  }

  /**
   * Get a user record by ID
   */
  async readByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      return user
        ? res.status(200).json(user)
        : res.status(404).json({ msg: "Cannot find existing record for this user id", status: 404 });
    } catch (error) {
      return res.status(500).json({ msg: "Failed to read user record", status: 500 });
    }
  }

  /**
   * Update a user record
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      if (!user) return res.status(404).json({ msg: "Cannot find existing record for this user id", status: 404 });

      const updatedUser = await user.update({
        // TODO : Handle this better way !
        isConnected: !user.getDataValue("isConnected"),
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to update user record", status: 500 });
    }
  }

  /**
   * Delete a user record
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });

      if (!user) return res.status(404).json({ msg: "Cannot find existing record for this user id", status: 404 });

      const deletedUser = await user.destroy();

      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to delete user record", status: 500 });
    }
  }
}

export default new UserController();
