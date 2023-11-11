import React, { useState, useEffect } from 'react';
import CombinedPoem from './CombinedPoem';
import './Create.css'
import Error from './Error';

const Create = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [combinedPoem, setCombinedPoem] = useState(null);
  const [fetchError, setFetchError] = useState(null)

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * (30 - 2 + 1)) + 2;
    setRandomNumber(newRandomNumber);
    fetchRandomPoems(newRandomNumber);
  };

  const fetchRandomPoems = (lineCount) => {
  
    return fetch(`https://poetrydb.org/linecount/${lineCount}/lines`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.message}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        const responseArray = data;
        const randomPoems = [];
  
        for (let i = 0; i < lineCount; i++) {
          const randomIndex = Math.floor(Math.random() * responseArray.length);
          randomPoems.push(responseArray[randomIndex].lines[i]);
        }
        console.log(randomPoems)
        return setCombinedPoem(randomPoems);
      })
      .catch(error => {
        console.error('Error:', error);
        setFetchError(error.message)
      });
  }
  

  return (
    <div className='Create-component'>
      {fetchError && (
        <Error error={fetchError}/>
      )}
      {!randomNumber ? (
        <p className="number-scroll" onClick={generateRandomNumber}>
          Click here to create a poem
        </p>
      ) : (
        <div className='poem'>
          {combinedPoem && !fetchError ? (
            <div>
              <CombinedPoem combinedPoem={combinedPoem} />
              <p className="number-scroll" onClick={generateRandomNumber}>
                Create another
              </p>
            </div>
          ) : !combinedPoem && !fetchError ? (
            <p>Loading...</p>
          ) : null}
        </div>
      )}
    </div>
  );
          }
export default Create;
