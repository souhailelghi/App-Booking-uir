import React, { useState } from 'react';
import axios from 'axios';

const GetPersonne = () => {
    const [id, setId] = useState('');
    const [personne, setPersonne] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Reset message

        try {
            const response = await axios.get(`https://localhost:7097/api/Personne/${id}`);
            setPersonne(response.data);
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Error fetching Personne';
            setMessage(errorMessage);
            console.error('There was an error fetching the Personne!', error);
        }
    };

    const renderImage = (imageData) => {
        // Check if the imageData is in a valid format
        if (imageData) {
            return `data:image/jpeg;base64,${imageData}`;
        }
        return null;
    };

    return (
        <div>
            <h2>Get Personne by ID</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Fetch Personne</button>
            </form>
            {message && <p>{message}</p>}
            {personne && (
                <div>
                    <h3>Personne Details</h3>
                    <p><strong>ID:</strong> {personne.id}</p>
                    <p><strong>Name:</strong> {personne.name}</p>
                    {personne.image && (
                        <div>
                            <strong>Image:</strong>
                            <img src={renderImage(personne.image)} alt="Personne" style={{ width: '100px', height: '100px' }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GetPersonne;
