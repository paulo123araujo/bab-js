import { DIContainer } from 'rsdi';
import { Game } from './game/main';
import { MainController } from './controllers/main-controller';
import { SendWordController } from './controllers/send-word-controller';

function configureDI() {
  return new DIContainer()
    .add('Game', () => new Game())
    .add('MainController', ({ Game }) => new MainController(Game))
    .add('SendWordController', ({ Game }) => new SendWordController(Game));
}

export const container = configureDI();

export default configureDI;
