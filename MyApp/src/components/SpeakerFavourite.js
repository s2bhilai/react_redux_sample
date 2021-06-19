import { useContext, useState } from "react";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";

function SpeakerFavourite() {
  const { speaker, updateRecord } = useContext(SpeakerContext);

  const [inTransition, setInTransition] = useState(false);

  function doneCallback() {
    setInTransition(false);
    console.log("Done Callback");
  }

  return (
    <div className="action padB1">
      <span
        onClick={function () {
          setInTransition(true);
          updateRecord(
            {
              ...speaker,
              favorite: !speaker.favorite,
            },
            doneCallback
          );
        }}
      >
        <i
          className={
            speaker.favorite === true
              ? "fa fa-star orange"
              : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {inTransition ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
}

export default SpeakerFavourite;
