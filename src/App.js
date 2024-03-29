import React, { useState } from 'react';
import data from './data';
function App() {
  //state value
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //create a new varaibale
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    if (count > 8) {
      amount = 8;
    }
    //set data
    setText(data.slice(0, amount));
  };
  //new project repo
  return (
    <section className='section-center'>
      <h3>tired of boring lorem ipsum?</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>paragraphs:</label>
        <input
          type='number'
          name='amount'
          id='amount'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <button type='submit' className='btn'>
          generate
        </button>
      </form>

      {/* article section */}
      <article className='lorem-text'>
        {/* iterate through map */}
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
