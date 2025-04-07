function ButtonAnchor({
  text,
  path,
  className,
}: {
  text: string;
  path: string;
  className: string;
}) {
  return (
    <a target="_blank" href={path} className={className}>
      {text}
    </a>
  );
}

export default ButtonAnchor;
