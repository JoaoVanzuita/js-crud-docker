const express = require('express')
const userDao = require('./database/UserDao')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use("/", express.static("./public"))

app.get("/api/user", async (req, res) => {

  const result = await userDao.get()

  res.json({
    "status": 200,
    "message": "success",
    "data": result.rows
  })
})

app.get("/api/user/:id", async (req, res) => {
  const params = [req.params.id]

  const result = await userDao.getById(params)

  if (result.rowCount == 0) {
    res.status(404).json({
      "status": 404,
      "message": "user not found",
    })
    return
  }

  res.json({
    "status": 200,
    "message": "success",
    "data": result.rows
  })
})

app.post("/api/user", async (req, res) => {
  const { name, email } = req.body
  const params = [name, email]

  const result = await userDao.create(params)

  res.status(201).send({
    "status": 201,
    "message": "success",
    "data": result.rows
  })
})

app.put("/api/user/:id", async (req, res) => {
  const { name, email } = req.body
  const id = req.params.id
  const params = [name, email, id]

  const result = await userDao.update(params)

  if (result.rowCount == 0) {
    res.status(404).json({
      "status": 404,
      "message": "user not found",
    })
    return
  }

  res.json({
    "status": 200,
    "message": "success",
    "data": result.rows
  })
})

app.delete("/api/user/:id", async (req, res) => {
  const params = [req.params.id]

  const result = await userDao.delete(params)

  if (result.rowCount == 0) {
    res.status(404).json({
      "status": 404,
      "message": "user not found",
    })
    return
  }

  res.json({
    "status": 200,
    "message": "success",
    "data": result.rows
  })
})

app.listen(port, () => console.log(`Server online - Running on port ${port}`))
