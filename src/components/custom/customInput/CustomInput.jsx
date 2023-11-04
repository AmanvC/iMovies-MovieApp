import React from 'react';
import './customInput.scss';

const CustomInput = ({label, inputType, placeholder, name, value, onChange, labelColor, errorMessage, width}) => {
  return (
    <div className='custom-input'>
      {label && (
        <label 
          htmlFor={name}
          style={{color: labelColor}}
        >{label.charAt(0).toUpperCase() + label.slice(1)}</label>
      )}
      <input 
        name={name}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{width}}
      />
      <div className='custom-input-error-message-container'>
        {errorMessage && (
          <p className='error-message'>* {errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default CustomInput;