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
import ListOfSportAdmin from "./Apps/ListOfSportAdmin";
import FetchDateHoursById from "./Apps/FetchDateHoursById";
import CreateDateHoursWithAdmin from "./Apps/CreateDateHoursWithAdmin";

//  import AddPersonne from "./Personnes/AddPersonne";
//  import GetPersonne from "./Personnes/GetPersonne";
//  import GetAllPersonnes from "./Personnes/GetAllPersonnes";

function App() {
  const [dayName, setDayName] = useState('');

  const updateDayName = () => {
    const today = new Date();
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    setDayName(dayNames[today.getDay()]);
  };

  useEffect(() => {
    updateDayName();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li><Link to="/create">Create Date Hours</Link></li> */}
            <li><Link to="/list">Date Hours List</Link></li>
            {/* <li><Link to="/update">Update Date Hours</Link></li> */}
            <li><Link to="/sports">Sport List</Link></li>
            {/* <li><Link to="/todayDayName">Name of Today</Link></li> */}
            <li><Link to="/dateHoursFetcher">Date Hours Fetcher</Link></li>
            {/* <li><Link to="/bookingForm">Booking Form</Link></li> */}
            <li><Link to="/sportForm">Sport Form</Link></li>
            <li><Link to="/listOfSportAdmin">List Of Sport Admin</Link></li>
            {/* <li><Link to="/createDateHoursWithAdmin">Create Date Hours With Admin</Link></li> */}
            {/* <li><Link to="/fetchDateHoursById">Fetch Date Hours By ID</Link></li> */}
          </ul>
        </nav>

        <Routes>
          <Route path="/create" element={<CreateDateHours />} />
          <Route path="/list" element={<DateHoursList />} />
          <Route path="/update" element={<UpdateDateHours />} />
          <Route path="/sports" element={<SportList />} />
          <Route path="/pageBooking/:SportId" element={<PageBooking />} />
          <Route path="/todayDayName" element={<TodayDayName dayName={dayName} />} />
          <Route path="/dateHoursFetcher" element={<DateHoursFetcher day={dayName} />} />
          <Route path="/bookingForm" element={<BookingForm />} />
          <Route path="/sportForm" element={<SportForm />} />
          <Route path="/listOfSportAdmin" element={<ListOfSportAdmin />} />
          <Route path="/fetchDateHoursById" element={<FetchDateHoursById />} />
          <Route path="/updateDateHours" element={<UpdateDateHours />} /> {/* Added this route */}
          <Route path="/createDateHoursWithAdmin" element={<CreateDateHoursWithAdmin />} /> {/* Added this route */}
        </Routes>
      </div>
    </Router>
    // <>
    //   <h1>Sports Booking System</h1>
    //         <AddPersonne />
    //         <GetPersonne />
    //         <GetAllPersonnes />
    // </>
  );
}

export default App;
