import { useState } from "react";
import axios from "axios";
// Compononets
import FormInput from "../div/FormInput";
import ButtonSubmit from "../button/ButtonSubmit";
// Form handler
import { SubmitHandler, useForm } from "react-hook-form";
// Validation
import { joiResolver } from "@hookform/resolvers/joi";
import { userSignupSchema } from "../../utils/validators";
// Navigation
import { useNavigate } from "react-router";
// notfication after submit
import { toast, ToastContainer } from "react-toastify";

type TUser = {
  username: string;
  password: string;
  repeat_password?: string;
  birthDate?: Date;
};

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: joiResolver(userSignupSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    setIsSubmitting(true);
    const jsonData = JSON.stringify(data);
    try {
      await axios.post("http://127.0.0.1:3000/users", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // move to sign in page
      toast.success("User created successfully");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        // console.error("Error during signup from Axios:", error?.response?.data);
        if (error?.response?.data?.code === "P2002") {
          toast.error("Username already taken");
        }
        toast.error("Wrong credentials, please try again");
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
        // do something with the error ( display red border around the form to indicate there was an error and try again)
        toast.error("Bad request, please try again");
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
        <FormInput
          className=""
          type="password"
          register={register("repeat_password")}
          text="Password confirmation"
          error={
            errors.repeat_password
              ? "Password confirmation does not match"
              : undefined
          }
        />
        <FormInput
          className=""
          type="date"
          text="Bith Date"
          register={register("birthDate")}
          error={errors.birthDate?.message}
        />
        <ButtonSubmit text="Sign up" disabled={isSubmitting} />
        <ToastContainer autoClose={1500} position="bottom-center" />
      </form>
    </>
  );
}

export default SignUpForm;
