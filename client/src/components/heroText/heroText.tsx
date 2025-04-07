import ButtonAnchor from "../button/ButtonAnchor";

function HeroText() {
  return (
    <>
      <div className="px-8 flex flex-col my-auto font-bold pb-16 mx-auto mt-2">
        <p className="text-3xl">The</p>
        <p className="text-5xl font-bold mb-3">Book Tracker</p>
        <p className="text-3xl">
          Because your life's too busy to track your own books.
        </p>
        <div className="container mt-9">
          <ButtonAnchor
            text="Sign up"
            path="/"
            className="px-8 py-3 my-5 bg-black rounded-xl"
          />
          <ButtonAnchor text="Sign in" path="/" className="px-8 py-3 my-5" />
        </div>
      </div>
    </>
  );
}

export default HeroText;
