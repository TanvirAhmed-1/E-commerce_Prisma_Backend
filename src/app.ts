// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import { BaseRouter } from "./app/routes";
// //import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// //import notFoundHandler from "./app/middlewares/notFoundHandler";
// import path from "path";

// const app: Application = express();
// app.use(cors());

// //Parsers
// app.use(express.json());

// // Route
// app.use("/api", BaseRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("thsi  server running successfully!");
//   //res.sendFile(path.join(__dirname, "../index.html"));
// });

// // Global error handler
// //app.use(globalErrorHandler);

// //Handling not found
// //app.use(notFoundHandler);

// export default app;

// app.ts
import express from "express";
import cors from "cors";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { BaseRouter } from "./app/routes";
import { UserRouter } from "./app/modules/user/user.route";
import { categoryRoute } from "./app/modules/category/category.route";
// path adjust করো

const app = express();
app.use(cors());
app.use(express.json());

// Mount user routes
//app.use("/api", categoryRoute);

app.use("/api", BaseRouter);

app.get("/", (req, res) => {
  res.send("Server running successfully!");
});

//  Global error handler
app.use(globalErrorHandler);

// Handling not found
app.use(notFoundHandler);

export default app;
