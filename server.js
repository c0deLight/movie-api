const express = require("express")

const app = express()

const movies = [
  { id: 1, title: "Inception" },
  { id: 2, title: "Interstellar" },
  { id: 3, title: "The Dark Knight" }
]

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Movie API running")
})

app.get("/movies", (req, res) => {
  res.json(movies)
})

app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id)

  const movie = movies.find(m => m.id === id)

  if (!movie) {
    return res.status(404).json({ message: "Movie not found"})
  }

  res.json(movie)
})

app.get("/search", (req, res) => {
  const query = req.query.q

  if (!query) {
    return res.status(400).json({ message: "Please provide a search query" })
  }

  const results = movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  )

  res.json(results)
})

app.post("/movies", (req, res) => {

  const { title } = req.body

  if (!title) {
    return res.status(400).json({ message: "Title is required" })
  }

  const newMovie = {
    id: movies.length + 1,
    title
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)

})

app.put("/movies/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const movie = movies.find(m => m.id === id)

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" })
  }

  const { title } = req.body

  if (title) {
    movie.title = title
  }

  res.json(movie)

})

app.delete("/movies/:id", (req, res) => {

  const id = parseInt(req.params.id)

  const index = movies.findIndex(m => m.id === id)

  if (index === -1) {
    return res.status(404).json({ message: "Movie not found" })
  }

  movies.splice(index, 1)

  res.json({ message: "Movie deleted" })

})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})

