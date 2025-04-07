import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
function ReadWithFriendsSection({ className }: { className: string }) {
  return (
    <section className={`${className}`}>
      <FontAwesomeIcon
        className="fa-regular fa-face-smile extralight
                    text-xl bg-(--mainCyan) text-white p-4 rounded-lg mt-8"
        icon={faUserGroup}
      />
      <h3 className="font-extrabold text-3xl mt-6 ">Read with friends</h3>
      <p className="mt-6">
        Give your friends a chance to read the same book as you. You can rate
        boooks so people can see what you think about it. You can also add
        comments to the book so people can see your opinion about it.
      </p>
    </section>
  );
}

export default ReadWithFriendsSection;
