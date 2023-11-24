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

export function initTimelineEventCategories(force) {
  if (!localStorage.getItem("timeline_event_categories") || force) {
    localStorage.setItem("timeline_event_categories", JSON.stringify(timelineEventsCategories));
  }
}

export function addTimelineEventCategory(
  timelineEvent: number,
  category: number
) {
  let timelineCategories = JSON.parse(localStorage.getItem("timeline_event_categories"));

  let timelineEventCategoryId = timelineCategories.reduce(
    (accumulator, current) => {
      return accumulator.id > current.id ? accumulator : current;
    }
  )["id"];

  timelineCategories.push({
    id: timelineEventCategoryId + 1,
    timelineEvent: timelineEvent,
    category: category,
  });

  localStorage.setItem("timeline_event_categories", JSON.stringify(timelineCategories));
}

export function getTimelineEventCategories(timelineEvent: number) {
  let categories = [];

  JSON.parse(localStorage.getItem("timeline_event_categories")).forEach(function (timelineEventCategory) {
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
  JSON.parse(localStorage.getItem("timeline_event_categories")).forEach(function (timelineEventCategory) {
    if (timelineEventCategory["timelineEvent"] !== timelineEvent) {
      newTimelineEventsCategories = [...newTimelineEventsCategories, timelineEventCategory];
    }
  });
  localStorage.setItem("timeline_event_categories", JSON.stringify(newTimelineEventsCategories));
}

export function deleteByCategory(category: number) {
  let newTimelineEventsCategories = [];
  JSON.parse(localStorage.getItem("timeline_event_categories")).forEach(function (timelineEventCategory) {
    if (timelineEventCategory["category"] !== category) {
      newTimelineEventsCategories = [...newTimelineEventsCategories, timelineEventCategory];
    }
  });
  localStorage.setItem("timeline_event_categories", JSON.stringify(newTimelineEventsCategories));
}
