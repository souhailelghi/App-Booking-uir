import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

function SportList() {
  const [Sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Create navigate function

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

  const handleCardClick = (SportId) => {
    navigate(`/pageBooking/${SportId}`); // Navigate to PageBooking with SportId
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
        {Sports.length > 0 ? (
          Sports.map((Sport) => (
            <div className="col-md-4 mb-4" key={Sport.id}>
              <div className="card h-100" onClick={() => handleCardClick(Sport.id)}>
                {Sport.imagePath && (
                  <img
                    src={Sport.imagePath}
                    className="card-img-top"
                    alt={`${Sport.name}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{Sport.name}</h5>
                  <p className="card-text">
                    <strong>Sport Code:</strong> {Sport.sportCode}<br />
                    <strong>Category ID:</strong> {Sport.categoryId}<br />
                    <strong>Number of Players:</strong> {Sport.numberPlayer}<br />
                    <strong>Delay Time:</strong> {Sport.delyTime}<br />
                    <strong>Condition:</strong> {Sport.condition || 'N/A'}<br />
                    <strong>Description:</strong> {Sport.description}<br />
                    <strong>Price:</strong> ${Sport.price}<br />
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Created: {new Date(Sport.dateCreated).toLocaleString()}<br />
                    Updated: {Sport.dateUpdated ? new Date(Sport.dateUpdated).toLocaleString() : 'N/A'}
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
