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

export function initUsers(force) {
  if (!localStorage.getItem("users") || force) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (!localStorage.getItem("current_user") || force) {
    localStorage.setItem("current_user", "1");
  }
}

export function changeUser() {
  let currentUser = parseInt(localStorage.getItem("current_user"));
  currentUser = (currentUser % users.length) + 1;
  localStorage.setItem("current_user", String(currentUser));
  return getUser();
}

export function getUser() {
  let currentUser = parseInt(localStorage.getItem("current_user"));
  let user;

  JSON.parse(localStorage.getItem("users")).forEach(function (u) {
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
  let currentUser = parseInt(localStorage.getItem("current_user"));
  let users = JSON.parse(localStorage.getItem("users"));

  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.name = name;
      us.first_name = first_name;
      us.last_name = last_name;
      us.phone = phone;
      us.company = company;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
}

export function uploadUserImage(image: string) {
  let currentUser = parseInt(localStorage.getItem("current_user"));
  let users = JSON.parse(localStorage.getItem("users"));

  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.avatar = image;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
}

export function changePassword(password: string) {
  let currentUser = parseInt(localStorage.getItem("current_user"));
  let users = JSON.parse(localStorage.getItem("users"));

  users.forEach(function (us) {
    if (us["id"] === currentUser) {
      us.password = password;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
}
