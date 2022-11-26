import hello from "./hello.js";
import listDevs from "./users.js";
import getDev from "./getDev.js";
import UserResolver from "./user.js";
import mutCreateVeh from "./createVehicle.js";

const resolvers = {
  Query: {
    ...hello,
    ...listDevs,
    ...getDev,
  },
  Mutation: {
    ...mutCreateVeh, // aqui
  },
  ...UserResolver,
};

export default resolvers;
