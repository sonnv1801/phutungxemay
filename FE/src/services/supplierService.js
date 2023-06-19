import Axios from "axios";
const API = "http://localhost:8000/v1";

export class SupplierService {
  getAllSupplier() {
    return Axios.get(`${API}/supplier`);
  }
}
