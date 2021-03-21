import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {digitsToWordsMap} from 'client/utils/constants';

const NumberBoard = ({number}) => {
  if (number > 999) {
    number = 999;
  } else if (number < -99) {
    number = -99;
  }

  let numberString = number >= 0 ?
    number.toString().padStart(3, '0') : 
    '-' + Math.abs(number).toString().padStart(2, '0');

  const hundreds = digitsToWordsMap[numberString[0]];
  const tens = digitsToWordsMap[numberString[1]];
  const ones = digitsToWordsMap[numberString[2]];

  return (
    <div className="number-board__wrapper">
      <div className={cx('number-board__digit', hundreds)}></div>
      <div className={cx('number-board__digit', tens)}></div>
      <div className={cx('number-board__digit', ones)}></div>
    </div>
  );
};

NumberBoard.propTypes = {
  number: PropTypes.number.isRequired,
};

export default NumberBoard;