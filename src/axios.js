import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    if (!config.params) {
      config.params = {
        key: "e4a911227d8c4a1e8da51581789d1f3d",
      };
    } else {
      config.params.key = "e4a911227d8c4a1e8da51581789d1f3d";
    }
    return config;
  },
  function (error) {
    Promise.reject(error);
  }
);

export default api;
