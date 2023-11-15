import './CombinedPoem.css';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react'; // Import useState hook

function CombinedPoem({ combinedPoem, setCombinedPoem }) {
  const [combinedLines, setCombinedLines] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://poetrydb.org/linecount/14/lines');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        // Extract all strings from the lines arrays into a single array
        const allLines = data.flatMap(poem => poem.lines);
  
        setCombinedLines(allLines);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  
  const getRandomLine = (linesArray) => {
    if (linesArray.length === 0) {
      return null; // Return null if the array is empty
    }
  
    const randomIndex = Math.floor(Math.random() * linesArray.length);
    const randomLine = linesArray[randomIndex];
    return randomLine;
  };
  
  const handleLineChange = (index) => {
    const randomLine = getRandomLine(combinedLines);
    const updatedPoem = [...combinedPoem]; // Create a copy of the original array
    updatedPoem[index] = randomLine; // Update the selected index
    setCombinedPoem(updatedPoem); // Update the state with the modified array
    setHoveredIndex(null);
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className='combined-poem'>
      <h2 className='new-poem-title'>Earth's Newest Poem</h2>
      {combinedPoem.map((line, index) => (
        <p
          key={index}
          className={`combined-poem-lines ${index === hoveredIndex ? 'hovered' : ''}`}
          onClick={() => handleLineChange(index)}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={handleLeave}
           // Add onClick event
        >
          {index === hoveredIndex ? 'Swap out line' : line}
        </p>
      ))}
    </div>
  );
}

CombinedPoem.propTypes = {
  combinedPoem: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCombinedPoem: PropTypes.func.isRequired, // Add prop type for the setCombinedPoem function
};

export default CombinedPoem;
