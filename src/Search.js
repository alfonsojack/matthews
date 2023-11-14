import './Search.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CombinedPoem from './CombinedPoem';
import Error from './Error';

function Search() {
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
  const [fetchError, setFetchError] = useState(null)
  const [loading, setLoading] = useState('');


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
        throw new Error(`${response.status}: ${response.message}`);
      }
      const data = await response.json();
      setSearchResults(data);
      setLoading('')
      console.log("SEARCH RESULTS", data)
    } catch (error) {
      console.error('Error:', error);
      setFetchError(error.message)
    }
  };

  const fetchAdditionalData = async () => {
    if (poem1) {
      try {
        const response = await fetch(`https://poetrydb.org/linecount/${poem1.linecount}`);
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.message}`);
        }
        const data = await response.json();
        setMatchingPoems(data);
        console.log("Additional Data:", data);
      } catch (error) {
        console.error('Error:', error);
        setFetchError(error.message)
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
    if(!searchInput) {
      setLoading(`Need ideas? Search by author for 'Dickinson' or by title for 'Trees'.`)
    } else {
      setLoading('Loading...')}
    fetchSearchData(category, searchInput);
  };


  const handleSecondPoemClick = (poem) => {
    poem(null)
  }


  return (
    <div className='Search'>
      {fetchError && <Error error={fetchError} />}
      {combinedPoem && <CombinedPoem poem1={poem1} poem2={poem2} combinedPoem={combinedPoem} />}
      
      <div className='search-container'>
        {modalVisible1 && selectedResult1 ? (
          <div className='poem1-block'>
            <h2 className='results-header'>{selectedResult1.title} by {selectedResult1.author}</h2>
            <div className='search-results'>
              {selectedResult1.lines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <button onClick={closeModal1}>Close</button>
          </div>
        ) : (
          poem1 ? (
            <div className='poem1-block' id="selected" onClick={() => handleSecondPoemClick(setPoem1)}>
              <p className='selected-poem-title'>{poem1.title}</p>
              <p>by</p>
              <p className='selected-poem-author'>{poem1.author}</p>
            </div>
          ) : (
            <div className='poem1-block'>
              <h2 className='results-header'>Search for a poem, by author or title</h2>
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
                <button type="submit" className='button'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-search">
                    <circle cx="10" cy="10" r="7" className="primary" />
                    <path className="secondary" d="M16.32 14.9l1.1 1.1c.4-.02.83.13 1.14.44l3 3a1.5 1.5 0 0 1-2.12 2.12l-3-3a1.5 1.5 0 0 1-.44-1.14l-1.1-1.1a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </button>
              </form>
              {loading ? (
                <h2 className='results-header'>{loading}</h2>
              ) : (
                <>
                  {searchResults ? (
                    searchResults.length > 0 ? (
                      <div>
                        <h2 className='results-header'>Results for '{searchInput}'...</h2>
                        <div className='search-results'>
                          {searchResults.map((result, index) => (
                            <div key={index} className='results'>
                              <div className="result-name" onClick={() => handlePoemClick(setPoem1, index)}>
                                <p>{result.title}</p>
                                <p>- {result.author}</p>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-information" onClick={() => openModal1(result)}>
                                <path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
                                <path className="secondary" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <h2 className='results-header'>Nothing found.</h2>
                    )
                  ) : (null)}
                </>
              )}
            </div>
          )
        )}
        
        {poem1 && poem2 ? (
  <div className='poem2-block' id="selected" onClick={() => handleSecondPoemClick(setPoem2)}>
  <p className='selected-poem-title'>{poem2.title}</p>
  <p className='by'>by</p>
  <p className='selected-poem-author'>{poem2.author}</p>
</div>
        ) : (
          <div>
            {matchingPoems && !modalVisible2 && (
    <div className='poem2-block'>
    <h2 className='results-header'>Pick a matching poem</h2>
    <div className='search-results'>
      {matchingPoems.map((result, index) => (
        <div key={index} className='results'>
          <div className="result-name" onClick={() => handlePoemClick(setPoem2, index)}>
            <p>{result.title}</p>
            <p>- {result.author}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-information" onClick={() => openModal2(result)}>
            <path className="primary" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
            <path className="secondary" d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </div>
      ))}
    </div>
  </div>
            )}
            
            {modalVisible2 && selectedResult2 && (
  <div className='poem2-block'>
  <h2 className='results-header'>{selectedResult2.title} by {selectedResult2.author}</h2>
  <div className='search-results'>
    {selectedResult2.lines.map((line, index) => (
      <p key={index}>{line}</p>
    ))}
  </div>
  <button onClick={closeModal2}>Close</button>
</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;