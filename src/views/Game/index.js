import React, {useEffect} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

import Board from '../../components/Board'

function Game({setCurrent, setHistory, calculateWinner, history, stepNumber, xIsNext, winner, squares}) {
	
	useEffect(() => {
		calculateWinner();
	}, [history]);

	function handleClick(squareNumber) {
		setCurrent();
		calculateWinner();
		
		if (winner || squares[squareNumber]) {
			return;
		}
		setHistory(squareNumber)
	}

	function jumpTo(step) {
		// setStepNumber(step);
		// setXIsNext(step % 2 === 0);
	}

	const moves = history.map((step, move) => {
		const desc = move ? 'Go to move #' + move : 'Go to game start';
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		);
	});

	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={squares} onClick={i => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	history: state.game.history,
    squares: state.game.squares,
    stepNumber: state.game.stepNumber,
    xIsNext: state.game.xIsNext,
    winner: state.game.winner
});

const mapDispatchToProps = dispatch => bindActionCreators(GameActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game); 
