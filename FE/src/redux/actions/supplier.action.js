import { createAction } from ".";
import { supplierService } from "../../services";
import {
  FETCH_SUPPLIER_TYPE,
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

export const getSupplier = () => {
  return (dispatch) => {
    dispatch(startLoading());
    supplierService
      .getAllSupplier()
      .then((res) => {
        dispatch(createAction(FETCH_SUPPLIER_TYPE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
