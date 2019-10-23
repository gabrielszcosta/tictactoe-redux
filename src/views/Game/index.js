import React, { useEffect } from 'react';

/**
 * IMPORTAÇÕES DO REDUX, DO CONECTOR COM REACT E DAS ACTIONS DO REDUX
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../../store/ducks/game';

/**
 * Importação de components que compõem a view do jogo
 */
import Board from '../../components/Board'
import History from '../../components/History'

function Game({ setStatus, calculateWinner, history, status, squares }) {

    /**
     * Função do react hooks utilizada para monitorar estados das variáveis e executar alguma atualização no component
     */
    useEffect(() => {
		calculateWinner();
		setStatus();
	}, [ history, calculateWinner, setStatus ]);

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={ squares } />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<History />
			</div>
		</div>
	);
}

/**
 * Função que transforma os atributos do estado do redux em props do componet
 */
const mapStateToProps = state => ({
	history: state.game.history,
	squares: state.game.squares,
	status: state.game.status,
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
)(Game);
