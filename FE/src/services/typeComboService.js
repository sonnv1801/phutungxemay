import Axios from "axios";
const API = "http://localhost:8000/v1";

export class TypeComBoService {
  getAllType() {
    return Axios.get(`${API}/typecombo`);
  }
}
