import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [localtions, setLocations] = useState([]);

  useEffect(() => {
    fetch(`/api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    fetch(`/api/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  return (
    <div className="App">
      <div className="content">
        <ul className="locations">
        {localtions.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
        </ul>
        {books.map((book) => (
          <p key={book.id}><i className="fa fa-folder"></i> {book.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
