import React from 'react';
import './button.css';

export default function Button({ onClick, children }) {
  return (
    <button className="ripple" onClick={onClick}>
      {children}
    </button>
  );
}
