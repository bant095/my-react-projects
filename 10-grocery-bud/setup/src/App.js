import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  // state form
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // pass condition to avaoid user submitting empty form
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      //show alert
      showAlert(true, 'success', 'item added to the list');
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      setList([...list, newItem]);
      setName('');
    }
  };

  //show alert msg
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  //clear list function
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  ///////////////DELETE////////////////////////
  ///remove item from list - delete
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };

  //////////////////EDIT///////////////
  //edit item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  ////////////////////////
  //MAKE OUR FUCTION WORK
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // ////////////////////////////
  //return jsx
  return (
    <section className='section-center'>
      {/* form */}
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>TODO LIST</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='Type your Todo'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} edit={editItem} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
