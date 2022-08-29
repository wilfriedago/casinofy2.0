import Game from "../Models/Game";
import User from "../Models/User";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

class GameController {
  /**
   * Create a new game record
   */
  async create(req: Request, res: Response) {
    const id = uuidv4();

    try {
      const { userId } = req.query;
      const user = await User.findOne({ where: { id: userId } });

      if (!user) return res.status(404).json({ msg: "Cannot find existing record for this user id", status: 404 });

      const game = await Game.create({ ...req.body, userId: user.id, id });
      return res.status(200).json({ game, msg: "Game record created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Failed to create game record", status: 500 });
    }
  }

  /**
   * Get all games records with pagination
   */
  async readWithPagination(req: Request, res: Response) {
    try {
      const limit = (req.query.limit as number | undefined) || 10;
      const offset = req.query.offset as number | undefined;

      const games = await Game.findAndCountAll({ where: {}, limit, offset });
      return res.status(200).json(games);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to read games records", status: 500 });
    }
  }

  /**
   * Get a game record by ID
   */
  async readByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const game = await Game.findOne({ where: { id } });

      return game
        ? res.status(200).json(game)
        : res.status(404).json({ msg: "Cannot find existing record for this game id", status: 404 });
    } catch (error) {
      return res.status(500).json({ msg: "Failed to read game record", status: 500 });
    }
  }

  /**
   * Update a user record
   */
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const game = await Game.findOne({ where: { id } });

      if (!game) return res.status(404).json({ msg: "Cannot find existing record for this game id", status: 404 });

      const updatedGame = await game.update({
        // TODO : Handle this better way !
        isConnected: !game.getDataValue("isLiveGame"),
      });

      return res.status(200).json(updatedGame);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to update game record", status: 500 });
    }
  }

  /**
   * Delete a game record
   */
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const game = await Game.findOne({ where: { id } });

      if (!game) return res.status(404).json({ msg: "Cannot find existing record for this game id", status: 404 });

      const deletedGame = await game.destroy();

      return res.status(200).json(deletedGame);
    } catch (error) {
      return res.status(500).json({ msg: "Failed to delete game record", status: 500 });
    }
  }
}

export default new GameController();
