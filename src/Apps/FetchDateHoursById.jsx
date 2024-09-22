import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const FetchDateHoursById = () => {
    const [dateHoursList, setDateHoursList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const sportId = new URLSearchParams(useLocation().search).get("id");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDateHours = async () => {
            if (sportId) {
                setIsLoading(true);
                setError(null);

                try {
                    const response = await fetch(`https://localhost:7097/api/DateHours/GetAllDateHoursBySportId/${sportId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch date hours");
                    }

                    const data = await response.json();
                    setDateHoursList(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchDateHours();
    }, [sportId]);

    const handleUpdateClick = (id) => {
        navigate(`/updateDateHours?id=${id}&sportId=${sportId}`);
    };

    // const handleCreateClick = () => {
    //     navigate(`/createDateHoursWithAdmin?sportId=${sportId}`);
    // };
    const handleCreateClick = () => {
        navigate(`/createDateHoursWithAdmin?sportId=${sportId}`);
    };
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Fetch Date Hours by Sport ID</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {dateHoursList.length > 0 && (
                <div>
                    <h2>Date Hours List</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Sport ID</th>
                                <th>Day</th>
                                <th>Time Ranges</th>
                                <th>Date Created</th>
                                <th>Update Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dateHoursList.map((dateHour) => (
                                <tr key={dateHour.id}>
                                    <td>{dateHour.id}</td>
                                    <td>{dateHour.sportId}</td>
                                    <td>{dateHour.day}</td>
                                    <td>
                                        <ul>
                                            {dateHour.timeRanges.map((timeRange) => (
                                                <li key={timeRange.id}>
                                                    {timeRange.hoursStart} - {timeRange.hoursEnd}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{new Date(dateHour.dateCreation).toLocaleString()}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleUpdateClick(dateHour.id)}>
                                            Update Date Hours
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-secondary" onClick={handleCreateClick}>
                        Create a Date Hours
                    </button>
                </div>
            )}
        </div>
    );
};

export default FetchDateHoursById;
