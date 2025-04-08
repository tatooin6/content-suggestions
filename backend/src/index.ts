import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("backend runnig");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
