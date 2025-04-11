function ButtonSubmit({
  className,
  text,
  disabled,
}: {
  className?: string;
  text: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`w-full border bg-(--mainCyan) py-2 rounded-md text-white font-semibold ${className}`}
      type="submit"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ButtonSubmit;
