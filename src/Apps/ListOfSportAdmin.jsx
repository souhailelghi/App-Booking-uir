import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const ListOfSportAdmin = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch("https://localhost:7097/api/SportList");
        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }
        const data = await response.json();
        setSports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const handleFetchClick = (id) => {
    navigate(`/fetchDateHoursById?id=${id}`); // Navigate with the sport ID
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Sports List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Sport Code</th>
            <th>Number of Players</th>
            <th>Condition</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sports.map((sport) => (
            <tr key={sport.id}>
              <td>{sport.id}</td>
              <td>{sport.name}</td>
              <td>{sport.description}</td>
              <td>{sport.sportCode}</td>
              <td>{sport.numberPlayer}</td>
              <td>{sport.condition}</td>
              <td>{sport.categoryId}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleFetchClick(sport.id)}>
                  Fetch all Date Hours By Id
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfSportAdmin;
