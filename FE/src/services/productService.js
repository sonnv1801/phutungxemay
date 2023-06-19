import Axios from "axios";
const API = "http://localhost:8000/v1/product";

export class ProductService {
  getPrdByType(type, limit) {
    return Axios.get(`${API}/products/${type}/${limit}`);
  }
  getDetail(id) {
    return Axios.get(`${API}/${id}`);
  }
}
