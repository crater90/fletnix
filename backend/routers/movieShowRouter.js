const express = require('express');
const router = express.Router();
const movieShows = require('../models/movies-show');


router.get('/all-movies-shows', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 15;
  const filter = req.query.filter;
  const search = req.query.search || '';
  const age = req.query.age < 18 ? true : false;

  let query = {};

  if (filter === 'Movie' || filter === 'TV Show') {
    query = {
      '$and': [
        {
          '$or': [
            { 'title': { $regex: search, $options: 'i' } },
            { 'cast': { $regex: search, $options: 'i' } },
          ],
        },
        { 'type': filter },
        age ? ({ 'rating': { '$ne': 'R' } }) : ({})
      ]
    }
  } else {
    query = {
      '$and': [
        {
          '$or': [
            { 'title': { $regex: search, $options: 'i' } },
            { 'cast': { $regex: search, $options: 'i' } },
          ],
        },
        age ? ({ 'rating': { '$ne': 'R' } }) : ({})
      ]
    }
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

router.get('/get-a-movie-show', async (req, res) => {
  const id = req.query.id;
  try {
    const doc = await movieShows.find({ 'show_id': id })
    res.status(200).send({
      data: doc
    })

  } catch (error) {
    console.log("Error", error);
    res.status(500).send({
      data: null,
    })
  }

})
module.exports = router;