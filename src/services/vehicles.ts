import database from "../db/db.js";

export default function registerVehicle(model: string, year: number) {
  const checkModel = database.vehicles.some(
    (vehicle) => vehicle.model === model
  );
  if (checkModel) throw new Error("this model has already been registered");

  const id = database.vehicles.length;
  database.vehicles.push({ id, model, year });
  return database.vehicles.find((vehicle) => vehicle.id === id);
}
