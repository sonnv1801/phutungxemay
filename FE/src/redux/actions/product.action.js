import { createAction } from ".";
import { productByService } from "../../services";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ADD_CART,
  DELETE_CART,
  FETCH_DETAIL,
  FETCH_PRODUCT_BY_TYPE,
  NUMBER_QUANTITY,
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

export const getProductByTypes = (type, limit) => {
  return (dispatch) => {
    dispatch(startLoading());
    productByService
      .getPrdByType(type, limit)
      .then((res) => {
        dispatch(createAction(FETCH_PRODUCT_BY_TYPE, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    productByService
      .getDetail(id)
      .then((res) => {
        dispatch(createAction(FETCH_DETAIL, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const addCart = (product) => {
  const productCart = {
    id: product.id,
    code: product.code,
    status: product.status,
    title: product.title,
    image: product.image,
    newPrice: product.newPrice,
    quantity_cart: 1,
  };

  return async (dispatch) => {
    try {
      await dispatch(createAction(ADD_CART, productCart));
      toast.success("Thêm thành công sản phẩm", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
};

export const deleteCart = (product) => {
  return (dispatch) => {
    dispatch(createAction(DELETE_CART, product));
  };
};

export const numberQuantity = (product, status) => {
  return (dispatch) => {
    dispatch(createAction(NUMBER_QUANTITY, { product, status }));
  };
};
