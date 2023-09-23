import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const history = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        // Navigasi ke halaman edit buku dengan ID tertentu
        history(`/edit-book/${id}`);
    }

    const handleAdd = (id) => {
        // Navigasi ke halaman add buku
        history(`/add-book`);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="price-area section-gap" id="price">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="menu-content pb-60 col-lg-9">
                        <div className="title text-center">
                            <h1 className="mb-10">Top Book</h1>
                            <p>Who are in extremely love with book.</p>
                            <button
                                className="btn btn-primary mr-2"
                                onClick={() => handleAdd()}
                            >
                            Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {books.map((book) => (
                        <div className="col-lg-4" key={book.id}>
                            <div className="single-course item">
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <img
                                        className="img-fluid"
                                        src={book.url}
                                        alt="Image"
                                        style={{ width: '80%' }}
                                    />
                                </div>
                                <div className="details">
                                    <a href="#">
                                        <h4 className="text-black">
                                            {book.bookname} <br />
                                            <span className="price float-left mt-2">{book.price}</span>
                                        </h4>
                                    </a>
                                    <p className="mt-4">{book.desc}</p>
                                    <div className="mt-4">
                                        <button
                                            className="btn btn-primary mr-2"
                                            onClick={() => handleEdit(book.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookList;
