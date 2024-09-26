const express = require("express")
const router = require("./routes/task")
const app = express()
const dbConnection = require('./config/config');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)


dbConnection()

const PORT = 8080
app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))
