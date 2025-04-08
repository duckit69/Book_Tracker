import ButtonAnchor from "../button/ButtonAnchor";

function HeroText() {
  return (
    <>
      <div className="mt-auto px-2 flex flex-col font-bold pb-16 mx-auto">
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
