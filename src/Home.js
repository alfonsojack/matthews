import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [links, setLinks] = useState([
    { originalText: 'Create', text: 'Create' },
    { originalText: 'Combine', text: 'Combine' },
    { originalText: 'About', text: 'About' },
  ]);

  const handleMouseEnter = (index) => {
    const updatedLinks = [...links];
    if (updatedLinks[index].originalText === 'Create') {
      updatedLinks[index].text = 'Create a new poem of any length';
    } else if (updatedLinks[index].originalText === 'About') {
      updatedLinks[index].text = "What's all this about?";
    } else if (updatedLinks[index].originalText === 'Combine') {
      updatedLinks[index].text = 'Mix two poems together';
    }
    setLinks(updatedLinks);
  };

  const handleMouseLeave = (index) => {
    const updatedLinks = [...links];
    updatedLinks[index].text = updatedLinks[index].originalText;
    setLinks(updatedLinks);
  };

  return (
    <div>
      <h1 className='home-title'>MATTHEWS</h1>
      <section>
        <div className='quote'>
          <p id='text'>I too, dislike it: there are things that are important beyond all this fiddle.</p>
          <p id='attribution'>Marianne Moore, on poetry</p>
        </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-book-open1"><g><path className="secondary" d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"/><path className="primary" d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"/></g></svg>        
      {links.map((link, index) => (
          <Link
            key={index}
            className='home-nav'
            to={`/${link.originalText.toLowerCase()}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
          <span>{link.text}</span>
          </Link>
        ))}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-book-open1"><g><path className="secondary" d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"/><path className="primary" d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"/></g></svg>      </section>
    </div>
  );
}

export default Home;