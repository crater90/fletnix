const mongoose = require('mongoose');

const movieShowSchema = mongoose.Schema({
    show_id: {
        type: String
    },
    type: {
        type: String
    },
    title: {
        type: String
    },
    director: {
        type: String
    },
    country: {
        type: String
    },
    date_added: {
        type: String
    },
    release_year: {
        type: String
    },
    rating: {
        type: String
    },
    duration: {
        type: String
    },
    listed_in: {
        type: String
    },
    description: {
        type: String
    },
    cast: {
        type: String
    }
})

module.exports = mongoose.model("Movies-show", movieShowSchema);

