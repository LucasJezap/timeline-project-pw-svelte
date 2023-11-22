import { deleteByCategory } from "./timeline-events-categories";

export var categories = [
  {
    id: 1,
    name: "Dramat",
    description:
      "Zapożyczone z literatury określenie filmów, których nie da się zakwalifikować do określonych gatunków filmowych. Kwalifikowanie pewnych filmów jako „dramaty” wynika z braku konwencji charakteryzujących kino gatunkowe, a także z właściwości artystycznych danego dzieła. Tradycyjnie dramaty filmowe dzielą się na filmy obyczajowe, społeczne (w tym dramaty sądowe) i psychologiczne. Formą pochodną dramatu jest także melodramat. Określenie „dramat” bywa używane także w połączeniu z nazwą gatunku (na przykład dramat wojenny), co wcale jednak nie musi zmieniać wymowy i dramaturgii danego filmu.",
    color: "#8b4646",
  },
  {
    id: 2,
    name: "Western",
    description:
      "Gatunek filmu fabularnego, powieści awanturniczej albo sztuki scenicznej, obejmujący utwory, których akcja rozgrywa się w okresie kolonizacji i stabilizowania się życia na terenach zachodnich stanów USA, zwanych Dzikim Zachodem. Często miejsce akcji nie jest konkretnym stanem, ale terytorium zorganizowanym – zalążkiem przyszłego stanu. Western jest charakterystyczną formą amerykańską, chociaż był uprawiany również przez twórców rodem z Europy.",
    color: "#d2acac",
  },
  {
    id: 3,
    name: "Przygodowy",
    description:
      "Film o akcji skonstruowanej z ciągu przygód protagonisty, charakteryzujący się szybkim tempem akcji, brawurowymi rozwiązaniami fabularnymi oraz licznymi przeszkodami pokonywanymi przez bohaterów. Schemat filmów przygodowych opiera się na licznych scenach pościgów, ucieczek, eksplozji oraz niebezpiecznych dla protagonisty wydarzeniach.",
    color: "#3a97df",
  },
  {
    id: 4,
    name: "Fantasy",
    description:
      "Gatunek filmowy obejmujący obrazy filmowe, w fabule, których występują motywy związane z magią, nadprzyrodzonością, mitologią, wymyślonym folklorem czy też istnieniem fantastycznych światów",
    color: "#e2c403",
  },
  {
    id: 5,
    name: "Animowany",
    description:
      "Film, w którym ujęcia są realizowane metodą zdjęć poklatkowych rejestrujących pojedyncze kadry z fazami akcji filmowej, w przeciwieństwie do filmu fabularnego (aktorskiego) i dokumentalnego, gdzie ujęcia są rejestrowane w kamerze w sposób ciągły. Film realizowany jedną z technik animacyjnych wykreowanych w historii artystycznej animacji, wśród których są: rysunkowa, lalkowa (stop-motion), wycinankowa, plastelinowa, pikselacja, pinscreen, poklatkowe łączenie obrazów z wielu kamer, rysowanie odręczne na klatkach filmu, techniki specjalne wykonywane metodą klatka po klatce.",
    color: "#19e50b",
  },
  {
    id: 6,
    name: "Familijny",
    description:
      "Gatunek filmowy, który zawiera treści dotyczące świata dzieci lub odnosi się do nich w kontekście domu i rodziny. Film familijny jako gatunek skierowany jest przede wszystkim do dzieci, jak również dla szerokiej publiczności[1][2]. Filmy familijne realizowane są według zróżnicowanej formy gatunku filmowego (m.in. fantasy, animacja, realizm, wojenne, muzyczne oraz jako adaptacje literatury).",
    color: "#ea0606",
  },
  {
    id: 7,
    name: "Komedia",
    description:
      "Film przedstawiający sytuacje i postacie wywołujące u widzów efekt komiczny. Komedia istnieje od zarania dziejów sztuki filmowej – za pierwszy film komediowy uchodzi Polewacz polany (1895) autorstwa braci Lumière. Komedii nie cechuje określona konwencja fabularna, ale efekt, jaki wywołują one w widzu.",
    color: "#e907e1",
  },
  {
    id: 8,
    name: "Sci-fi",
    description:
      "Gatunek literacki, filmowy oraz gier komputerowych o fabule osnutej na przewidywanych osiągnięciach nauki i techniki oraz ukazującej ich wpływ na życie jednostki lub społeczeństwa[1][2]. W świecie przedstawionym utworów nie występują elementy cudowności, a także przestrzega się zasad prawdopodobieństwa[1]. Razem z fantasy i horrorem, fantastyka naukowa zaliczana jest do fantastyki.",
    color: "#0fe6bb",
  },
  {
    id: 9,
    name: "Akcja",
    description:
      "Film sensacyjny, którego głównym zadaniem jest dostarczanie rozrywki widzom poprzez pokazywanie pościgów samochodowych, strzelanin, bijatyk i innych scen kaskaderskich o dużym ładunku napięcia i emocji. Film akcji jest często łączony z innymi gatunkami takimi jak: fantastyka naukowa (Terminator, Matrix), horror (Blade: Wieczny łowca) czy komedia (Zabójcza broń).",
    color: "#1a1a1a",
  },
];

var categoryId = categories.length;

export function addCategory(name: string, description: string, color: string) {
  categoryId += 1;

  categories.push({
    id: categoryId,
    name: name,
    description: description,
    color: color,
  });

  return categoryId;
}

export function getCategory(categoryId: number) {
  let category;

  categories.forEach(function (cat) {
    if (cat["id"] === categoryId) {
      category = cat;
    }
  });

  return category;
}

export function getCategoryByName(categoryName: string) {
  let category;

  categories.forEach(function (cat) {
    if (cat["name"] === categoryName) {
      category = cat;
    }
  });

  return category;
}

export function saveCategory(
  categoryId: number,
  name: string,
  description: string,
  color: string
) {
  categories.forEach(function (cat) {
    if (cat["id"] === categoryId) {
      cat.name = name;
      cat.description = description;
      cat.color = color;
    }
  });
}

export function deleteCategory(categoryId: number) {
  categories.forEach(function (cat, idx) {
    if (cat["id"] === categoryId) {
      categories.splice(idx, 1);
      deleteByCategory(cat["id"]);
    }
  });
}
