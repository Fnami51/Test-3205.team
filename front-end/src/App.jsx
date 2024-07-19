import { useState } from 'react';
import { postSearch } from './api';
import './App.css';
import Loading from './components/Loading';
import Responce from './components/Response';

function App() {
  const [stateResponse, setStateResponse] = useState(false);
  const [stateInput, setStateInput] = useState(true);

  const [resultSearch, setResponce] = useState(null)
  const [errorMessage, setError] = useState("Всё хорошо")

  const [value, setValue] = useState('');

  function handleInputMask(event) {
    let value = event.target.value.replace(/\D/g, '');
    let format = '';
    if (value.length > 0) format += value.substring(0, 2);
    if (value.length > 2) format += '-' + value.substring(2, 4);
    if (value.length > 4) format += '-' + value.substring(4, 6);
    setValue(format);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const number = event.target.number.value;
    if (!email) {
      setStateInput(false);
      setError("Введите хотя бы email");
    } else if(number.length < 6) {
      setStateInput(false);
      setError("Номер должен содержать 6 цифр");
    } else {
      setStateResponse(true);
      setResponce(null);
      setError("Всё хорошо")
      setStateInput(true); 
      try {
        postSearch(email, number).then((data) => {
          setResponce(() => {
            const responce = data.users[0] || { email: 'Не найдено', number: '000000' };
            return responce;
          });
        });
      } catch (error) {
        console.error(error);
        setError(error.message);
        setStateResponse(false);
      }
    }
  }

  return (
    <div className='background'>
      <div className='answer' style={!stateResponse ? {display: 'none'}: {display: 'flex'}}>
        {stateResponse ? (stateResponse && resultSearch ? <Responce email={resultSearch.email} number={resultSearch.number}/> : <Loading />) : null}
      </div>

      <form className='form' id="formSearch" onSubmit={handleSubmit}>
        <h1 className='title'>Поиск</h1>
        <input type="email" className='input' id='email' placeholder='Введите email' style={!stateInput ? {border: "red 4px solid"} : null}/>
        <input type="text" className='input' id='number' placeholder='Введите телефон' value={value} onChange={handleInputMask} maxLength="8"/>

        <button className='button' type='submit'>Искать</button>
        <p className='message' style={errorMessage === "Всё хорошо" ? {display: 'none'} : {display: 'block'}}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default App;
