import axios from "axios";
//เมื่อมีการเรียกใช้ axios จะมีการเรียกใช้งานเสมอ
const instance = axios.create({
  baseURL: "http://localhost:3000", //เวลา axios ไม่ต้องคอยใส่ http://localhost:3000 แล้ว มันจะ set ให้
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      //แนบ Bearer token ไปที่ header ทุกครั้งเมื่อทำการเรียกใช้ axios
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
