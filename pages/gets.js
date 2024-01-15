// pages/index.js
import React, { useEffect, useState } from 'react';
import '../app/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getting');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (wineId) => {
    try {
      const response = await fetch('/api/deleting', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: wineId }),
      });

      if (response.ok) {
        // Remove the deleted wine from the local state
        setData((prevData) => prevData.filter((wine) => wine.id !== wineId));
      } else {
        console.error('Error deleting wine:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  return (
    <div className='text-black'>
      <div className='flex flex-col items-center mt-10 '>
        <h1 className='text-2xl text-white font-bold mb-4'>List of Wines</h1>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>ID</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Year</th>
              <th className='py-2 px-4 border-b'>Type</th>
              <th className='py-2 px-4 border-b'>Varietal</th>
              <th className='py-2 px-4 border-b'>Rating</th>
              <th className='py-2 px-4 border-b'>Consumed</th>
              <th className='py-2 px-4 border-b'>Date Consumed</th>
              <th className='py-2 px-4 border-b'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((wine) => (
              <tr key={wine.id} className='hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{wine.id}</td>
                <td className='py-2 px-4 border-b'>{wine.name}</td>
                <td className='py-2 px-4 border-b'>{wine.year}</td>
                <td className='py-2 px-4 border-b'>{wine.type}</td>
                <td className='py-2 px-4 border-b'>{wine.varietal}</td>
                <td className='py-2 px-4 border-b'>{wine.rating}</td>
                <td className='py-2 px-4 border-b'>{wine.consumed ? 'Yes' : 'No'}</td>
                <td className='py-2 px-4 border-b'>{wine.dateConsumed}</td>
                <td className='py-2 px-4 border-b'>
                  <button
                    onClick={() => router.push(`/editWine`)}
                    className='bg-green-500 ml-4 text-white px-2 py-1 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(wine.id)}
                    className='bg-red-500 text-white px-2 py-1 rounded ml-2'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className='mt-4'>
        <Link href='/addWine' className='bg-green-500 ml-4 w-full lg:w-96 text-white px-2 py-1 rounded block lg:inline-block'>
          Create
        </Link>
      </div>
    </div>
  );
};

export default Index;
