import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function DateHoursList() {
  const [dateHoursList, setDateHoursList] = useState([]);

  const fetchDateHours = async () => {
    try {
      const response = await fetch("https://localhost:7097/api/DateHours");
      if (response.ok) {
        const data = await response.json();
        setDateHoursList(data);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDateHours();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">DateHours List</h1>
      <button className="btn btn-primary mb-4" onClick={fetchDateHours}>
        Load DateHours
      </button>

      {dateHoursList.length === 0 ? (
        <p>No DateHours found</p>
      ) : (
        <ul className="list-group">
          {dateHoursList.map((dateHours, index) => (
            <li key={index} className="list-group-item mb-3">
              <h5>
                <strong>Facility ID:</strong> {dateHours.facilityId}
              </h5>
              <p>
                <strong>Day:</strong> {dateHours.day}
              </p>
              <p>
                <strong>Date Creation:</strong>{" "}
                {new Date(dateHours.dateCreation).toLocaleString()}
              </p>
              <div>
                <strong>Time Ranges:</strong>
                {dateHours.timeRanges.map((tr, i) => (
                  <div key={i} className="ms-3">
                    <p>
                      <strong>Start Time:</strong> {tr.hoursStart} <br />
                      <strong>End Time:</strong> {tr.hoursEnd}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DateHoursList;
