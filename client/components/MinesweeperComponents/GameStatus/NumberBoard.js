import React from 'react';
import PropTypes from 'prop-types';

import {digitsToWordsMap} from 'client/utils/constants';

const NumberBoard = ({number}) => {
  number = number > 999 ? 999 : number;
  number = number.toString().padStart(3, '0');

  const hundreds = digitsToWordsMap[number[0]];
  const tens = digitsToWordsMap[number[1]];
  const ones = digitsToWordsMap[number[2]];

  return (
    <div className="number-board__wrapper">
      <div className={`number-board__digit ${hundreds}`}></div>
      <div className={`number-board__digit ${tens}`}></div>
      <div className={`number-board__digit ${ones}`}></div>
    </div>
  );
};

NumberBoard.propTypes = {
  number: PropTypes.number.isRequired,
};

export default NumberBoard;