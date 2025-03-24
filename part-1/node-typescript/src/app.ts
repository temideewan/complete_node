import express, { Express, NextFunction, Request, Response } from 'express';
import { IUser, User } from './models/User';

const app: Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
  startTime?: number;
}

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TS express');
});

app.get('/users', async(req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({message: "Users retrieved successfully", data: users})
  } catch (e) {
    res.status(400).json({message: "Something went wrong"})
  }
});

interface User {
  name: string;
  email: string;
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
  const { name, email } = req.body;
  res.json({
    name,
    email,
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
