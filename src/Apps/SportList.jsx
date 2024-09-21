import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SportList() {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the Sport list from the API
  const fetchSports = async () => {
    try {
      const response = await fetch("https://localhost:7097/api/SportList");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSports(data);
    } catch (error) {
      console.error("An error occurred while fetching the Sports:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const handleCardClick = (sportId) => {
    navigate(`/pageBooking/${sportId}`);
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading Sports...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p>Error: {error}</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Sport List</h1>
      <div className="row">
        {sports.length > 0 ? (
          sports.map((sport) => (
            <div className="col-md-4 mb-4" key={sport.id}>
              <div className="card h-100" onClick={() => handleCardClick(sport.id)}>
                {sport.imagePath && (
                  <img
                    src={sport.imagePath}
                    className="card-img-top"
                    alt={`${sport.name}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{sport.name}</h5>
                  <p className="card-text">
                    <strong>Sport Code:</strong> {sport.sportCode}<br />
                    <strong>Category ID:</strong> {sport.categoryId}<br />
                    <strong>Number of Players:</strong> {sport.numberPlayer}<br />
                    <strong>Delay Time:</strong> {sport.delayTime}<br /> {/* Fixed typo */}
                    <strong>Condition:</strong> {sport.condition || 'N/A'}<br />
                    <strong>Description:</strong> {sport.description}<br />
                    {sport.price !== undefined && (
                      <><strong>Price:</strong> ${sport.price}<br /></>
                    )}
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Created: {new Date(sport.dateCreated).toLocaleString()}<br />
                    Updated: {sport.dateUpdated ? new Date(sport.dateUpdated).toLocaleString() : 'N/A'}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Sports found.</p>
        )}
      </div>
    </div>
  );
}

export default SportList;
