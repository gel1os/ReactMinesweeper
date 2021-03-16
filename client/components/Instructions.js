import React, { Component } from 'react';
export default class Instructions extends Component {
  render() {
    return (
      <React.Fragment>
        <p>
          There are 3 different levels of complexity to choose from:
        </p>
        <ul>
          <li>Beginner, 9x9 field, 10 mines;</li>
          <li>Normal, 16x16 field, 40 mines;</li>
          <li>Expert, 30x20 field, 99 mines;</li>
        </ul>
        <p>Feel free to choose any level you wish, but I encourage you to become an expert.</p>
        <p>
          The game consists of the field with cells and mines, hidden in some of the cells.<br/>
          The main goal is to find all the cells with mines and not to explode on the way.<br/>
          A cell can be opened. Opened cells might contain numbers which represent the amount of mines,<br/>
          placed in it&apos;s surrounding cells. Use these numbers to predict positions of cells with mines.<br />
        </p>
        <p>
          You also have flags in your arsenal, they should be used to indicate cells as potentially explosive.<br/>
          In order to win, all such cells should be marked.<br/>
          If you step on a mine, the game is over, but no worries, you can try again until you make it.
        </p>
        <h2>Controls</h2>
          <ul>
            <li>Open cell: click or touch on cell;</li>  
            <li>Set/unset flag: right-click or long touch on cell;</li>
            <li>Pause game: click or touch on timer;</li>
            <li>Resume game: click or touch on timer or sleeping emoji;</li>
            <li>Restart game: click or touch on emoji;</li>
          </ul>
          <p>
            Additionally, to speed up the process, you can click on a number to open surrounding cells,<br/>
            but make sure to set corresponding amount of flags first.
          </p>
      </React.Fragment>
    )
  }
}