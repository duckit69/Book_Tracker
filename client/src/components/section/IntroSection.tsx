function IntroSection({ className }: { className: string }) {
  return (
    <section className={`${className} font-light text-center`}>
      <p>
        We'll help you <span className="font-bold"> track your reading </span>{" "}
        and
        <span className="font-bold"> choose your next book</span> based on what
        other people's favourite books.
      </p>
    </section>
  );
}

export default IntroSection;
