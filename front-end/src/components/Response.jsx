import PropTypes from 'prop-types';

function Responce({ email, number }) {
    let telefon = number.substring(0, 2) + '-' + number.substring(2, 4) + '-' + number.substring(4, 6);

    return (
    <>
        <h1 className='result-title'>{email === 'Не найдено'? email : 'Найдено: '}</h1>
        <div className='answer-box'>

        {email === 'Не найдено' && number === '000000'? 
            (<h2 className='text-no-result'>{'Извините, но по вашему запросу ничего не найдено :-('}</h2>) : 
            (<>
            <h2 className='text'>По вашему запросу найдено:</h2>
            <p className='result-text'>Электронная почта: {email}</p>
            <p className='result-text'>Номер телефона: {telefon}</p>
            </>) }
        </div>
    </>
    )
}

Responce.propTypes = {
    email: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  };

export default Responce