import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("login successful");
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("Error", err.message);
      navigate("/register");
      toast.error("provided email or pasword is incorrect");
    },
  });

  return { login, isLoading };
}
