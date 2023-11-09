import './Search.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

function Search(props) {
  const [category, setCategory] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [matchingPoems, setMatchingPoems] = useState(null);
  const [poem1, setPoem1] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [combinedPoem, setCombinedPoem] = useState(null)

  const fetchSearchData = async (category, searchInput) => {
    try {
      const response = await fetch(`https://poetrydb.org/${category}/${searchInput}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data);
      console.log("SEARCH RESULTS", data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchAdditionalData = async () => {
    if (poem1) {
      try {
        const response = await fetch(`https://poetrydb.org/linecount/${poem1.linecount}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatchingPoems(data);
        console.log("Additional Data:", data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchAdditionalData();
  }, [poem1]);


  useEffect(() => {
    if (poem1 && poem2) {
      combineTwoPoems(poem1, poem2);
    }
  }, [poem1, poem2]);

  const combineTwoPoems = (poem1, poem2) => {
    console.log('POEM 1', poem1);
    console.log('POEM 2', poem2);
    const poemLength = poem1.lines.length;
    const newPoem = [];
    for (let i = 0; i < poemLength; i++) {
      if (i % 2 === 0) {
        newPoem.push(poem1.lines[i]);
      } else {
        newPoem.push(poem2.lines[i]);
      }
    }
    console.log("NEW POEM", newPoem);
    setCombinedPoem(newPoem)
  }

  const handlePoemClick = (setPoem, index) => {
    if (setPoem === setPoem1) {
      setPoem1(searchResults[index])
    } else if (setPoem === setPoem2) {
      setPoem2(matchingPoems[index])
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchData(category, searchInput);
  };


  const handleLinkClick = () => {
    props.onDataTransfer(poem1, poem2, combinedPoem);
  };

  return (
    <div className='search-container'>
      {poem1 ? (
        <p className='selected-poem1-block'>{poem1.title}</p>
      ) : (
        <div className='poem1-block'>
          <form onSubmit={handleSubmit}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Search</button>
          </form>
          {searchResults && (
            <div>
              <h2>Search Results</h2>
              <div className='search-results'>
                {searchResults.map((result, index) => (
                  <p className='results' key={index} onClick={() => handlePoemClick(setPoem1, index)}>{result.title} by {result.author}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {poem2 ? (
        <p>{poem2.title}</p>
      ) : (
        <div>
      {matchingPoems && (
        <div className='poem2-block'>
          <h2>Matching Poems</h2>
          <div className='search-results'>
            {matchingPoems.map((result, index) => (
              <p className='results' key={index} onClick={() => handlePoemClick(setPoem2, index)}>{result.title} by {result.author}</p>
            ))}
          </div>
        </div>
      )}
      </div>)}
      {combinedPoem && (
        <div>
          <Link to="/new-poem" onClick={handleLinkClick}>See your new poem</Link>
        </div>
      )}
    </div>
  );  
}

export default Search;