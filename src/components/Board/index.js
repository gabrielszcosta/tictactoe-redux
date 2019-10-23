import React from 'react';

/**
 * Importação do components que compõe a board do jogo
 */
import Square from '../Square'

export default function Board ({ squares }) {

    /**
     * Função que renderiza cada quadrado do board do jogo atribuindo o seu respectivo índice e o valor que será exibido no quadrado
     */
	function renderSquare(index) {
		return <Square value={ squares[index] } index={ index } />;
	}

	return(
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
