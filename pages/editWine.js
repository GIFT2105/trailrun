// pages/editWine.js
import React, { useState, useEffect } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';

const EditWine = () => {
  const [wineData, setWineData] = useState({
    id: '',
    name: '',
    year: '',
    type: 'RED',
    varietal: 'CABERNET_SAUVIGNON',
    rating: '',
    consumed: false,
    dateConsumed: '',
    selectedWine: '',
  });

  const [winesList, setWinesList] = useState([]);
  const Router = useRouter();

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
    try {
      const response = await fetch('/api/getting'); // Adjust the API endpoint
      if (response.ok) {
        const wines = await response.json();
        setWinesList(wines);
      } else {
        console.error('Error fetching wines:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching wines:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setWineData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
      selectedWine: name === 'selectedWine' ? value : prevData.selectedWine,
    }));
  };

  const handleWineSelection = (selectedId) => {
    const selectedWine = winesList.find((wine) => wine.id === parseInt(selectedId, 10));

    setWineData({
      id: selectedWine.id.toString(),
      name: selectedWine.name,
      year: selectedWine.year.toString(),
      type: selectedWine.type,
      varietal: selectedWine.varietal,
      rating: selectedWine.rating.toString(),
      consumed: selectedWine.consumed,
      dateConsumed: selectedWine.dateConsumed || '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/editing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...wineData,
          id: parseInt(wineData.id, 10),
          year: parseInt(wineData.year, 10),
          rating: wineData.rating ? parseFloat(wineData.rating) : null,
          dateConsumed: wineData.consumed ? wineData.dateConsumed : null,
        }),
      });

      if (response.ok) {
        Router.push('/gets');
        console.log('Wine edited successfully');
      } else {
        console.error('Error editing wine:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing wine:', error);
    }
  };

  return (
    <div className='text-white p-4'>
      <h1 className='text-2xl font-bold mb-4'>Edit Wine</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col text-black'>
          <label htmlFor='selectedWine' className='mb-1 text-white'>
            Select a Wine:
          </label>
          <select
            id='selectedWine'
            name='selectedWine'
            value={wineData.selectedWine}
            onChange={handleChange}
            className='border p-2 text-white rounded'
          >
            <option value=''>Select a Wine</option>
            {winesList.map((wine) => (
              <option key={wine.id} value={wine.id}>
                {wine.name} - {wine.year}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleWineSelection(wineData.selectedWine)}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Select Wine
          </button>
        </div>

        {wineData.id && (
          <div>
            <h2 className='text-xl font-bold mb-2'>Selected Wine</h2>
            <label htmlFor='name' className='mb-1 text-white'>
            Name:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={wineData.name}
            onChange={handleChange}
            className='border p-2 rounded'
          />
          
          <label htmlFor='year' className='mb-1 text-white'>
            Year:
          </label>
          <input
            type='text'
            id='year'
            name='year'
            value={wineData.year}
            onChange={handleChange}
            className='border p-2 rounded'
          />
          
          <label htmlFor='type' className='mb-1 text-white'>
            Type:
          </label>
          <select
            id='type'
            name='type'
            value={wineData.type}
            onChange={handleChange}
            className='border p-2 text-white rounded'
          >
            <option value='RED'>Red</option>
            <option value='WHITE'>White</option>
            <option value='ROSE'>Rose</option>
            <option value='WHITE_BLEND'>White Blend</option>
            <option value='RED_BLEND'>Red Blend</option>
          </select>
          
          <label htmlFor='varietal' className='mb-1 text-white'>
            Varietal:
          </label>
          <select
            id='varietal'
            name='varietal'
            value={wineData.varietal}
            onChange={handleChange}
            className='border p-2 text-white rounded'
          >
            <option value='CABERNET_SAUVIGNON'>Cabernet Sauvignon</option>
            <option value='MERLOT'>Merlot</option>
            <option value='SHIRAZ'>Shiraz</option>
            <option value='CHENIN_BLANC'>Chenin Blanc</option>
            <option value='SAUVIGNON_BLANC'>Sauvignon Blanc</option>
            <option value='VERDELHO'>Verdelho</option>
            <option value='CHARDONNAY'>Chardonnay</option>
            <option value='DURIF'>Durif</option>
            {/* Add more varieties as needed */}
          </select>
          
          <label htmlFor='rating' className='mb-1 text-white'>
            Rating:
          </label>
          <input
            type='text'
            id='rating'
            name='rating'
            value={wineData.rating}
            onChange={handleChange}
            className='border p-2 rounded'
          />
          
          <label htmlFor='consumed' className='mb-1 text-white'>
            Consumed:
          </label>
          <input
            type='checkbox'
            id='consumed'
            name='consumed'
            checked={wineData.consumed}
            onChange={handleChange}
          />
          
          {wineData.consumed && (
            <div className='flex flex-col text-black'>
              <label htmlFor='dateConsumed' className='mb-1 text-white'>
                Date Consumed:
              </label>
              <input
                type='date'
                id='dateConsumed'
                name='dateConsumed'
                value={wineData.dateConsumed}
                onChange={handleChange}
                className='border p-2 text-white rounded'
              />
            </div>
          )}
          
          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            Save Changes
          </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditWine;
