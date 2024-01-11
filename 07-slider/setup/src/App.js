import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {
  ///start with state values
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  //set useEffect to run our function
  useEffect(() => {
    const lastIndex = people.length - 1;
    //set a contion
    if (index < 0) {
      setIndex(lastIndex);
    }
    // to do the same if we run out of the items
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  //set interval function
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  //return jsx
  return (
    <section className='section'>
      <div className='title'>
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className='section-center'>
        {/* iterate the array with .map */}
        {people.map((person, personIndex) => {
          //destrcturing the array
          const { id, image, name, title, quote } = person;

          //more details to be updated here
          //the slide condition
          let position = 'nextSlide';
          if (personIndex === index) {
            position = 'activeSlide';
          }
          //cheking the person index
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
