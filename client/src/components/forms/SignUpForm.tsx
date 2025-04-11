import { useState } from "react";
import axios from "axios";

import FormInput from "../div/FormInput";
import ButtonSubmit from "../button/ButtonSubmit";

import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSignupSchema } from "../../utils/validators";

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
  const onSubmit: SubmitHandler<TUser> = async (data) => {
    setIsSubmitting(true);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    try {
      const result = await axios.post("http://127.0.0.1:3000/users", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      // reset form after submit
      // react hook form provide a function include it
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        console.error("Error during signup:", error?.response);
      }
      if (error instanceof Error) {
        console.error("Error during signup:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 rounded-lg flex flex-col px-4 gap-y-10 text-black py-6 w-full max-w-md"
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
      </form>
    </>
  );
}

export default SignUpForm;
