import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateDateHours() {
  const [facilityId, setFacilityId] = useState("");
  const [day, setDay] = useState("");
  const [timeRanges, setTimeRanges] = useState([{ hoursStart: "", hoursEnd: "" }]);

  const addTimeRange = () => {
    setTimeRanges([...timeRanges, { hoursStart: "", hoursEnd: "" }]);
  };

  const handleTimeRangeChange = (index, field, value) => {
    const newTimeRanges = timeRanges.map((tr, i) =>
      i === index ? { ...tr, [field]: value } : tr
    );
    setTimeRanges(newTimeRanges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateHours = {
      facilityId: parseInt(facilityId),
      day,
      timeRanges,
      dateCreation: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://localhost:7097/api/DateHours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dateHours),
      });

      if (response.ok) {
        alert("DateHours created successfully!");
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create DateHours</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Facility ID:</label>
          <input
            type="number"
            className="form-control"
            value={facilityId}
            onChange={(e) => setFacilityId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Day:</label>
          <input
            type="text"
            className="form-control"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          />
        </div>

        {timeRanges.map((timeRange, index) => (
          <div key={index} className="row g-3 align-items-center mb-3">
            <div className="col-md-5">
              <label className="form-label">Start Time:</label>
              <input
                type="time"
                className="form-control"
                value={timeRange.hoursStart}
                onChange={(e) =>
                  handleTimeRangeChange(index, "hoursStart", e.target.value)
                }
                required
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">End Time:</label>
              <input
                type="time"
                className="form-control"
                value={timeRange.hoursEnd}
                onChange={(e) =>
                  handleTimeRangeChange(index, "hoursEnd", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary me-3" onClick={addTimeRange}>
          Add Another Time Range
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDateHours;
