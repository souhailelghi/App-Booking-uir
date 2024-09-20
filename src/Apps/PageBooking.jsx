import React, { useEffect, useState } from 'react';

const PageBooking = () => {
    return (
        <div>
            <h1>DateHours & Booking Management</h1>
            {/* <DateHoursList /> */}
            {/* <BookingDatesTable /> */}
            <BookingForm />
        </div>
    );
};

const DateHoursList = () => {
    const [dateHoursData, setDateHoursData] = useState([]);

    useEffect(() => {
        const fetchDateHours = async () => {
            try {
                const response = await fetch('https://localhost:7097/api/DateHours');
                if (response.ok) {
                    const data = await response.json();
                    setDateHoursData(data);
                } else {
                    const error = await response.text();
                    alert(`Error: ${error}`);
                }
            } catch (error) {
                alert('An error occurred: ' + error.message);
            }
        };

        fetchDateHours();
    }, []);

    return (
        <div className="container">
            <h1>DateHours List</h1>
            <ul>
                {dateHoursData.map(dateHours => (
                    <li key={dateHours.facilityId}>
                        <strong>Facility ID:</strong> {dateHours.facilityId}<br />
                        <strong>Day:</strong> {dateHours.day}<br />
                        <strong>Date Creation:</strong> {new Date(dateHours.dateCreation).toLocaleString()}<br />
                        <strong>Time Ranges:</strong>
                        <div className="timeRangeList">
                            {dateHours.timeRanges.map((tr, index) => (
                                <div key={index}>
                                    <strong>Start Time:</strong> {tr.hoursStart}<br />
                                    <strong>End Time:</strong> {tr.hoursEnd}<br />
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const BookingDatesTable = () => {
    const [bookingDates, setBookingDates] = useState([]);

    useEffect(() => {
        const fetchBookingDates = async () => {
            try {
                const response = await fetch('https://localhost:7097/api/BookingList/dates');
                const data = await response.json();
                setBookingDates(data);
            } catch (error) {
                console.error('Error fetching booking dates:', error);
            }
        };

        fetchBookingDates();
    }, []);

    return (
        <>
            <h1>Available Booking Dates</h1>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingDates.map((date, index) => (
                        <tr key={index}>
                            <td>Time: {date.dateFrom} - {date.dateTo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

const BookingForm = () => {
    const [dateHoursData, setDateHoursData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        const fetchDateHours = async () => {
            try {
                const response = await fetch('https://localhost:7097/api/DateHours');
                const data = await response.json();
                setDateHoursData(data);
            } catch (error) {
                alert('Error fetching date hours: ' + error.message);
            }
        };

        fetchDateHours();
    }, []);

    const updateTimeSlots = (day) => {
        const selectedDateHours = dateHoursData.filter(d => d.day === day);
        const slots = selectedDateHours.flatMap(dateHours => 
            dateHours.timeRanges.map(tr => ({
                value: `${dateHours.facilityId}-${tr.hoursStart}-${tr.hoursEnd}`,
                label: `${tr.hoursStart} - ${tr.hoursEnd}`
            }))
        );
        setTimeSlots(slots);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            refCode: event.target.refCode.value,
            clientId: parseInt(event.target.clientId.value),
            facilityId: parseInt(event.target.facilityId.value),
            dateFrom: event.target.timeSlot.value.split('-')[1],
            dateTo: event.target.timeSlot.value.split('-')[2],
            status,
            dateCreated: new Date().toISOString(),
            dateUpdated: new Date().toISOString()
        };

        try {
            const response = await fetch('https://localhost:7097/api/BookingList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            alert('Booking created successfully!');
        } catch (error) {
            alert('Error creating booking: ' + error.message);
        }
    };

    return (
        <>
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="refCode">Reference Code:</label>
                <input type="text" id="refCode" name="refCode" required /><br /><br />
                
                <label htmlFor="clientId">Client ID:</label>
                <input type="number" id="clientId" name="clientId" required /><br /><br />
                
                <label htmlFor="facilityId">Facility ID:</label>
                <input type="number" id="facilityId" name="facilityId" required /><br /><br />
                
                <label htmlFor="daySelect">Select Day:</label>
                <select id="daySelect" name="daySelect" onChange={(e) => updateTimeSlots(e.target.value)} required>
                    <option value="">Select a day</option>
                    {[...new Set(dateHoursData.map(d => d.day))].map((day, index) => (
                        <option key={index} value={day}>{day}</option>
                    ))}
                </select><br /><br />
                
                <fieldset>
                    <legend>Select Time Slot:</legend>
                    {timeSlots.map((slot, index) => (
                        <div key={index}>
                            <input type="radio" id={slot.value} name="timeSlot" value={slot.value} />
                            <label htmlFor={slot.value}>{slot.label}</label><br />
                        </div>
                    ))}
                </fieldset><br />
                
                <label htmlFor="status">Status:</label>
                <input type="number" id="status" name="status" min="0" max="3" value={status} onChange={(e) => setStatus(parseInt(e.target.value))} required /><br /><br />
                
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default PageBooking;
