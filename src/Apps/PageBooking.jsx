import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PageBooking = () => {
    const { SportId } = useParams();

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
    const [userId, setUserId] = useState("");
    const [userIds, setUserIds] = useState([""]); // Initialize with one input

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
    }, [SportId]);

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

    const handleUserIdChange = (index, value) => {
        const newUserIds = [...userIds];
        newUserIds[index] = value;
        setUserIds(newUserIds);
    };

    const addUserIdInput = () => {
        setUserIds([...userIds, ""]); // Add a new empty input
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = {
            UserId: userId,
            SportId: parseInt(SportId),
            BookingTime: new Date().toISOString(),
            DateFrom: event.target.timeSlot.value.split('-')[1],
            DateTo: event.target.timeSlot.value.split('-')[2],
            UserIdList: userIds.filter(id => id.trim() !== "") // Filter out empty IDs
        };

        try {
            const response = await fetch('https://localhost:7097/api/BookingList/AddBookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating booking');
            }

            const data = await response.json();
            alert(data.message || 'Booking created successfully!');
            // Clear form inputs after submission
            setUserId('');
            setUserIds(['']); // Reset to one input
        } catch (error) {
            setError('Error creating booking: ' + error.message);
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
                <div className="mb-3">
                    <label className="form-label">User Id:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
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
                <div className="mb-3">
                    <label className="form-label">User Id List:</label>
                    {userIds.map((id, index) => (
                        <div key={index} className="input-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                value={id}
                                onChange={(e) => handleUserIdChange(index, e.target.value)}
                                placeholder={`User ID ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addUserIdInput}>+</button>
                </div>
                <button type="submit" disabled={isSubmitting}>Submit</button>
            </form>
            {isSubmitting && <p>Submitting your booking...</p>}
        </>
    );
};

export default PageBooking;
