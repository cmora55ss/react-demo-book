function Location({locations, selectLocation}) {
    return (
        <div className="section">
            <p><a><i className="folder"></i> &#8230;</a></p>
            {locations.map((location) => (
                <p key={location.id}>
                    <button className="link no-underline" onClick={() => selectLocation(location.id)}><i className="folder"></i> {location.name}</button>
                </p>
            ))}
        </div>
    );
}

export default Location;