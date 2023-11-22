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
  },
];

var usersCount = users.length;
var currentUser = 1;

export function changeUser() {
  currentUser = (currentUser % usersCount) + 1;
  return getUser();
}

export function getUser() {
  let user;

  users.forEach(function (u) {
    if (u["id"] === currentUser) {
      user = u;
    }
  });

  return user;
}

export function saveUser(
  name: string,
  first_name: string,
  last_name: string,
  phone: string,
  company: string
) {
  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.name = name;
      us.first_name = first_name;
      us.last_name = last_name;
      us.phone = phone;
      us.company = company;
    }
  });
}

export function uploadUserImage(image: string) {
  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.avatar = image;
    }
  });
}

export function changePassword(password: string) {
  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.password = password;
    }
  });
}
