import { Request, Response } from 'express';
import { Game } from '../game/main';

export class MainController {
  constructor(private readonly game: Game) { }

  execute(_req: Request, res: Response) {
    this.game.start();
    return res.render('letters', { letters: this.game.letters, isValid: false });
  }
}
