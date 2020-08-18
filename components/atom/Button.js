import React from 'react';

function ButtonLite({ name = 'no name', isActive = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`button-raw ${isActive && 'button-raw-select'}`}
    >
      {name}
    </div>
  );
}

function ButtonMain({ name, isActive, onClick, style, disable = false }) {
  return (
    <div
      onClick={disable ? null : onClick}
      className={`button-main ${disable && 'disable'}`}
      style={style}
    >
      {name}
    </div>
  );
}

export { ButtonLite, ButtonMain };
