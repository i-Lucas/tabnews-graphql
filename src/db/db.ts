const stackList = [
  { name: "Typescript", score: 1.1 },
  { name: "NodeJs", score: 1.2 },
  { name: "PostgreSQL", score: 1.5 },
  { name: "Prisma", score: 1.3 },
  { name: "React", score: 0.9 },
  { name: "GraphQL", score: 2.1 },
];

const vehicles = [
  { id: 0, model: "Opala", year: 1972 },
  { id: 1, model: "Ômega", year: 1992 },
  { id: 2, model: "Santana", year: 1994 },
  { id: 3, model: "Gol GTI", year: 1990 },
  { id: 4, model: "Maverick", year: 1970 },
];

const users = [
  {
    id: 0,
    name: "Devinho",
    age: 18,
    email: "devinho@bug.com",
    isDeveloper: true,
    stack: stackList.slice(0, 2),
    vehicle: 1,
  },
  {
    id: 1,
    name: "Juninho",
    age: 20,
    email: "juninho@dev.com",
    isDeveloper: true,
    stack: stackList.slice(2, 4),
    vehicle: 2,
  },
  {
    id: 2,
    name: "Fulaninho",
    age: 99,
    email: "fulano@old.com",
    isDeveloper: false,
    stack: stackList.slice(4, 6),
    vehicle: 4,
  },
];

const database = {
  users,
  stackList,
  vehicles,
};

export default database;
