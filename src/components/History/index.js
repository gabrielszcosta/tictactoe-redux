import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

function History({ history, jumpTo, setCurrent }) {	
	function handleClick(move) {
		jumpTo(move);
		setCurrent();
	}

	return (
		<ol>
			{
				history.map((step, move) => {
					const desc = move ? 'Go to move #' + move : 'Go to game start';
					return (
						<li key={move}>
							<button onClick={() => handleClick(move)}>{desc}</button>
						</li>
					);
				})
			}
		</ol>
	);
}

const mapStateToProps = state => ({
	history: state.game.history
});

const mapDispatchToProps = dispatch => bindActionCreators(GameActions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(History); 