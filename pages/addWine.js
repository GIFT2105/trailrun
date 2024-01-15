import React, { useState } from 'react';
import '../app/globals.css';
import { useRouter } from 'next/navigation';

const AddWine = () => {
  const [wineData, setWineData] = useState({
    id: '',
    name: '',
    year: '',
    type: 'RED',
    varietal: 'CABERNET_SAUVIGNON',
    rating: '',
    consumed: false,
    dateConsumed: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

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
          id: parseInt(wineData.id, 10),
          year: parseInt(wineData.year, 10),
          rating: wineData.rating ? parseFloat(wineData.rating) : null,
          dateConsumed: wineData.consumed ? wineData.dateConsumed : null,
        }),
      });

      if (response.ok) {
        Router.push('/gets');
        console.log('Wine added successfully');
      } else if (response.status === 409) {
        const { error } = await response.json();
        setErrorMessage(error || 'Oops! The wine with the same ID already exists in the database.');
      } else {
        console.error('Error adding wine:', response.statusText);
        setErrorMessage('Oops! The wine with the same ID already exists in the database.');
      }
    } catch (error) {
      console.error('Error adding wine:', error);
      setErrorMessage('Oops! The wine with the same ID already exists in the database.');
    }
  };

  return (
    <div className='text-white p-4'>
      <h1 className='text-2xl font-bold mb-4'>Add Wine</h1>

      {errorMessage && <h1 className='text-red-500'>{errorMessage}</h1>}

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
            className='border p-2 text-black   rounded'
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
            className='border p-2 text-black rounded'
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
            className='border p-2 text-black rounded'
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
            className='border p-2 text-black rounded'
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
            className='border p-2 text-black rounded'
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
