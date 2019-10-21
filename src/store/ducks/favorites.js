/**
 * TYPES
 */
export const Types = {
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCCESS',
  ADD_FAILURE: 'favorites/ADD_FAILURE',
  REMOVE: 'favorites/REMOVE',
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };

    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: [...state.data, action.payload.data],
      };

    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case Types.REMOVE:
      return {
        ...state,
        data: state.data.filter(
          (favorite) => favorite.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  addFavoriteRequest: (repository) => ({
    type: Types.ADD_REQUEST,
    payload: { repository },
  }),

  addFavoriteSuccess: (data) => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addFavoriteFailure: (error) => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),

  removeFavorite: (id) => ({
    type: Types.REMOVE,
    payload: { id },
  }),
};
