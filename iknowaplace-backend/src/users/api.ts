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
let nextId = 1;

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

usersRouter.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).json({message: 'User deleted'});
  } else {
    res.status(404).json({error: 'User not found'});
  }
});

usersRouter.post('/', (req, res) => {
  const { username, email, password } = req.body ?? {};

  if (!username || !email || !password) {
    res.status(400).json({error: 'Missing required fields'});
    return;
  }

  const usernameTrimmed = username.trim();
  const emailTrimmed = email.trim();

  const user: User = {
    id: nextId++,
    username: usernameTrimmed,
    email: emailTrimmed,
    password,
    createdAt: new Date(),
  };

  users.push(user);
  res.status(201).json(user);
});

usersRouter.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).json({error: 'User not found'});
    return;
  }

  const { username, email, password } = req.body ?? {};
  if (username) {
    user.username = username.trim();
  }
  if (email) {
    user.email = email.trim();
  }
  if (password) {
    user.password = password;
  }
  res.status(200).json(user);
});
