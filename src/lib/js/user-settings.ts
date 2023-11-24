export let userSettings = [
  {
    id: 1,
    user: 1,
    notificationDaysBefore: 1,
    notificationDaysAfter: 7,
  },
  {
    id: 2,
    user: 2,
    notificationDaysBefore: 5,
    notificationDaysAfter: 14,
  },
];

export function initUserSettings(force) {
  if (!localStorage.getItem("user_settings") || force) {
    localStorage.setItem("user_settings", JSON.stringify(userSettings));
  }
}

export function getUserSettings(userId: number) {
  let settings;

  JSON.parse(localStorage.getItem("user_settings")).forEach(function (us) {
    if (us["user"] === userId) {
      settings = us;
    }
  });

  return settings;
}

export function saveUserSettings(
  userId: number,
  notificationDaysBefore: number,
  notificationDaysAfter: number
) {
  let settings = JSON.parse(localStorage.getItem("user_settings"));

  settings.forEach(function (us) {
    if (us["user"] === userId) {
      us.notificationDaysBefore = notificationDaysBefore;
      us.notificationDaysAfter = notificationDaysAfter;
    }
  });

  localStorage.setItem("user_settings", JSON.stringify(settings)); 
}
