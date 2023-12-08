import { useEffect, useState } from "react";

function Book(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(props.books)
    }, [props.books]);

    return (
        <div className="section">
            {books.map((book) => (
                <p key={book.id}><i className="file"></i> {book.title}</p>
            ))}
        </div>
    );
}

export default Book;