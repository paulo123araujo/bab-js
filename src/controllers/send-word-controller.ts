import { Request, Response } from 'express';
import { Game } from '../game/main';

export class SendWordController {
  constructor(private readonly game: Game) {
  }

  async execute(req: Request, res: Response) {
    const { word } = req.body;
    const isValid = await this.game.validateWord(word);
    return res.render('letters', { letters: this.game.letters, isValid });
  }
}
