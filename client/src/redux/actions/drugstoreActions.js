// drugstoreActions.js
import { FETCH_DRUGSTORES, FETCH_DRUGSTORES_ERROR } from '../constants/actionTypes';
import { getDrugstores } from '../../api/drugstoreService';

export const fetchDrugstores = (latitude, longitude) => async (dispatch) => {
  try {
    const drugstores = await getDrugstores(latitude, longitude);
    dispatch({
      type: FETCH_DRUGSTORES,
      payload: drugstores,
    });
  } catch (error) {
    console.error('Error fetching drugstores:', error);
    dispatch({
      type: FETCH_DRUGSTORES_ERROR,
      payload: error.message,
    });
  }
};
