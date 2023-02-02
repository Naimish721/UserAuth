const express = require("express");
const app = express();
require("dotenv").config();

require("./config/db").connectdb();
app.use(express.json());
app.use(require("./routes/routes")); //remember this!!!!


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
