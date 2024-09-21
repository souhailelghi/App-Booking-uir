import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UpdateDateHours() {
  const [id, setId] = useState("");
  const [SportId, setSportId] = useState("");
  const [day, setDay] = useState("");
  const [timeRanges, setTimeRanges] = useState([{ hoursStart: "", hoursEnd: "" }]);

  const fetchDateHours = async (id) => {
    try {
      const response = await fetch(`https://localhost:7097/api/DateHours/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSportId(data.SportId);
        setDay(data.day);
        setTimeRanges(data.timeRanges);
      } else {
        alert("DateHours not found.");
      }
    } catch (error) {
      alert(`An error occurred while fetching DateHours: ${error.message}`);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) {
      setId(idFromUrl);
      fetchDateHours(idFromUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDateHours = {
      id: parseInt(id),
      SportId: parseInt(SportId),
      day,
      timeRanges,
    };

    try {
      const response = await fetch(`https://localhost:7097/api/DateHours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDateHours),
      });

      if (response.ok) {
        alert("DateHours updated successfully!");
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  const addTimeRange = () => {
    setTimeRanges([...timeRanges, { hoursStart: "", hoursEnd: "" }]);
  };

  const handleTimeRangeChange = (index, field, value) => {
    const newTimeRanges = timeRanges.map((tr, i) =>
      i === index ? { ...tr, [field]: value } : tr
    );
    setTimeRanges(newTimeRanges);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update DateHours</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID:</label>
          <input
            type="number"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sport ID:</label>
          <input
            type="number"
            className="form-control"
            value={SportId}
            onChange={(e) => setSportId(e.target.value)}
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
          <div key={index} className="mb-3">
            <label className="form-label">Start Time:</label>
            <input
              type="time"
              className="form-control"
              value={timeRange.hoursStart}
              onChange={(e) => handleTimeRangeChange(index, "hoursStart", e.target.value)}
              required
            />
            <label className="form-label">End Time:</label>
            <input
              type="time"
              className="form-control"
              value={timeRange.hoursEnd}
              onChange={(e) => handleTimeRangeChange(index, "hoursEnd", e.target.value)}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <button type="button" className="btn btn-secondary me-2" onClick={addTimeRange}>
            Add Another Time Range
          </button>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDateHours;
