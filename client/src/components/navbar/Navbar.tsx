import logo from "../../assets/logo.png";
import ButtonAnchor from "../button/ButtonAnchor";
function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-6 mb-auto">
      <a href="/">
        <img src={logo} alt="logo" className="size-10" />
      </a>
      <ButtonAnchor
        text="Join us !"
        path="test"
        className="bg-white text-black rounded-xl px-6 py-1 text-xl font-medium"
      />
    </nav>
  );
}

export default Navbar;
