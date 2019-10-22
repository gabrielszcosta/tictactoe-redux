import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

import Board from '../../components/Board'
import History from '../../components/History'

function Game({ setCurrent, setNewHistory, setStatus, calculateWinner, history, status, winner, squares }) {
	useEffect(() => {
		calculateWinner();
		setStatus();
	}, [ history, calculateWinner, setStatus ]);

	function handleClick(squareNumber) {
		setCurrent();
		calculateWinner();
		
		if ( winner || squares[squareNumber] ) {
			return;
		}

		setNewHistory(squareNumber)
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={squares} onClick={i => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<History />
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	history: state.game.history,
	squares: state.game.squares,
	stepNumber: state.game.stepNumber,
	xIsNext: state.game.xIsNext,
	winner: state.game.winner,
	status: state.game.status,
});

const mapDispatchToProps = dispatch => bindActionCreators(GameActions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game); 
