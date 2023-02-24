const express = require('express');
const router = express.Router();
const movieShows = require('../models/movies-show');


router.get('/all-movies-shows', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const filter = req.query.filter;
  const search = req.query.search || '';

  let query = {};
  if (filter) {
    query = {
      '$and': [
        {
          '$or': [
            { 'title': { $regex: search, $options: 'i' } },
            { 'cast': { $regex: search, $options: 'i' } },
          ],
        },
        { 'type': filter }
      ]
    }
  }
  query = {
    '$and': [
      {
        '$or': [
          { 'title': { $regex: search, $options: 'i' } },
          { 'cast': { $regex: search, $options: 'i' } },
        ],
      },
    ]
  }

  try {
    const movieShowCollection = await movieShows.find(query).limit(limit * 1).skip((page - 1) * limit).exec();
    const totalCount = await movieShows.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).send({
      moviesShows: movieShowCollection,
      paging: {
        totalCount,
        currentPage: page,
        totalPages,
      },
    })
  } catch (e) {
    console.log("Error", e)
    res.status(500).send({
      data: null,
    })
  }
})

module.exports = router;