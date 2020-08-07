import log from 'winston'
import express from 'express'

const router = express.Router();

interface RollParams {
    burst?: boolean;
    savageDice?: boolean;
}

const roll = (dice: number): number => (Math.floor(Math.random() * dice) + 1);

const burstRoll = (dice: number): number[] => {
    const result: number[] = [];
    let baseRoll: number;
    while (!result.length || (baseRoll === dice)) {
        baseRoll = roll(dice);
        result.push(baseRoll);
    }
    return result;
};

const complexRoll = (dice: number, count: number = 1, params: RollParams = {}): number[] => {
    const result: number[] = [];
    const {
        burst = false,
        savageDice = false,
    } = params;
    for (let i = 0; i < count; i += 1) {
        result.push(roll(dice));
    }
    if (savageDice) {
        result.push(roll(6));
    }
    return result;
}

router.get('/d:dice', (req: express.Request, res: express.Response) => res.json({
    result: complexRoll(
        parseInt(req.params.dice, 0),
        parseInt(`${req.query.count}`, 0) || 1,
        {
            savageDice: !!req.query.savage,
        }
    ),
}));

export default router;
