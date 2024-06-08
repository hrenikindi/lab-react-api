import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fetch() {
    const [content, setContent] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://reactnd-books-api.udacity.com/books", {
                headers: { 'Authorization': 'whatever-you-want' }
            });
            setContent(response.data.books);
        } catch (error) {
            const errorMsg = error.response && error.response.status === 404
                ? 'Resource not found (404)'
                : 'An error occurred';
            setContent({ books: [], error: errorMsg });
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="App">
            <h1>Book List</h1>
            <ul>
                {content.map(book => (
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        <img src={book.imageLinks.thumbnail} alt={book.title} />
                        <p>{book.description}</p>
                        <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                        <br />
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Fetch;
