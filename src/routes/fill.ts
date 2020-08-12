import express from 'express';
import User, {
  IUser,
} from '../models/user';

const router = express.Router();

router.get('/users', (req: express.Request, res: express.Response) => {
  const user: IUser = new User({
    username: 'Tester',
    password: 'secret',
  });

  return user
    .save((err: Error) => {
      if (err) return res.status(500).json({ error: err.message });

      return User.findOne(
        { username: 'Tester' },
        (e: Error, tester?: IUser) => {
          if (e) {
            return res.status(500).json({ error: e.message });
          } else {
            return res.json({ user: tester })
          }
        },
      );
    });
});

export default router;
