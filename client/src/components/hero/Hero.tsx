import Navbar from "../navbar/Navbar";
import HeroText from "../heroText/heroText";

function Hero({ className }: { className?: string }) {
  return (
    <div className={`${className} text-white hero`}>
      <Navbar />
      <HeroText />
    </div>
  );
}

export default Hero;
