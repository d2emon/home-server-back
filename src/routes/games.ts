import express from 'express';
import games from '../data/videoGames';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => res
    .json({ games }));

export default router;
