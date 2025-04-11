import { useId } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  className?: string;
  type: string;
  text: string;
  register: UseFormRegisterReturn;
  error?: string;
};

function FormInput({ className, type, text, register, error }: FormInputProps) {
  const inputId = useId();
  return (
    <div className={`${className} flex flex-col`}>
      <label htmlFor={inputId}>{text}</label>
      <input
        type={type}
        id={inputId}
        required
        className="p-2 border rounded-lg"
        {...register}
      />
      <p>{error}</p>
    </div>
  );
}

export default FormInput;
