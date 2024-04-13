import React from 'react';

const Star = ({ size, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 2l2.29 7.07h7.39l-6 4.36 2.29 7.07-6-4.36-6 4.36 2.29-7.07-6-4.36h7.39z" />
    </svg>
  );
};

export default Star;
