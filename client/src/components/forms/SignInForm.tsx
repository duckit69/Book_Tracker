import { useState } from "react";
import axios from "axios";
// Compononets
import FormInput from "../div/FormInput";
import ButtonSubmit from "../button/ButtonSubmit";
// Form handler
import { SubmitHandler, useForm } from "react-hook-form";
// Validation
import { joiResolver } from "@hookform/resolvers/joi";
import { userLoginSchema } from "../../utils/validators";
// Navigation
import { useNavigate } from "react-router";
// Global state
import { useAuth } from "../../hooks/useAuth";
// notfication after submit
import { toast, ToastContainer } from "react-toastify";
// AXIOS API client
import { useApiClient } from "../../api/axios";

type TUser = {
  username: string;
  password: string;
};

function SignInForm() {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: joiResolver(userLoginSchema),
  });
  const { setAccessToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const apiClient = useApiClient(); // useApiClient hook to get the axios instance

  // submit function
  const onSubmit: SubmitHandler<TUser> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await apiClient.post(
        "https://localhost:3000/login",
        data,
        {
          withCredentials: true,
        }
      );
      console.log("Login response:", result.data);
      // Get Access Token and set it in the global state
      setAccessToken(result.data.accessToken);

      // Redirect to homepage
      toast.success("Welcome !");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Invalid credentials, please try again");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        // do something with the error ( display red border around the form to indicate there was an error and try again)
        toast.error("An unexpected error occurred");
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 rounded-lg flex flex-col px-4 gap-y-10 text-black py-6 w-full max-w-md relative"
      >
        <FormInput
          className=""
          type="text"
          register={register("username")}
          text="Username"
          error={errors.username?.message}
        />
        <FormInput
          className=""
          type="password"
          register={register("password")}
          text="Password"
          error={errors.password?.message}
        />
        <ButtonSubmit text="Sign in" disabled={isSubmitting} />
        <ToastContainer autoClose={1500} position="bottom-center" />
      </form>
    </>
  );
}

export default SignInForm;
