import ButtonAnchor from "../button/ButtonAnchor";
function HeroText() {
  return (
    <div
      className="flex flex-col font-medium self-center
 px-6 pb-16 me-auto md:w-full md:max-w-xl md:mx-auto lg:ms-5 lg:max-w-lg xl:max-w-xl xl:py-12 xl:ms-18"
    >
      <p className="text-2xl md:text-4xl">The</p>
      <p className="text-3xl font-bold md:text-6xl">Book Tracker</p>
      <p className="text-2xl md:text-4xl">
        Because your life's too busy to track your own books.
      </p>
      <div className="mt-4">
        <ButtonAnchor
          text="Sign up"
          path="/signup"
          className="px-8 py-3 bg-black rounded-xl"
        />
        <ButtonAnchor text="Sign in" path="/signin" className="px-8 py-3" />
      </div>
      <button
        onClick={() => {
          fetch("https://localhost:3000/refresh", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Manual refresh token fetch result:", data);
            })
            .catch((err) => {
              console.error("Manual fetch error:", err);
            });
        }}
      >
        Test Refresh
      </button>
    </div>
  );
}

export default HeroText;
