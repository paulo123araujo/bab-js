import { Router } from 'express';
import { container } from './container';

const router = Router();

router.get('/start', (req, res) => container.get('MainController').execute(req, res));
router.post('/send-word', (req, res) => (container.get('SendWordController')).execute(req, res));

export default router;
