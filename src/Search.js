import './Search.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CombinedPoem from './CombinedPoem';

function Search(props) {
  const [category, setCategory] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [matchingPoems, setMatchingPoems] = useState(null);
  const [poem1, setPoem1] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [combinedPoem, setCombinedPoem] = useState(null);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedResult1, setSelectedResult1] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedResult2, setSelectedResult2] = useState(null);

  const openModal2 = (result) => {
    setSelectedResult2(result);
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setSelectedResult2(null);
    setModalVisible2(false);
  };

  const openModal1 = (result) => {
    setSelectedResult1(result);
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setSelectedResult1(null);
    setModalVisible1(false);
  };

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


  const handleSecondPoemClick = (poem) => {
    poem(null)
  }

  return (
    <div>
<div className='search-container'>
{modalVisible1 && selectedResult1 ? (
    <div className='poem1-block'>
      <h2 className='results-header'>{selectedResult1.title} by {selectedResult1.author}</h2>
      <div className='search-results'>
        {selectedResult1.lines.map((line) => (
          <p>{line}</p>
        ))}
      </div>
      <button onClick={closeModal1}>Close</button>
    </div>
  ) : (
    poem1 ? (
      <div className='poem1-block' onClick={() => handleSecondPoemClick(setPoem1)}>
        <p>{poem1.title}</p>
        <p>by</p>
        <p>{poem1.author}</p>
      </div>
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
        {searchResults ? (
          searchResults.length > 0 ? (
            <div>
              <h2 className='results-header'>Results for '{searchInput}'...</h2>
              <div className='search-results'>
                {searchResults.map((result, index) => (
                  <div key={index} className='results'>
                    <p className="result-name" onClick={() => handlePoemClick(setPoem1, index)}>{result.title} by {result.author}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-add" onClick={() => openModal1(result)}>
                      <path className="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h2 className='results-header'>Nothing found.</h2>
          )
        ) : null}
      </div>
    )
  )}
      {poem1 && poem2 ? (
        <div className='poem1-block' onClick={() => handleSecondPoemClick(setPoem2)}>
          <p>{poem2.title}</p>
          <p>by</p>
          <p>{poem2.author}</p>
        </div>
      ) : (
        <div>
      {matchingPoems && !modalVisible2 && (
        <div className='poem1-block'>
          <h2  className='results-header'>Matching Poems</h2>
          <div className='search-results'>
            {matchingPoems.map((result, index) => (
              <div key={index} className='results'>
                <p className="result-name" onClick={() => handlePoemClick(setPoem2, index)}>{result.title} by {result.author}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-add" onClick={() => openModal2(result)}>
                  <path className="secondary" fill-rule="evenodd" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/></svg>
              </div>
            ))}
          </div>
        </div>
      )}
      {modalVisible2 && selectedResult2 && (
        <div className='poem1-block'>
          <h2 className='results-header'>{selectedResult2.title} by {selectedResult2.author}</h2>
          <div className='search-results'>
          {selectedResult2.lines.map((line) => (
            <p>{line}</p>))}
          </div>
          <button onClick={closeModal2}>Close</button>
        </div>
      )}
      </div>)}
      </div>
      {combinedPoem && (
        <CombinedPoem poem1={poem1} poem2={poem2} combinedPoem={combinedPoem}/>
      )}
    </div>
  );  
}

export default Search;