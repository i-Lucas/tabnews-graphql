import database from "../../db/db.js";

const UserResolver = {
  User: {
    vehicle: (user: { vehicle: number }) =>
      database.vehicles.find((vehicle) => vehicle.id === user.vehicle),
  },
};

export default UserResolver;
