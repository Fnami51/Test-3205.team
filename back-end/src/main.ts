import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { port } from './setting';

interface User {
    email: string;
    number: string;
}
  
interface SearchRequest {
    email: string;
    number?: string;
}
  
interface SearchResponse {
    users: User[];
}
  

const app = express();
let activeTimeout: NodeJS.Timeout | null = null;

const users: User[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'));

app.use(cors());
app.use(bodyParser.json());

app.post('/contacts', (request: Request, responce: Response) => {
  const { email, number }: SearchRequest = request.body;

  console.log('Получено: ', request.body);

  if (!email || !validateEmail(email) || (number && !validateNumber(number))) {
    return responce.status(400).send({ error: 'Неверно введены данный. Исправьте и попробуйте снова' });
  }

  if (activeTimeout) {
    clearTimeout(activeTimeout);
    activeTimeout = null;
  }

  
  activeTimeout = setTimeout(() => {
    const result: SearchResponse = {
      users: users.filter(user =>
        user.email === email && (!number || user.number === number)
      )
    };
    responce.json(result);
    console.log("Отправлено: ", result)
    activeTimeout = null;
  }, 5000); 
});

function validateEmail(email: string): boolean {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(email);
}

function validateNumber(number: string): boolean {
  const regExp = /^\d{6}$/;
  return regExp.test(number);
}

app.listen(port, () => {
  console.log(`Сервер запущен http://localhost:${port}`);
});
