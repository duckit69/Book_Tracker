import IntroSection from "../section/IntroSection";
import DiscoverBooksSection from "../section/DiscoverBooksSection";
import ReadWithFriendsSection from "../section/ReadWithFriendsSection";

function Main() {
  return (
    <main className="lg:w-full lg:grid lg:grid-cols-2 lg:gap-5 p-5 lg:place-items-center">
      <IntroSection className="text-2xl md:max-w-xl lg:col-span-2" />
      <DiscoverBooksSection className="text-2xl md:max-w-xl lg:row-start-2" />
      <ReadWithFriendsSection className="text-2xl md:max-w-xl lg:row-start-2" />
    </main>
  );
}
export default Main;
