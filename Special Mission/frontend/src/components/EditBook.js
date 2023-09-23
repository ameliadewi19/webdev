import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        bookname: '',
        author: '',
        stock: 0,
        desc: '',
        price: 0,
        image: null, // Tambahkan state untuk menyimpan gambar
    });

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getBook();
    }, [id]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            // Jika input adalah untuk gambar, ambil file dan set di state
            setBook({
                ...book,
                [e.target.name]: e.target.files[0],
            });
        } else {
            // Jika bukan untuk gambar, ubah state seperti biasa
            setBook({
                ...book,
                [e.target.name]: e.target.value,
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submit button clicked');

        const formData = new FormData();
        formData.append('bookname', book.bookname);
        formData.append('author', book.author);
        formData.append('stock', book.stock);
        formData.append('desc', book.desc);
        formData.append('price', book.price);
        formData.append('file', book.image); // Sisipkan gambar dalam FormData

        try {
            await axios.patch(`http://localhost:5000/books/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Atur tipe konten untuk FormData
                },
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="container mt-5 mb-5">
            <h2>Edit Book with ID: {id}</h2>
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
                    {book.file && book.file instanceof File && (
                        <img
                            src={URL.createObjectURL(book.file)}
                            alt="Selected"
                            style={{ marginTop: '10px', maxWidth: '200px' }}
                        />
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditBook;
