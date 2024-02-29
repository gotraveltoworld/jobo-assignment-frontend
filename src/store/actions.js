
import * as api from '../services/api'
import {
  GET_PATIENTS_ERROR,
  GET_PATIENTS_SUCCESS,
  SAVE_ORDER_ERROR,
  SAVE_ORDER_SUCCESS,
  CLEAN_ORDER_DETAIL_MESSAGE,
  CLOSE_ALERT_DIALOG_PAGE
} from '../constants';

export const getPatients = () => async (dispatch) => {
  try {
    const response = await api.getPatientsAPI()
    dispatch({ type: GET_PATIENTS_SUCCESS, payload: response.data })
  } catch (error) {
    const message = error?.response?.message || error?.message
    dispatch({ type: GET_PATIENTS_ERROR, payload: { message } })
  }
}

export const saveOrder = (patientId, message) => async (dispatch) => {
  try {
    const response = await api.saveOrder(patientId, message)
    dispatch({ type: SAVE_ORDER_SUCCESS, payload: {
      ...response.data?.data || {},
      patientId,
    } })
  } catch (error) {
    const message = error?.response?.message || error?.message
    dispatch({ type: SAVE_ORDER_ERROR, payload: { message } })
  }
}

export const cleanOrderDetailMessage = () => (dispatch) => {
  dispatch({ type: CLEAN_ORDER_DETAIL_MESSAGE })
}

export const closeAlterDialogPage = () => async (dispatch) => {
  dispatch({ type: CLOSE_ALERT_DIALOG_PAGE })
}
