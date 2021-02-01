import React from 'react';
import classnames from 'classnames';

export const Button = ({ onClick, className, children, color }) => {
  return (
    <button
      type="button"
      className={classnames(
        `py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-500`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
