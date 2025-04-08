import Navbar from "../navbar/Navbar";
import HeroText from "../heroText/heroText";

function Hero() {
  return (
    <div className="text-white hero py-6 px-6">
      <Navbar />
      <HeroText />
    </div>
  );
}

export default Hero;
