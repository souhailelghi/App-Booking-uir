import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateDateHours from "./Apps/CreateDateHours";
import DateHoursList from "./Apps/DateHoursList";
import UpdateDateHours from "./Apps/UpdateDateHours";
import FacilityList from "./Apps/FacilityList"; // Import FacilityList component
import PageBooking from "./Apps/PageBooking";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Menu */}
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
              <Link to="/facilities">Facility List</Link> {/* New Link for Facility List */}
            </li>
          </ul>
        </nav>

        {/* Define routes for each component */}
        <Routes>
          <Route path="/create" element={<CreateDateHours />} />
          <Route path="/list" element={<DateHoursList />} />
          <Route path="/update" element={<UpdateDateHours />} />
          <Route path="/facilities" element={<FacilityList />} /> {/* New Route for Facility List */}
          <Route path="/pageBooking/:facilityId" element={<PageBooking />} /> {/* Dynamic route for PageBooking */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
