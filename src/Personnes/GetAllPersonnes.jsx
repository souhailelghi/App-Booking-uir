import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllPersonnes = () => {
    const [personnes, setPersonnes] = useState([]);
    const [message, setMessage] = useState('');

    const fetchAllPersonnes = async () => {
        try {
            const response = await axios.get('https://localhost:7097/api/Personne');
            setPersonnes(response.data);
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Error fetching Personnes';
            setMessage(errorMessage);
            console.error('There was an error fetching the Personnes!', error);
        }
    };

    useEffect(() => {
        fetchAllPersonnes();
    }, []);

    return (
        <div>
            <h2>All Personnes</h2>
            {message && <p>{message}</p>}
            {personnes.length > 0 ? (
                <ul>
                    {personnes.map((personne) => (
                        <li key={personne.id}>
                            <strong>ID:</strong> {personne.id} | <strong>Name:</strong> {personne.name}
                            {personne.image && (
                                <img src={`data:image/jpeg;base64,${personne.image}`} alt="Personne" style={{ width: '50px', height: '50px' }} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Personnes found.</p>
            )}
        </div>
    );
};

export default GetAllPersonnes;
