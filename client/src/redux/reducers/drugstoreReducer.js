import { FETCH_DRUGSTORES, FETCH_DRUGSTORES_ERROR } from '../constants/actionTypes';

const initialState = {
  drugstores: [],
  error: null,
};

const drugstoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRUGSTORES:
      console.log("Updated state:", { ...state, drugstores: action.payload }); // Log the updated state
      return {
        ...state,
        drugstores: action.payload,
      };
    case FETCH_DRUGSTORES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default drugstoreReducer;
