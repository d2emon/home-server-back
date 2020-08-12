import express from 'express';
import getCategories from '../models/categories'

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => getCategories()
    .then(categories => res.json({ categories }))
    .catch(error => res.status(500).json({ error: error.toString() })))

export default router;
