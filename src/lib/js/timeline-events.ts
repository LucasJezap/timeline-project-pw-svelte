import {
  deleteByEvent,
  addTimelineEventCategory,
  getTimelineEventCategories,
} from "./timeline-events-categories";
import { getUserSettings } from "./user-settings";
import { getCategoryByName } from "./categories";

export var timelineEvents = [
  {
    id: 1,
    user: 1,
    title: "Dziwne ścieżki życia",
    description:
      "Silva (Pedro Pascal) wyrusza konno przez pustynię w odwiedziny do znajomego szeryfa Jake'a (Ethan Hawke). Dwadzieścia pięć lat wcześniej zarówno szeryf, jak i Silva pracowali razem jako najemnicy. Silva odwiedza go, aby powspominać stare dzieje i tego wieczoru świętują swoje spotkanie. Po wspólnie spędzonej  nocy Jake zdaje sobie sprawę, że powodem odwiedzin Silvy nie są wspomnienia  ich starej znajomości. To zupełnie inny powód, który poznamy w kinach 17 listopada 2023r.",
    start: new Date("2023-11-17 00:00:00Z"),
    end: new Date("2023-11-30 00:00:00Z"),
    image: "images/1.webp",
  },
  {
    id: 2,
    user: 1,
    title: "Kajtek Czarodziej",
    description:
      "Kajtek, nastoletni chłopiec o wyjątkowo krnąbrnym usposobieniu, wychowuje się z tatą i babcią. Klasowy psotnik pewnego dnia odkrywa w sobie nadnaturalne umiejętności. Czarodziejskie moce przejmują kontrolę nad życiem Kajtka, któ­ry od teraz rozprawia się zarówno z nielubianymi nauczycielami, jak i całą szkolną społecznością, zdobywając sympatię i sławę wśród rówieśników. Sytuacja zaczyna się komplikować, gdy o obdarzo­nego magicznymi zdolnościami chłopca zaczynają rywalizować siły dobra i zła. W którą stronę pójdzie młody czarodziej?",
    start: new Date("2023-11-03 00:00:00Z"),
    end: new Date("2023-11-20 00:00:00Z"),
    image: "images/2.webp",
  },
  {
    id: 3,
    user: 1,
    title: "Życzenie",
    description:
      "Życzenie - animowana komedia muzyczna od Walt Disney Animation Studios zaprasza widzów do magicznego królestwa Rosas, którego władca posiada moc spełniania życzeń. Młoda dziewczyna Asha wypowiada życzenie tak potężne, że odpowiada na nie kosmiczna siła - gwiazdka o ogromnej mocy. Asha, jej wierny towarzysz koziołek Valentino i gwiazdka wspólnie stawiają czoła najgroźniejszemu wrogowi - władcy Rosas, królowi Magnifiko. Czy ocalą swoją społeczność i udowodnią, że kiedy wola jednego odważnego człowieka łączy się z magią gwiazd mogą wydarzyć się cudowne rzeczy.",
    start: new Date("2023-11-22 00:00:00Z"),
    end: new Date("2023-12-06 00:00:00Z"),
    image: "images/3.webp",
  },
  {
    id: 4,
    user: 1,
    title: "Napoleon",
    description:
      "Napoleon to przepełniony widowiskową akcją epicki obraz, który szczegółowo opisuje wzlot upadek kultowego francuskiego cesarza Napoleona Bonaparte, granego przez zdobywcę Oscara® Joaquina Phoenixa. Wyreżyserowany przez legendarnego reżysera Ridleya Scotta,  film przedstawia nieustępliwą podróż Bonapartego do władzy przez pryzmat jego  uzależniającego, niestabilnego związku z jego jedyną prawdziwą miłością, Józefiną, ukazując  jego wizjonerską taktykę wojskową i polityczną w połączeniu z jednymi z najbardziej  dynamicznych sekwencji bitew, jakie kiedykolwiek nakręcono.",
    start: new Date("2023-11-24 00:00:00Z"),
    end: new Date("2023-12-17 00:00:00Z"),
    image: "images/4.webp",
  },
  {
    id: 5,
    user: 1,
    title: "Trolle 3",
    description:
      "Po dwóch filmach prawdziwej przyjaźni i flirtowania, Poppy i Mruk są teraz oficjalnie parą! Poppy odkrywa, że Mruk ma sekretną przeszłość. Był kiedyś częścią fenomenalnego boysbandu, BroZone, wraz ze swoimi czterema braćmi: Floydem, Johnem Dory, Sprucem i Clayem. BroZone rozpadł się, a Mruk od tamtej pory nie widział swoich braci. Mruk i Poppy wyruszają w pełną emocji podróż, aby zjednoczyć braci.",
    start: new Date("2023-12-01 00:00:00Z"),
    end: new Date("2023-12-31 00:00:00Z"),
    image: "images/5.webp",
  },
  {
    id: 6,
    user: 1,
    title: "How to have sex",
    description:
      "Trzy nastolatki wyruszają na wakacje pełne alkoholu, klubów i seksu.",
    start: new Date("2023-12-24 00:00:00Z"),
    end: new Date("2024-01-11 00:00:00Z"),
    image: "images/6.webp",
  },
  {
    id: 7,
    user: 1,
    title: "Diuna: część druga",
    description:
      "Książę Paul Atryda przyjmuje przydomek Muad'Dib i rozpoczyna duchowo-fizyczną podróż, by stać się przepowiedzianym w proroctwie wyzwolicielem ludu Diuny.",
    start: new Date("2024-03-15 00:00:00Z"),
    end: new Date("2024-04-15 00:00:00Z"),
    image: "images/7.webp",
  },
  {
    id: 8,
    user: 1,
    title: "Aquaman i zaginione królestwo",
    description:
      "Jeden król poprowadzi wszystkich. AQUAMAN I ZAGINIONE KRÓLESTWO w kinach od 21 grudnia #Aquaman Reżyser James Wan i sam Aquaman - Jason Momoa – oraz Patrick Wilson, Amber Heard, Yahya Abdul-Mateen II i Nicole Kidman powracają w sequelu najbardziej kasowego filmu DC wszech czasów pt. Aquaman i zaginione królestwo. Poprzednio Czarna Manta nie zdołał pokonać Aquamana. Wciąż jednak pragnie pomścić śmierć ojca i dlatego nie cofnie się przed niczym, żeby rozprawić się z Aquamanem raz na zawsze.",
    start: new Date("2023-12-21 00:00:00Z"),
    end: new Date("2024-01-17 00:00:00Z"),
    image: "images/8.webp",
  },
  {
    id: 9,
    user: 1,
    title: "Inspektor Pająk",
    description:
      "Wsiadając na pokład luksusowego samolotu Inspektor Pająk spodziewał się odpoczynku w miłym towarzystwie. Niestety wśród pasażerów znajduje się tajemniczy złoczyńca. To za jego sprawą w niepokojących okolicznościach znikają kolejni podróżni. Najlepszy śledczy na świecie wkracza do akcji i rozpoczyna śledztwo. Podejrzanych jest wielu, a tropy plączą się jak nitki pajęczej sieci. Wszystko wskazuje na to, że ktoś wciąga Inspektora w niebezpieczną intrygę, by wyrównać z nim dawne rachunki. Trudno będzie mu odnaleźć czarny charakter wśród tak kolorowej gromady, ale na jego szczęście, owady zostawiają ślady!",
    start: new Date("2023-11-10 00:00:00Z"),
    end: new Date("2023-11-30 00:00:00Z"),
    image: "images/9.webp",
  },
];

