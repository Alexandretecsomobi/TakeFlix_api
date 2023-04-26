import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import route from "./routes";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  express.json()(req, res, next);
});
app.use(cors());
app.use(route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(3001, () => console.log("server online"));
