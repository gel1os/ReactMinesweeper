import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from './Row';
import Cell from './Cell';
import GameStatus from './GameStatus';

class GameGrid extends Component {
    render() {
        return (
            <div className="game-grid-wrapper">
                <GameStatus/>
                <div className="game-grid">
                    {this.buildGrid()}
                </div>
            </div>
        );
    };

    buildGrid() {
        return this.props.rows.map((row, rowIndex) => {
            let cells = row.map((cell, cellIndex) =>
                <Cell key={`${rowIndex}.${cellIndex}`} cell={cell} />)
            return <Row key={`row${rowIndex}`}>{cells}</Row>
        });
    }

}

function mapStateToProps(state) {
    return {
        rows: state.gridState.rows,
    }
}

GameGrid = connect(mapStateToProps)(GameGrid);

export default GameGrid;
