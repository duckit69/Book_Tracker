function ButtonAnchor({
  text,
  className,
  path = "/signup",
}: {
  text: string;
  className: string;
  path?: string;
}) {
  return (
    <a href={path} className={className}>
      {text}
    </a>
  );
}

export default ButtonAnchor;
