export var users = [
  {
    id: 1,
    name: "Łukasz",
    email: "bossgame32@gmail.com",
    password: "testpassword",
    first_name: "Łukasz",
    last_name: "Jezapkowicz",
    phone: "123456789",
    company: "Test Company",
    avatar: "avatars/1.png",
    created: new Date(),
    updated: new Date(),
  },
  {
    id: 2,
    name: "Piotr",
    email: "piotr123@gmail.com",
    password: "testpassword2",
    first_name: "Piotr",
    last_name: "Kowalski",
    phone: "987654321",
    company: "Probe Company",
    avatar: "avatars/2.webp",
    created: new Date(),
    updated: new Date(),
  },
];

var usersCount = users.length;

export function changeUser(userId: number) {
  userId = (userId % usersCount) + 1;
  return getUser(userId);
}

export function getUser(userId: number) {
  let user;

  users.forEach(function (u) {
    if (u["id"] === userId) {
      user = u;
    }
  });

  return user;
}

export function saveUser(
  userId: number,
  name: string,
  first_name: string,
  last_name: string,
  phone: string,
  company: string
) {
  users.forEach(function (us) {
    if (us["id"] === userId) {
      us.name = name;
      us.first_name = first_name;
      us.last_name = last_name;
      us.phone = phone;
      us.company = company;
    }
  });
}

export function uploadUserImage(userId: number, image: string) {
  users.forEach(function (us) {
    if (us["id"] === userId) {
      us.avatar = image;
    }
  });
}

export function changePassword(userId: number, password: string) {
  users.forEach(function (us) {
    if (us["id"] === userId) {
      us.password = password;
    }
  });
}
