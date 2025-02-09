// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors()); // Enable CORS for all routes

// app.get("/api/quiz", async (req, res) => {
//   try {
//     const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).send("Error fetching quiz data");
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

app.get('/api/quiz', (req, res) => {
  const sampleQuizData = {
    id: 1,
    name: "Sample Quiz",
    title: "A Fun Quiz on General Knowledge",
    description: "Test your knowledge with this fun quiz!",
  };
  res.json(sampleQuizData);
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
