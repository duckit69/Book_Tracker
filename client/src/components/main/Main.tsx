import IntroSection from "../section/IntroSection";
import DiscoverBooksSection from "../section/DiscoverBooksSection";
import ReadWithFriendsSection from "../section/ReadWithFriendsSection";

function Main() {
  return (
    <>
      <IntroSection className="text-2xl px-4 mt-12" />
      <DiscoverBooksSection className="text-2xl px-4 mt-12" />
      <ReadWithFriendsSection className="text-2xl px-4 mt-12" />
    </>
  );
}
export default Main;
