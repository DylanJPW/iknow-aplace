import {Router} from "express";


export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

const users: User[] = [
  {
    id: 0,
    username: 'test',
    email: 'test@test.com',
    password: 'test',
    createdAt: new Date(),
  }
];

export const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  res.json(users);
});

usersRouter.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({error: 'User not found'});
  }
});
