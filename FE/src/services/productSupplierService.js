import Axios from "axios";
const API = "http://localhost:8000/v1/productsupplier";

export class ProductSupplierService {
  getPrdSupplierByType(type, limit) {
    return Axios.get(`${API}/${type}/${limit}`);
  }
  getDetailSupplier(id) {
    return Axios.get(`${API}/${id}`);
  }
}
