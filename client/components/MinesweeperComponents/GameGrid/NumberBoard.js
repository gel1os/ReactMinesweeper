import React, { Component } from 'react';
import {digitsToWordsMap} from '../../../utils/constants';

export default class NumberBoard extends Component {
  render() {
    const { number } = this.props;
    const {hundreds, tens, ones} = this.calculateClasses(number);
    return (
      <div className="number-board__wrapper">
        <div className={`number-board__digit ${hundreds}`}></div>
        <div className={`number-board__digit ${tens}`}></div>
        <div className={`number-board__digit ${ones}`}></div>
      </div>
    )
  }

  calculateClasses(number = 0) {
    number = number > 999 ? 999 : number;
    number = number.toString().padStart(3, '0');
    return {
      hundreds: digitsToWordsMap[number[0]],
      tens: digitsToWordsMap[number[1]],
      ones: digitsToWordsMap[number[2]],
    };
  }
}