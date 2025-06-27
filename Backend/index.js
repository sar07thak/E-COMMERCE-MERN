const express = require("express");
const cookieParser = require("cookie-parser");
const main = require("./config/database");
const app = express();
const cors = require("cors");
const authRouter = require("./Routes/userRoutes");
const userRouter = require("./Routes/CurrentUser");
const productRouter = require("./Routes/productRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

//*   ✅ Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product",productRouter);

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server start listen");
    });
  })
  .catch((err) => {
    console.log("Error : " + err.message);
  });
