import SpeakersToolbar from "./SpeakerToolBar";
import { useState } from "react";
import SpeakerList from "./SpeakerList";
import { SpeakerFilterProvider } from "../contexts/SpeakerFilterContext";

function Speakers() {
  return (
    <SpeakerFilterProvider startingShowSessions={false}>
      <SpeakersToolbar />
      <SpeakerList></SpeakerList>
    </SpeakerFilterProvider>
  );
}

export default Speakers;
