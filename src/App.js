import React, { useEffect, useState, Suspense, useRef } from "react";
import "./App.css";
import { query } from "express";

const BookComponent = React.lazy(() => import('./components/Book'));
const LocationComponent = React.lazy(() => import('./components/Location'));

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const selectedLocation = useRef(null);

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

  const getLocations = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);

      let location = data[0].id;
      selectedLocation.current = location;
      getSelectedBooks(`/api/locations/${location}/books`);
      getSelectedLocations(`/api/locations/${location}/locations`)
    });
  }

  useEffect(() => {
    let url = `/api/locations`;
    getLocations(url);
  }, []);

  const selectLocation = (location) => {
    getSelectedLocations(`/api/locations/${location}/locations`);
    getSelectedBooks(`/api/locations/${location}/books`)
  }

  const getClassName = (location) => {
    if (selectedLocation.current === location) {
      return 'active';
    }
    return;
  }

  return (
    <div className="App">
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="locations">
            <li>Location:</li>
            {locations.map((location) => (
              <li key={location.id} className={getClassName(location.id)}>
                {location.name}
              </li>
            ))}
            <li className="form">
              <form>
                <input name="name" />
                <button type="submit">Add Location</button>
              </form>
            </li>
            <li className="form">
              <form>
                <input name="name" />
                <button type="submit">Add Book</button>
              </form>
            </li>
          </ul>
          <LocationComponent locations={selectedLocations}/>
          <BookComponent books={selectedBooks} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
