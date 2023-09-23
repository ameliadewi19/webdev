import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        bookname: '',
        author: '',
        stock: 0,
        desc: '',
        price: 0,
        image: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setBook({
                ...book,
                [e.target.name]: e.target.files[0],
            });
        } else {
            setBook({
                ...book,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bookname', book.bookname);
        formData.append('author', book.author);
        formData.append('stock', book.stock);
        formData.append('desc', book.desc);
        formData.append('price', book.price);
        formData.append('file', book.image);

        try {
            await axios.post(`http://localhost:5000/books`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Book Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="bookname"
                        value={book.bookname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={book.stock}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="desc"
                        value={book.desc}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control-file"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddBook;
