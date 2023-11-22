import { getCategory } from "./categories";

export var timelineEventsCategories = [
  {
    id: 1,
    timelineEvent: 1,
    category: 1,
  },
  {
    id: 2,
    timelineEvent: 1,
    category: 2,
  },
  {
    id: 3,
    timelineEvent: 2,
    category: 3,
  },
  {
    id: 4,
    timelineEvent: 2,
    category: 4,
  },
  {
    id: 5,
    timelineEvent: 3,
    category: 3,
  },
  {
    id: 6,
    timelineEvent: 3,
    category: 5,
  },
  {
    id: 7,
    timelineEvent: 3,
    category: 6,
  },
  {
    id: 8,
    timelineEvent: 4,
    category: 1,
  },
  {
    id: 9,
    timelineEvent: 5,
    category: 5,
  },
  {
    id: 10,
    timelineEvent: 5,
    category: 6,
  },
  {
    id: 11,
    timelineEvent: 5,
    category: 7,
  },
  {
    id: 12,
    timelineEvent: 6,
    category: 1,
  },
  {
    id: 13,
    timelineEvent: 7,
    category: 8,
  },
  {
    id: 14,
    timelineEvent: 8,
    category: 8,
  },
  {
    id: 15,
    timelineEvent: 8,
    category: 9,
  },
  {
    id: 16,
    timelineEvent: 9,
    category: 5,
  },
  {
    id: 17,
    timelineEvent: 9,
    category: 6,
  },
];

var timelineEventCategoryId = timelineEventsCategories.length;

export function addTimelineEventCategory(
  timelineEvent: number,
  category: number
) {
  timelineEventCategoryId += 1;

  timelineEventsCategories.push({
    id: timelineEventCategoryId,
    timelineEvent: timelineEvent,
    category: category,
  });
}

export function getTimelineEventCategories(timelineEvent: number) {
  let categories = [];

  timelineEventsCategories.forEach(function (timelineEventCategory) {
    if (timelineEventCategory["timelineEvent"] === timelineEvent) {
      let category = getCategory(timelineEventCategory["category"]);
      if (category !== undefined) {
        categories.push(getCategory(timelineEventCategory["category"]));
      }
    }
  });

  return categories;
}

export function deleteByEvent(timelineEvent: number) {
  let newTimelineEventsCategories = [];
  timelineEventsCategories.forEach(function (timelineEventCategory, idx) {
    if (timelineEventCategory["timelineEvent"] !== timelineEvent) {
      newTimelineEventsCategories = [...newTimelineEventsCategories, timelineEventsCategories[idx]];
    }
  });
  timelineEventsCategories = newTimelineEventsCategories;
}

export function deleteByCategory(category: number) {
  let newTimelineEventsCategories = [];
  timelineEventsCategories.forEach(function (timelineEventCategory, idx) {
    if (timelineEventCategory["category"] !== category) {
      newTimelineEventsCategories = [...newTimelineEventsCategories, timelineEventsCategories[idx]];
    }
  });
  timelineEventsCategories = newTimelineEventsCategories;
}
