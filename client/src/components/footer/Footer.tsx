import gitHubLogo from "../../assets/github-mark-white.svg";
function Footer() {
  return (
    <footer className="bg-(--mainCyan) text-white p-2 mt-6 flex flex-col justify-center items-center">
      <div className="w-fit flex flex-col justify-center items-center gap-2">
        <a href="https://github.com/duckit69" target="_blank" className="">
          <img src={gitHubLogo} className="w-10" alt="GitHubLogo" />
        </a>
      </div>
      <p>&copy; something</p>
    </footer>
  );
}

export default Footer;
