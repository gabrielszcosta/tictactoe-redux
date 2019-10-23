/**
 * TYPES
 */
export const Types = {
  SET_NEW_HISTORY: 'game/SET_NEW_HISTORY',
  SET_CURRENT: 'game/SET_CURRENT',
  SET_STATUS: 'game/SET_STATUS',
  CALCULATE_WINNER: 'game/CALCULATE_WINNER',
  JUMP_TO: 'game/JUMP_TO',
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  lines: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
  history: [{squares: Array(9).fill(null)}],
  newHistory: [],
  stepNumber: 0,
  xIsNext: 'X',
  current: [],
  squares: [],
  winner: null,
  status: ''
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
    /**
     * Cria um estado atual
     */
    case Types.SET_CURRENT:
      const newHistory = state.history.slice(0, state.stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();

      return { ...state, current, squares, newHistory };

    /**
     * Atualiza o histórico
     */
    case Types.SET_NEW_HISTORY:
      const newSquares = state.squares;
      newSquares[action.payload.square] = state.xIsNext ? 'X' : 'O';

      return {
        ...state,
        squares: newSquares,
        history: state.newHistory.concat([{squares: newSquares}]),
        stepNumber: state.newHistory.length,
        xIsNext: !state.xIsNext
      };

    /**
     * Atualiza o status do jogo
     */
    case Types.SET_STATUS:
      if (state.winner) {
        return {
          ...state,
          status: 'Vencedor: ' + state.winner
        };
      } else {
        return {
          ...state,
          status: 'Próximo jogador: ' + (state.xIsNext ? 'X' : 'O')
        };
      }

    /**
     * Verifica se houve vencedor
     */
    case Types.CALCULATE_WINNER:
      for (let i = 0; i < state.lines.length; i++) {
        const [a, b, c] = state.lines[i];
        if (state.squares[a] && state.squares[a] === state.squares[b] && state.squares[a] === state.squares[c]) {
          return {...state, winner: state.squares[a]};
        }
      }
      return state;

    /**
     * Navega no histórico de jogadas
     */
    case Types.JUMP_TO:
      return {
        ...state,
        stepNumber: action.payload.move,
        xIsNext: action.payload.move % 2 === 0,
      };

    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
    /**
     * Função que dispara a action que atualiza o historico de jogadas
     * @param Int square: índice do quadrado clicado
     */
    setNewHistory: (square) => ({
        type: Types.SET_NEW_HISTORY,
        payload: { square },
    }),

    /**
     * Função que dispara a action que cria um estado atual no jogo
     */
    setCurrent: () => ({
        type: Types.SET_CURRENT
    }),

    /**
     * Função que dispara a action que atualiza o status
     */
    setStatus: () => ({
        type: Types.SET_STATUS
    }),

    /**
     * Função que dispara a action que calcula o vencedor
     */
    calculateWinner: () => ({
        type: Types.CALCULATE_WINNER
    }),

    /**
     * Função que dispara a action que navega no historico
     * @param Int move: índice do histórico selecionado
     */
    jumpTo: (move) => ({
        type: Types.JUMP_TO,
        payload: { move },
    })
};
