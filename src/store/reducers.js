import {
  GET_PATIENTS_ERROR,
  GET_PATIENTS_SUCCESS,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_ERROR,
  CLEAN_ORDER_DETAIL_MESSAGE,
  CLOSE_ALERT_DIALOG_PAGE
} from '../constants';

const initialState = {
  isShowingAlertDialog: false,
  alertDialogPage: {
    title: 'Title',
    msg: 'Someing went wrong',
  },
  patients: [],
  orderDetail: {
    isError: false,
    message: ''
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS_ERROR:
      return {
        ...state,
        isShowingAlertDialog: true,
        alertDialogPage: {
          title: 'Fails to get patients',
          msg: action.payload.message,
        },
      }
    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: action.payload.data || [],
      }
    case SAVE_ORDER_ERROR:
      return {
        ...state,
        orderDetail: { isError: true, message: '更新失敗' }
      }
    case SAVE_ORDER_SUCCESS:
      return {
        ...state,
        patients: state.patients.map(item => ({
          ...item,
          message: item.patientId === action.payload.patientId
            ? action.payload.message
            : item.message
        })),
        orderDetail: { isError: false, message: '更新成功' }
      }
    case CLEAN_ORDER_DETAIL_MESSAGE:
      return {
        ...state,
        orderDetail: { isError: false, message: '' }
      }
    case CLOSE_ALERT_DIALOG_PAGE:
      return {
        ...state,
        isShowingAlertDialog: false,
      }
    default:
      return state
  }
}

export default rootReducer
