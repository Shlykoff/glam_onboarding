import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

interface IState {
  started: number;
  finished: number;
  step: number[];
}

// This is a simple state. It would be better to connect a database.
const state: IState = {
  started: 0,
  finished: 0,
  step: [0, 0, 0],
};

app.post("/", (req: Request, res: Response) => {
  const { isStarted, isFinished, step } = req.body;
  if (isStarted) state.started++;
  if (isFinished) state.finished++;
  if (step) state.step[step - 1]++;
  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response<IState>) => {
  res.json(state);
});

app.set("port", PORT);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { server };