export function initEvents(force) {
  if (!localStorage.getItem("timeline_events") || force) {
    localStorage.setItem("timeline_events", JSON.stringify(timelineEvents));
  }
  if (!localStorage.getItem("sort_by") || force) {
    localStorage.setItem("sort_by", "start asc");
  }
}

export function getAllEvents() {
  let events = JSON.parse(localStorage.getItem("timeline_events"));

  events.forEach(ev => {
    ev["start"] = new Date(ev["start"]);
    ev["end"] = new Date(ev["end"]);
  });

  return events;
}


export function addEvent(
  user: number,
  title: string,
  description: string,
  categories: string,
  start: Date,
  end: Date
) {
  let events = getAllEvents();

  let timelineEventId = events.reduce((accumulator, current) => {
    return accumulator.id > current.id ? accumulator : current;
  })["id"];

  events.push({
    id: timelineEventId + 1,
    user: user,
    title: title,
    description: description,
    start: new Date(start),
    end: new Date(end),
    image: "",
  });

  if (categories !== "") {
    JSON.parse(categories).forEach((category) => {
      let cat = getCategoryByName(category);

      if (cat !== undefined) {
        addTimelineEventCategory(timelineEventId, cat["id"]);
      }
    });
  }

  localStorage.setItem("timeline_events", JSON.stringify(events));

  return timelineEventId+1;
}

