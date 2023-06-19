import { createAction } from ".";
import { typeComboService } from "../../services";
import {
  FETCH_TYPE_COMBO_PRODUCT,
  START_LOADING,
  STOP_LOADING,
} from "../type/types";

export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const getAllTypeProductCombo = () => {
  return (dispatch) => {
    dispatch(startLoading());
    typeComboService
      .getAllType()
      .then((res) => {
        dispatch(createAction(FETCH_TYPE_COMBO_PRODUCT, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
