import React, { useEffect, useState, Suspense, useRef } from "react";
import "./App.css";

const BookComponent = React.lazy(() => import('./components/Book'));
const LocationComponent = React.lazy(() => import('./components/Location'));

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const getLocations = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }

  const getSelectedLocations = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSelectedLocations(data));
  }

  const getSelectedBooks = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setSelectedBooks(data));
  }

  useEffect(() => {
    let url = `/api/locations`;
    getLocations(url);
  }, []);

  const selectLocation = (location) => {
    getSelectedLocations(`/api/locations/${location}/locations`);
    getSelectedBooks(`/api/locations/${location}/books`)
  }

  return (
    <div className="App">
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="locations">
            <li>Location:</li>
            {locations.map((location) => (
              <li key={location.id}>
                <button className="link" onClick={() => selectLocation(location.id)}>{location.name}</button>
              </li>
            ))}
            <li>
              <form>
              <input name="name" />
              <button type="submit">Add Location</button>
              </form>
            </li>
          </ul>
          <LocationComponent locations={selectedLocations} />
          <BookComponent books={selectedBooks} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
