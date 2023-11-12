const { faker } = require("@faker-js/faker");

const positions = [
  {
    id: 1,
    name: "Security",
  },
  {
    id: 2,
    name: "Designer",
  },
  {
    id: 3,
    name: "Content manager",
  },
  {
    id: 4,
    name: "Lawyer",
  },
];

const createRandomUser = () => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.helpers.fromRegExp("+380[0-9]{9}"),
    position_id: faker.helpers.arrayElement(positions.map((e) => e.id)),
    photo: faker.internet.avatar(),
  };
};

const numberOfUsers = 45;

const createUsers = (length) => {
  const usersArr = [];
  for (let i = 0; i < length; i++) {
    usersArr.push(createRandomUser());
  }
  return usersArr;
};

const users = createUsers(numberOfUsers);

module.exports = { positions, users };
