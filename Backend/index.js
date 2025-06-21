const express = require("express");
const cookieParser = require("cookie-parser");
const main = require("./config/database");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/userRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials : true
  })
);
//*   ✅ Routes
app.use("/user", userRouter);

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server start listen");
    });
  })
  .catch((err) => {
    console.log("Error : " + err.message);
  });
