import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageBooking = () => {
    const { facilityId } = useParams();

    return (
        <div>
            <h1>DateHours & Booking Management</h1>
            <p>Selected Facility ID: {facilityId}</p>
            <BookingForm facilityId={facilityId} />
        </div>
    );
};

const BookingForm = ({ facilityId }) => {
    const [dateHoursData, setDateHoursData] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [status, setStatus] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchDateHours = async () => {
            try {
                const response = await fetch('https://localhost:7097/api/DateHours');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setDateHoursData(data);
                updateTimeSlots(data); // Update time slots for today after fetching data
            } catch (error) {
                console.error('Error fetching date hours:', error);
                alert('Error fetching date hours: ' + error.message);
            }
        };

        fetchDateHours();
    }, []);

    const updateTimeSlots = (dateHoursData) => {
        const today = new Date();
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const todayDayName = dayNames[today.getDay()]; // Get today's day name

        const selectedDateHours = dateHoursData.filter(d => d.day === todayDayName); // Filter for today's day
        const slots = selectedDateHours.flatMap(dateHours => 
            dateHours.timeRanges.map(tr => ({
                value: `${facilityId}-${tr.hoursStart}-${tr.hoursEnd}`,
                label: `${tr.hoursStart} - ${tr.hoursEnd}`
            }))
        );
        setTimeSlots(slots); // Update time slots state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Disable button while submitting

        const formData = {
            refCode: event.target.refCode.value,
            clientId: parseInt(event.target.clientId.value),
            facilityId: parseInt(facilityId),
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
            if (!response.ok) throw new Error('Error creating booking');
            await response.json();
            alert('Booking created successfully!');
        } catch (error) {
            alert('Error creating booking: ' + error.message);
        } finally {
            setIsSubmitting(false); // Re-enable button after submission
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
                
                <fieldset>
                    <legend>Select Time Slot for Today:</legend>
                    {timeSlots.length > 0 ? (
                        timeSlots.map((slot, index) => (
                            <div key={index}>
                                <input type="radio" id={slot.value} name="timeSlot" value={slot.value} required />
                                <label htmlFor={slot.value}>{slot.label}</label><br />
                            </div>
                        ))
                    ) : (
                        <p>No available time slots for today.</p>
                    )}
                </fieldset><br />
                
                <label htmlFor="status">Status:</label>
                <input type="number" id="status" name="status" min="0" max="3" value={status} onChange={(e) => setStatus(parseInt(e.target.value))} required /><br /><br />
                
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
        </>
    );
};

export default PageBooking;
