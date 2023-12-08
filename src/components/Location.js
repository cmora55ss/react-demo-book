import { useEffect, useState } from "react";

function Location(props) {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        console.log(props.location)
        fetch(`/api/locations/${props.location}/locations`)
          .then((res) => res.json())
          .then((data) => setLocations(data));
    }, [props.location]);

    return (
        <div>
            <p><a>&#8230;</a></p>
            {locations.map((location) => (
                <p key={location.id}><i className="fa fa-folder"></i> {location.title}</p>
            ))}
        </div>
    );
}

export default Location;