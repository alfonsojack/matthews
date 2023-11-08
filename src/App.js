import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [poem1, setPoem1] = useState(null);
  const [poem2, setPoem2] = useState(null);
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response1 = await fetch('https://poetrydb.org/title/Ozymandias/lines.json');
        if (!response1.ok) {
          throw new Error('Network response was not ok');
        }
        const data1 = await response1.json();
        setPoem1(data1[0]['lines']);

        const response2 = await fetch('https://poetrydb.org/title/Glass:abs/lines.json');
        if (!response2.ok) {
          throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        setPoem2(data2[0]['lines']);
      } catch (error) {
        console.error('Error:', error);
      }
    };


    fetchData();
  }, []);

  const searchPoem = async (category, searchInput) => {
    try {
      const response1 = await fetch(`https://poetrydb.org/${category}/${searchInput}`);
      if (!response1.ok) {
        throw new Error('Network response was not ok');
      }
      const data1 = await response1.json();
      console.log("SEARCH RESULTS:", data1);
      setSearchResults(data1);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  useEffect(() => {
  searchPoem('author', 'Dickinson')
  }, []);

  useEffect(() => {
    if (poem1 && poem2) {
      combineTwoPoems(poem1, poem2);
    }
  }, [poem1, poem2]);

  const combineTwoPoems = (poem1, poem2) => {
    console.log('POEM 1', poem1);
    console.log('POEM 2', poem2);
    const poemLength = poem1.length;
    const newPoem = [];
    for (let i = 0; i < poemLength; i++) {
      if (i % 2 === 0) {
        newPoem.push(poem1[i]);
      } else {
        newPoem.push(poem2[i]);
      }
    }
    console.log("NEW POEM", newPoem);
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
