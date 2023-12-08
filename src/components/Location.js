function Location({locations, selectLocation}) {
    // const [locations, setLocations] = useState([]);

    // useEffect(() => {
    //     setLocations(props.locations);
    // }, [props.locations]);

    return (
        <div className="section">
            <p><a>&#8230;</a></p>
            {locations.map((location) => (
                <p key={location.id}>
                    <button className="link no-underline" onClick={() => selectLocation(location.id)}><i className="folder"></i> {location.title}</button>
                </p>
            ))}
        </div>
    );
}

export default Location;