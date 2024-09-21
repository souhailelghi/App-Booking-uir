import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageBooking = () => {
    const { SportId } = useParams(); // Get the Sport ID from URL parameters

    return (
        <div>
            <h1>DateHours & Booking Management</h1>
            <p>Selected Sport ID: {SportId}</p>
            <BookingForm SportId={SportId} />
        </div>
    );
};

const BookingForm = ({ SportId }) => {
    const [dateHoursData, setDateHoursData] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDateHours = async () => {
            try {
                const response = await fetch(`https://localhost:7097/api/DateHours/GetAllDateHoursBySportId/${SportId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setDateHoursData(data);
                updateTimeSlots(data);
            } catch (error) {
                setError('Error fetching date hours: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDateHours();
    }, [SportId]); // Depend on SportId to refetch when it changes

    const updateTimeSlots = (dateHoursData) => {
        const today = new Date();
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const todayDayName = dayNames[today.getDay()];

        const selectedDateHours = dateHoursData.filter(d => d.day === todayDayName);
        const slots = selectedDateHours.flatMap(dateHours => 
            dateHours.timeRanges.map(tr => ({
                value: `${SportId}-${tr.hoursStart}-${tr.hoursEnd}`,
                label: `${tr.hoursStart} - ${tr.hoursEnd}`
            }))
        );
        setTimeSlots(slots);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = {
            clientId: parseInt(event.target.clientId.value),
            SportId: parseInt(SportId),
            dateFrom: event.target.timeSlot.value.split('-')[1],
            dateTo: event.target.timeSlot.value.split('-')[2],
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
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Loading date hours...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
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
                
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
        </>
    );
};

export default PageBooking;
