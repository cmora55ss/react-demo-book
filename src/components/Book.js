function Book({ books }) {
    return (
        <div className="section">
            {books.map((book) => (
                <p key={book.id}><i className="file"></i> {book.title}</p>
            ))}
        </div>
    );
}

export default Book;