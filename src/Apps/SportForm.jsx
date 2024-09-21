import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const SportForm = () => {
    const [sportCode, setSportCode] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [numberPlayer, setNumberPlayer] = useState('');
    const [delayTime, setDelayTime] = useState('');
    const [condition, setCondition] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = {
            sportCode: parseInt(sportCode),
            CategoryId: parseInt(categoryId),
            ImagePath: imagePath,
            NumberPlayer: parseInt(numberPlayer),
            DelayTime: parseInt(delayTime),
            Condition: condition,
            Name: name,
            Description: description
        };

        try {
            const response = await fetch('https://localhost:7097/api/SportList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error adding sport');
            }

            const data = await response.json();
            alert(`Sport added successfully! ID: ${data.id}`);
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
                <div>
                    <label>Sport Code:</label>
                    <input
                        type="number"
                        value={sportCode}
                        onChange={(e) => setSportCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category ID:</label>
                    <input
                        type="number"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image Path:</label>
                    <input
                        type="text"
                        value={imagePath}
                        onChange={(e) => setImagePath(e.target.value)}
                    />
                </div>
                <div>
                    <label>Number of Players:</label>
                    <input
                        type="number"
                        value={numberPlayer}
                        onChange={(e) => setNumberPlayer(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Delay Time (minutes):</label>
                    <input
                        type="number"
                        value={delayTime}
                        onChange={(e) => setDelayTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Condition:</label>
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                    />
                </div>
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
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Sport'}
                </button>
            </form>

            {/* Replace the button with a Link */}
            <Link to="/create">
                <button type="button">
                    Create Date Hours
                </button>
            </Link>
        </div>
    );
};

export default SportForm;
