import { useState } from "react";

function useSpeakerFilter(startingShowSesions, startingEventYear) {
  const [showSessions, setShowSessions] = useState(startingShowSesions);
  const [eventYear, setEventYear] = useState(startingEventYear);
  const [searchQuery, setSearchQuery] = useState("");

  const EVENT_YEARS = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];

  return {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  };
}

export default useSpeakerFilter;
