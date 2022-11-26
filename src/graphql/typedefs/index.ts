import fs from "node:fs";
const path = "./src/graphql/schemas/";

const schemas = ["hello", "users", "vehicles"]; // precisa ter o nome do arquivo

const build = (schemas: string[]) =>
  schemas
    .map((schema) => fs.readFileSync(path + `${schema}.graphql`, "utf8"))
    .concat();

const typeDefs = build(schemas);
export default typeDefs;
