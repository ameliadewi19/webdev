const express = require("express");

const {
    getBooks,
    getBookById,
    saveBook,
    updateBook,
    deleteBook
} = require ("../controllers/BookController.js");

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', saveBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

module.exports = router;