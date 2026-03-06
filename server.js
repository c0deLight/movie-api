const express = require("express")

const app = express()

const movies = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Interstellar" },
  { id: 3, title: "The Dark Knight" }
]

app.get("/", (req, res) => {
  res.send("Movie API running")
})

app.get("/movies", (req, res) => {
  res.json(movies)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})