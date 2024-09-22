import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SportForm = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [sportCode, setSportCode] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null); // Change to null for file
    const [numberPlayer, setNumberPlayer] = useState('');
    const [delayTime, setDelayTime] = useState('');
    const [condition, setCondition] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Get the first file
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(); // Create FormData object
        formData.append('sportCode', sportCode);
        formData.append('CategoryId', categoryId);
        if (image) {
            formData.append('Image', image); // Append the file
        }
        formData.append('NumberPlayer', numberPlayer);
        formData.append('DelayTime', delayTime);
        formData.append('Condition', condition);
        formData.append('Name', name);
        formData.append('Description', description);

        try {
            const response = await fetch('https://localhost:7097/api/SportList', {
                method: 'POST',
                body: formData // Use formData directly
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error adding sport');
            }

            const data = await response.json();
            alert(`Sport added successfully! ID: ${data.id}`);
            // Redirect to CreateDateHours with SportId
            navigate(`/create?SportId=${data.id}`);
        } catch (error) {
            setError('Error adding sport: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Add a New Sport</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Sport Code:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={sportCode}
                        onChange={(e) => setSportCode(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Category ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image:</label>
                    <input
                        type="file" // Change to file input
                        accept="image/*" // Accept image files
                        onChange={handleImageChange} // Handle image change
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Number of Players:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={numberPlayer}
                        onChange={(e) => setNumberPlayer(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Delay Time:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={delayTime}
                        onChange={(e) => setDelayTime(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Condition:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                    {isSubmitting ? 'Adding...' : 'Add Sport'}
                </button>
            </form>
        </div>
    );
};

export default SportForm;
