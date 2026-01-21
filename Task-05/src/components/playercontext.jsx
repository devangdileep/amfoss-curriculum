import { createContext, useContext, useState } from "react";
const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [user , CurrentUser] = useState(null);

  return (
    <PlayerContext.Provider value={{ currentSong, setCurrentSong , user,CurrentUser}}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  return context;
}
