import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateDateHours from "./Apps/CreateDateHours";
import DateHoursList from "./Apps/DateHoursList";
import UpdateDateHours from "./Apps/UpdateDateHours";
import SportList from "./Apps/SportList";
import PageBooking from "./Apps/PageBooking";
import TodayDayName from "./Apps/TodayDayName";
import DateHoursFetcher from "./Apps/DateHoursFetcher";
import BookingForm from "./Apps/BookingForm";
import SportForm from "./Apps/SportForm";

function App() {
  // State to hold the name of the day
  const [dayName, setDayName] = useState('');

  // Function to update the day name
  const updateDayName = () => {
    const today = new Date();
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    setDayName(dayNames[today.getDay()]);
  };

  // Update the day name when the component mounts
  useEffect(() => {
    updateDayName();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/create">Create Date Hours</Link>
            </li>
            <li>
              <Link to="/list">Date Hours List</Link>
            </li>
            <li>
              <Link to="/update">Update Date Hours</Link>
            </li>
            <li>
              <Link to="/facilities">Sport List</Link>
            </li>
            <li>
              <Link to="/todayDayName">Name of Today</Link>
            </li>
            <li>
              <Link to="/dateHoursFetcher">Date Hours Fetcher</Link>
            </li>
            <li>
              <Link to="/bookingForm">Booking Form</Link>
            </li>
            <li>
              <Link to="/sportForm">Sport Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/create" element={<CreateDateHours />} />
          <Route path="/list" element={<DateHoursList />} />
          <Route path="/update" element={<UpdateDateHours />} />
          <Route path="/facilities" element={<SportList />} />
          <Route path="/pageBooking/:SportId" element={<PageBooking />} />
          <Route path="/todayDayName" element={<TodayDayName dayName={dayName} />} />
          <Route path="/dateHoursFetcher" element={<DateHoursFetcher day={dayName} />} />
          <Route path="/bookingForm" element={<BookingForm />} />
          <Route path="/sportForm" element={<SportForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
