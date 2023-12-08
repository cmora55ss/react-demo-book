import { useEffect, useState } from "react";

function Location(props) {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        console.log(props.locations)
        setLocations(props.locations);
    }, [props.locations]);

    return (
        <div className="section">
            <p><a>&#8230;</a></p>
            {locations.map((location) => (
                <p key={location.id}><i className="folder"></i> {location.title}</p>
            ))}
        </div>
    );
}

export default Location;