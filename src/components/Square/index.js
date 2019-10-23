import React from 'react';

/**
 * IMPORTAÇÕES DO REDUX, DO CONECTOR COM REACT E DAS ACTIONS DO REDUX
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

function Square({ value, index, setCurrent, setNewHistory, calculateWinner, winner, squares }) {

    /**
     * Função que dispara as actions de atualização do estado atual do jogo, verifica se houve vencedor e atualiza o histórico
     * @param Int squareIndex: índice do quadrado clicado
     */
	function handleClick(squareIndex) {
		setCurrent();
		calculateWinner();

		if ( winner || squares[squareIndex] ) {
			return;
		}

		setNewHistory(squareIndex)
	}

	return (
		<button className="square" onClick={() => handleClick(index)}>
			{value}
		</button>
	);
}

/**
 * Função que transforma os atributos do estado do redux em props do componet
 */
const mapStateToProps = state => ({
	squares: state.game.squares,
	winner: state.game.winner,
});

/**
 * Função que transforma as actions dos reducers do redux em props do componet
 */
const mapDispatchToProps = dispatch => bindActionCreators(GameActions, dispatch);

/**
 * Conectando o component com o redux
 */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Square);
