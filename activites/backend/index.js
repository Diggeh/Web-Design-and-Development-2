import experess from "express";

const app = experess();
const PORT = 3000;

// get -> display name, var name = "Your Name"
// post -> logic, if username="admin" and password="admin" -> success else failed

app.use(experess.json());

app.get("/getName", (req, res) => {
  var name = "Your Name";
  res.status(200).json(name);
});

app.post("/login", (req, res) => {
  var { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.status(200).json({
      message: "Login Successfully.",
      status: "success",
    });
  } else {
    res.status(403).json({
      message: "Invalid username or password.",
      status: "failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
