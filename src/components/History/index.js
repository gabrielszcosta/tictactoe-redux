import React from 'react';

/**
 * IMPORTAÇÕES DO REDUX, DO CONECTOR COM REACT E DAS ACTIONS DO REDUX
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

function History({ history, jumpTo, setCurrent }) {

    /**
     * Função que captura o índice do histórico das jogadas e seta como histórico atual
     * @param Int move: índice do histórico selecionado
     */
    function handleClick(move) {
		jumpTo(move);
		setCurrent();
	}

	return (
		<ol>
			{
				history.map((step, move) => {
					const desc = move ? 'Movimento #' + move : 'Início do jogo';
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

/**
 * Função que transforma os atributos do estado do redux em props do componet
 */
const mapStateToProps = state => ({
	history: state.game.history
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
)(History);