export function getEvent(eventId: number) {
  let event;

  getAllEvents().forEach(function (ev) {
    if (ev["id"] === eventId) {
      event = ev;
    }
  });

  return event;
}

export function saveEvent(
  eventId: number,
  title: string,
  description: string,
  categories: string,
  start: Date,
  end: Date
) {
  let events = getAllEvents();

  events.forEach(function (ev) {
    if (ev["id"] === eventId) {
      ev.title = title;
      ev.description = description;
      ev.start = start;
      ev.end = end;

      if (categories !== "") {
        deleteByEvent(ev["id"]);
        JSON.parse(categories).forEach((category) => {
          let cat = getCategoryByName(category);

          if (cat !== undefined) {
            addTimelineEventCategory(ev["id"], cat["id"]);
          }
        });
      }
    }
  });

  localStorage.setItem("timeline_events", JSON.stringify(events));
}

export function deleteEvent(eventId: number) {
  let events = getAllEvents();

  events.forEach(function (ev, idx) {
    if (ev["id"] === eventId) {
      events.splice(idx, 1);
      deleteByEvent(ev["id"]);
    }
  });

  localStorage.setItem("timeline_events", JSON.stringify(events));
}

export function uploadEventImage(eventId: number, image: string) {
  let events = getAllEvents();

  events.forEach(function (ev) {
    if (ev["id"] === eventId) {
      ev.image = image;
    }
  });

  localStorage.setItem("timeline_events", JSON.stringify(events));
}

export function getFilteredEvents(filters) {
  let filteredEvents = [];

  getAllEvents().forEach(function (ev) {
    let isFilteredOut = false;

    for (const [key, value] of Object.entries(filters)) {
      if (value === "" || value === undefined || value === null) {
        continue;
      }

      if (
        (key === "title" || key === "description") &&
        !ev[key].includes(String(value))
      ) {
        isFilteredOut = true;
      }

      if (key === "from" && ev["end"] < new Date(String(value))) {
        isFilteredOut = true;
      }

      if (key === "to" && ev["start"] > new Date(String(value))) {
        isFilteredOut = true;
      }

      if (key === "category" && value !== "") {
        const evCategories = getTimelineEventCategories(ev["id"]);
        let evCategoriesNames = [];
        evCategories.forEach(category => {
          evCategoriesNames = [...evCategoriesNames, category["name"]];
        });

        let toFilterOut = true;

        JSON.parse(String(value)).forEach((category) => {

          if (evCategoriesNames.includes(category)) {
            toFilterOut = false;
          }
        });

        if (toFilterOut) {
          isFilteredOut = true;
        }
      }
    }

    if (!isFilteredOut) {
      filteredEvents = [...filteredEvents, ev];
    }
  });

  return filteredEvents;
}

export function getUpcomingEvents(userId: number) {
  let userSettings = getUserSettings(userId);
  let now = Date.now();
  let from = now - 1000 * 3600 * 24 * userSettings["notificationDaysBefore"];
  let to = now + 1000 * 3600 * 24 * userSettings["notificationDaysAfter"];

  let upcomingEvents = [];

  getAllEvents().forEach(function (ev) {
    let t = ev["start"].getTime();
    if (t >= from && t <= to) {
      upcomingEvents = [...upcomingEvents, ev];
    }
  });

  return upcomingEvents;
}
