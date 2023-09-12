const Book = require("../models/BookModel.js");
const path = require("path");
const fs = require("fs");

const getBooks = async (req, res) => {
  try {
    const response = await Book.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Terjadi kesalahan dalam pengambilan data buku.");
  }
}

const getBookById = async (req, res) => {
  try {
    const response = await Book.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
}

const saveBook = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const bookname = req.body.bookname;
  const author = req.body.author;
  const stock = req.body.stock;
  const desc = req.body.desc;
  const price = req.body.price; // Ambil nilai harga dari permintaan

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
          const createdBook = await Book.create({
              bookname: bookname,
              author: author,
              stock: stock,
              desc: desc,
              image: fileName,
              url: url,
              price: price // Tambahkan 'price' ke buku yang dibuat
          });
          res.status(201).json({ msg: "Book Created Successfully", url: createdBook.url });
      } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "An error occurred while creating the book" });
      }
  });
}

const updateBook = async (req, res) => {
  const bookId = req.params.id;

  try {
      const book = await Book.findByPk(bookId);

      if (!book) return res.status(404).json({ msg: "No Data Found" });

      let fileName = book.image;
      if (req.files !== null) {
          const file = req.files.file;
          const fileSize = file.data.length;
          const ext = path.extname(file.name);
          fileName = file.md5 + ext;
          const allowedType = ['.png', '.jpg', '.jpeg'];

          if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
          if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

          const filepath = `./public/images/${book.image}`;
          fs.unlinkSync(filepath);

          file.mv(`./public/images/${fileName}`, (err) => {
              if (err) return res.status(500).json({ msg: err.message });
          });
      }

      const { bookname, author, stock, desc, price } = req.body;

      await book.update({
          bookname: bookname,
          author: author,
          stock: stock,
          desc: desc,
          image: fileName,
          url: `${req.protocol}://${req.get("host")}/images/${fileName}`,
          price: price // Update harga
      });

      res.status(200).json({ msg: "Book Updated Successfully", url: book.url });
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: error.message });
  }
}


  
const deleteBook = async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const book = await Book.findByPk(bookId);
  
      if (!book) return res.status(404).json({ msg: "No Data Found" });
  
      const filepath = `./public/images/${book.image}`;
      fs.unlinkSync(filepath);
  
      await book.destroy();
  
      res.status(200).json({ msg: "Book Deleted Successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: error.message });
    }
}
  
module.exports = {
    getBooks,
    getBookById,
    saveBook,
    updateBook,
    deleteBook
};