import { createAction } from ".";
import { typeService } from "../../services";
import { FETCH_TYPE_PRODUCT, START_LOADING, STOP_LOADING } from "../type/types";

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

export const getAllTypeProduct = () => {
  return (dispatch) => {
    dispatch(startLoading());
    typeService
      .getAllType()
      .then((res) => {
        dispatch(createAction(FETCH_TYPE_PRODUCT, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
