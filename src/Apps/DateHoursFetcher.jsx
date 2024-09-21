import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DateHoursFetcher = ({ day }) => {
  const [dateHours, setDateHours] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (day) {
      fetchDateHours();
    }
  }, [day]);

  const fetchDateHours = async () => {
    try {
      const response = await axios.get(`https://localhost:7097/api/DateHours/day/${day}`);
      setDateHours(response.data);
      setError('');
    } catch (err) {
      setError('No data found for the specified day.');
      setDateHours([]);
    }
  };

  return (
    <div>
      <h1>Fetch Date Hours for {day}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Date Hours:</h2>
      <ul>
        {dateHours.map((dateHour) => (
          <li key={dateHour.id}>
            <strong>{dateHour.day}</strong> (Sport ID: {dateHour.SportId})<br />
            <em>Created on: {new Date(dateHour.dateCreation).toLocaleString()}</em>
            <ul>
              {dateHour.timeRanges.map((timeRange) => (
                <li key={timeRange.id}>
                  {timeRange.hoursStart} - {timeRange.hoursEnd}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateHoursFetcher;
