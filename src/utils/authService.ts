import axios, { AxiosRequestConfig } from "axios";
import { useCookies } from "react-cookie";
import { ApiRoot } from "./consts";
import { useNavigate } from "react-router";

export const RefreshToken = async () => {
  const [cookie, setCookie] = useCookies(["Authorization"]);
  const navigate = useNavigate();

  // Cant refresh auth token if not logged in
  if (cookie["Authorization"] === undefined) {
    return;
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: cookie["Authorization"],
    },
  };

  axios
    .post(ApiRoot("auth/refresh"), {}, config)
    .then((res) => {
      setCookie("Authorization", res.data);
    })
    .catch((err) => {
      console.error(err);
      navigate("/ServerError");
    });
};
