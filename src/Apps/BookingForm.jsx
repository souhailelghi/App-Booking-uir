import React, {useEffect, useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [userId, setUserId] = useState('');
  const [sportId, setSportId] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userIdList, setUserIdList] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      UserId: userId,
      SportId: parseInt(sportId),
      BookingTime: bookingTime,
      DateFrom: dateFrom,
      DateTo: dateTo,
      UserIdList: userIdList,
    };

    try {
      const response = await axios.post('https://localhost:7097/api/BookingList/AddBookings', bookingData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.error || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Book a Sports Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Sport ID:</label>
          <input type="number" value={sportId} onChange={(e) => setSportId(e.target.value)} required />
        </div>
        <div>
          <label>Booking Time:</label>
          <input type="datetime-local" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />
        </div>
        <div>
          <label>Date From:</label>
          <input type="time" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} required />
        </div>
        <div>
          <label>Date To:</label>
          <input type="time" value={dateTo} onChange={(e) => setDateTo(e.target.value)} required />
        </div>
        <div>
          <label>User ID List (comma-separated):</label>
          <input type="text" onChange={(e) => setUserIdList(e.target.value.split(',').map(id => id.trim()))} />
        </div>
        <button type="submit">Add Booking</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default BookingForm;
