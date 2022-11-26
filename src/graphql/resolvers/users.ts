import database from "../../db/db.js";

const listDevs = {
  listDevelopers: () => database.users,
};

export default listDevs;
