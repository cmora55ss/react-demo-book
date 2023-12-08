import { useEffect, useState } from "react";

function Book(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log(props.books)
        setBooks(props.books)
    }, [props.books]);

    return (
        <div>
            {books.map((book) => (
                <p key={book.id}><i className="fa fa-folder"></i> {book.title}</p>
            ))}
        </div>
    );
}

export default Book;