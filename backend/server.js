let express = require("express");
let cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json()); // Hier muss express.json() sein

app.post("/Register", async (req, res) => {
  const { email, password, name, vorname, firma, adresse } = req.body;

  console.log(req.body)

  res.status(200).json("Daten sind da");
});

app.put("/api/updateProfile", (req, res) => {
  const userData = req.body;

  console.log(userData);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});
