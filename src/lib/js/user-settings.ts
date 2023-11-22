import { getUser } from "./users";

export let userSettings = [
  {
    id: 1,
    user: 1,
    notificationDaysBefore: 1,
    notificationDaysAfter: 7,
    created: new Date(),
    updated: new Date(),
  },
  {
    id: 2,
    user: 2,
    notificationDaysBefore: 5,
    notificationDaysAfter: 14,
    created: new Date(),
    updated: new Date(),
  },
];

export function getUserSettings(userId: number) {
  let settings;

  userSettings.forEach(function (us) {
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
  userSettings.forEach(function (us) {
    if (us["user"] === userId) {
      us.notificationDaysBefore = notificationDaysBefore;
      us.notificationDaysAfter = notificationDaysAfter;
    }
  });
}
