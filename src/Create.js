import React, { useState, useEffect } from 'react';
import CombinedPoem from './CombinedPoem';

const Create = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [combinedPoem, setCombinedPoem] = useState(null)

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * (30 - 2 + 1)) + 2;
    setRandomNumber(newRandomNumber);
    fetchRandomPoems(newRandomNumber)
  };

  const fetchRandomPoems = (lineCount) => {
  
    return fetch(`https://poetrydb.org/linecount/${lineCount}/lines`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
      });
  }
  

  return (
    <div className='Create-component'>
      {!randomNumber ? (
        <div className="number-scroll" onClick={generateRandomNumber}>
          Click here to create a poem
        </div>
      ) : (
        <div className='poem'>
          {combinedPoem ? (
            <CombinedPoem combinedPoem={combinedPoem} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
          }
export default Create;
