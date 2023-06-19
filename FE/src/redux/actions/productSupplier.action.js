import { createAction } from ".";
import { productSupplierService } from "../../services";
import {
  FETCH_DETAIL_SUPPLIER,
  FETCH_PRODUCT_SUPPLIER_BY_TYPE,
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

export const getProductSupplierByTypes = (type, limit) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSupplierService
      .getPrdSupplierByType(type, limit)
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_SUPPLIER_BY_TYPE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getDetailSuppliers = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    productSupplierService
      .getDetailSupplier(id)
      .then((res) => {
        dispatch(createAction(FETCH_DETAIL_SUPPLIER, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
