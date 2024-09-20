import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

function FacilityList() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Create navigate function

  // Fetch the facility list from the API
  const fetchFacilities = async () => {
    try {
      const response = await fetch("https://localhost:7097/api/FacilityList");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFacilities(data);
    } catch (error) {
      console.error("An error occurred while fetching the facilities:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleCardClick = (facilityId) => {
    navigate(`/pageBooking/${facilityId}`); // Navigate to PageBooking with facilityId
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading facilities...</p></div>;
  }

  if (error) {
    return <div className="container mt-5"><p>Error: {error}</p></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Facility List</h1>
      <div className="row">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div className="col-md-4 mb-4" key={facility.id}>
              <div className="card h-100" onClick={() => handleCardClick(facility.id)}>
                <img
                  src={facility.imagePath}
                  className="card-img-top"
                  alt={`${facility.name}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{facility.name}</h5>
                  <p className="card-text">
                    <strong>Facility Code:</strong> {facility.facilityCode}<br />
                    <strong>Category ID:</strong> {facility.categoryId}<br />
                    <strong>Description:</strong> {facility.description}<br />
                    <strong>Price:</strong> ${facility.price}<br />
                    <strong>Status:</strong> {facility.status === 0 ? "Inactive" : "Active"}<br />
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Created: {new Date(facility.dateCreated).toLocaleString()}<br />
                    Updated: {new Date(facility.dateUpdated).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No facilities found.</p>
        )}
      </div>
    </div>
  );
}

export default FacilityList;
