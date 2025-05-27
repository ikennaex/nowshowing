import React, { useState } from 'react';

const CreateMovie = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    genre: '',
    body: '',
    location: '',
    showtimes: '',
    ticketPrice: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieData = {
      ...formData,
      id: Date.now().toString(),
      showtimes: formData.showtimes.split(',').map(time => time.trim()),
      seats: [
        { seat: 'B1', available: true },
        { seat: 'B2', available: false },
        { seat: 'C1', available: true }
      ],
      ticketPrice: parseInt(formData.ticketPrice)
    };

    try {
      const response = await fetch('http://localhost:5000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });

      if (response.ok) {
        alert('Movie created successfully!');
        setFormData({
          image: '',
          title: '',
          genre: '',
          body: '',
          location: '',
          showtimes: '',
          ticketPrice: ''
        });
      } else {
        alert('Error creating movie');
      }
    } catch (error) {
      alert('Failed to connect to server.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Image URL', name: 'image' },
          { label: 'Title', name: 'title' },
          { label: 'Genre', name: 'genre' },
          { label: 'Description (Body)', name: 'body' },
          { label: 'Location', name: 'location' },
          { label: 'Showtimes (comma separated)', name: 'showtimes' },
          { label: 'Ticket Price', name: 'ticketPrice', type: 'number' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          Create Movie
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
