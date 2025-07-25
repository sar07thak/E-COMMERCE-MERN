const express = require("express");
const cookieParser = require("cookie-parser");
const main = require("./config/database");
const app = express();
const cors = require("cors");
const authRouter = require("./Routes/userRoutes");
const userRouter = require("./Routes/CurrentUser");
const productRouter = require("./Routes/productRoutes");
const cartRouter = require("./Routes/cartRoutes");
const orderRouter = require("./Routes/orderRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://e-commerce-mern-frontend-vr2x.onrender.com", "https://e-commerce-mern-admin-2adt.onrender.com"],
    credentials: true,
  })
);
//*   ✅ Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/order",orderRouter);

main()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server start listen");
    });
  })
  .catch((err) => {
    console.log("Error : " + err.message);
  });
