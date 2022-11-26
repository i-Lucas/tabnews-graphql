import registerVehicle from "../../services/vehicles.js";

const mutCreateVeh = {
  createVehicle: (_: any, { data }) => registerVehicle(data.model, data.year),
};

export default mutCreateVeh;
