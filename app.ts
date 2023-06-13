import express, { Express, Request, Response } from "express";
import cors from "cors";
import { handleCustomErrors, handleServerErrors } from "./errors/error"

import parksRouter from "./routers/parksRouter";
// import reviewsRouter from "./routers/reviewsRouter";
// import usersRouter from "./routers/usersRouter";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/api/parks", parksRouter);
// app.use("/api/reviews", reviewsRouter);
// app.use("/api/users", usersRouter);

app.get("*", (req: Request, res: Response) =>
  res.status(404).send({ message: "Endpoint Not Found" })
);

app.use(handleCustomErrors);
app.use(handleServerErrors);

export default app;