/**
 * TYPES
 */
export const Types = {
  SET_HISTORY: 'game/SET_HISTORY',
  SET_CURRENT: 'game/SET_CURRENT',
  CALCULATE_WINNER: 'game/CALCULATE_WINNER',
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  lines: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
  history: [{squares: Array(9).fill(null)}],
  newHistory: [],
  stepNumber: 0,
  xIsNext: true,
  current: [],
  squares: [],
  winner: null
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_CURRENT:
      const newHistory = state.history.slice(0, state.stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();

      return { ...state, current, squares, newHistory };

    case Types.SET_HISTORY:
      const newSquares = state.squares;
      newSquares[action.payload.square] = state.xIsNext ? 'X' : 'O';
      
      return { 
        ...state, 
        squares: newSquares,
        history: state.newHistory.concat([{squares: newSquares}]),
        stepNumber: state.newHistory.length,
        xIsNext: !state.xIsNext
      };

    case Types.CALCULATE_WINNER:
      for (let i = 0; i < state.lines.length; i++) {
        const [a, b, c] = state.lines[i];
        if (state.squares[a] && state.squares[a] === state.squares[b] && state.squares[a] === state.squares[c]) {
          return {...state, winner: state.squares[a]};
        }
      }
      return state;

    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  setHistory: (square) => ({
    type: Types.SET_HISTORY,
    payload: { square },
  }),

  setCurrent: () => ({
    type: Types.SET_CURRENT
  }),

  calculateWinner: () => ({
    type: Types.CALCULATE_WINNER
  })
  
};
