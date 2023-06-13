import express, { Request, Response } from "express";
import cors from "cors";

import parksRouter from "./routers/parksRouter";
// import reviewsRouter from "./routers/reviewsRouter";
import usersRouter from "./routers/usersRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/parks", parksRouter);
// app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);

app.get("*", (req: Request, res: Response) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

export default app;