import React, { useState } from 'react';
import axios from 'axios';

const AddPersonne = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Image', image);

        try {
            const response = await axios.post('https://localhost:7097/api/Personne', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(`Personne created with ID: ${response.data.id}`);
            // Reset form
            setName('');
            setImage(null);
        } catch (error) {
            setMessage('Error creating Personne');
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h2>Add Personne</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddPersonne;
