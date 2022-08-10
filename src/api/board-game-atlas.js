import axios from "axios";

const client_id = import.meta.env.VITE_CLIENT_ID_BOARD_GAME_ALTAS;
const urlGames = "https://api.boardgameatlas.com/api/search";

const searchGameApi = (params) => {
  return axios.get(urlGames, {
    params: {
      ...params,
      client_id,
    },
  });
};

export { searchGameApi };
