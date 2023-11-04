import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import "./customButton.scss";

const CustomButton = ({type, text, padding, width, loading, disabled=false, onClick}) => {
  const [className, setClassName] = useState("");
  const [buttonWidth, setButtonWidth] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    switch(type){
      case "PRIMARY":
        setClassName('primary');
        break;
      case "SECONDARY":
        setClassName('secondary');
        break;
      case "DANGER":
        setClassName('danger');
        break;
      default:
        break;
    }
  }, [type])

  useLayoutEffect(() => {
    setButtonWidth(buttonRef.current.offsetWidth);
  }, []);

  return (
    <button
      className={'button ' + className + (disabled ? " disabled" : "")}
      style={{padding, width: width ? width : buttonWidth + 'px'}}
      disabled={disabled}
      ref={buttonRef}
      onClick={onClick}
    >
      {!loading ? text : (
        <div className="button-loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      )}
    </button>
  )
}

export default CustomButton;