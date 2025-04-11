import Hero from "../../components/hero/Hero";
import Main from "../../components/main/Main";
import Footer from "../../components/footer/Footer";
function Home() {
  return (
    <>
      <Hero className="w-full" />
      <Main />
      <Footer className="w-full" />
    </>
  );
}

export default Home;
