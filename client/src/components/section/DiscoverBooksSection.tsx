import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
function DiscoverBooksSection({ className }: { className: string }) {
  return (
    <section className={`${className} py-4`}>
      <FontAwesomeIcon
        className="fa-regular fa-face-smile extralight
                    text-xl bg-(--mainCyan) text-white p-4 rounded-lg mt-8"
        icon={faFaceSmile}
      />
      <h3 className="font-extrabold text-3xl mt-6 ">
        Discover Books by categories
      </h3>
      <p className="mt-6">
        In the mood for something adventurous, funny, and fast-paced? What about
        a darker, slower, more emotional read?
      </p>
      <p className="mt-6">
        Find what you are looking for with few simple clicks and some magic.
      </p>
    </section>
  );
}

export default DiscoverBooksSection;
