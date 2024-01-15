// pages/addWine.js
import React, { useState } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';




const AddWine = () => {
  const [wineData, setWineData] = useState({
    id: '',
    name: '',
    year: '',
    type: 'RED', // Default to RED, you can change as needed
    varietal: 'CABERNET_SAUVIGNON', // Default to CABERNET_SAUVIGNON, you can change as needed
    rating: '',
    consumed: false,
    dateConsumed: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setWineData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const Router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/creating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...wineData,
          id: parseInt(wineData.id, 10), // Convert id to integer
          year: parseInt(wineData.year, 10), // Convert year to integer
          rating: wineData.rating ? parseFloat(wineData.rating) : null, // Convert rating to float or null
          dateConsumed: wineData.consumed ? wineData.dateConsumed : null, // Include dateConsumed only if consumed is true
        }),
      });

      if (response.ok) {
        Router.push('/gets'); // Redirect to home page
        console.log('Wine added successfully');
      } else {
        console.error('Error adding wine:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

  return (
    <div className='text-white p-4'>
      <h1 className='text-2xl font-bold mb-4'>Add Wine</h1>
      <form onSubmit={handleSubmit} className='space-y-4 '>

      <div className='flex flex-col text-black'>
      <label htmlFor='id' className='mb-1 text-white'>
        ID:
      </label>
      <input
        type='text'
        id='id'
        name='id'
        value={wineData.id}
        onChange={handleChange}
        className='border p-2 rounded'
      />
    </div>

    <div className='flex flex-col text-black'>
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
    </div>
        
        <div className='flex flex-col text-black'>
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
        </div>

        <div className='flex flex-col text-black'>
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
        </div>

        <div className='flex flex-col text-black'>
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
          
          </select>
        </div>

        <div className='flex flex-col text-black'>
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
        </div>

        <div className='flex flex-col text-black'>
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
        </div>

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
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Add Wine
        </button>
      </form>
    </div>
  );
};

export default AddWine;
