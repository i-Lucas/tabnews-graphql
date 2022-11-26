import database from "../../db/db.js";

const getDev = {
  getDev: (_: any, { id }) => database.users.find((user) => user.id === id),
};

export default getDev;
