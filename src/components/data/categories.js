import {
  faShoppingBasket,
  faPizzaSlice,
  faPlaneDeparture,
  faBusAlt,
  faCar,
  faHome,
  faGraduationCap,
  faGift,
  faWineGlassAlt,
  faTshirt,
  faTicketAlt,
  faHeartbeat,
  faShower,
  faVolleyballBall,
  faCoins,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze", color: "#FF4069" },
  { category: "alcohol", icon: faWineGlassAlt, title: "Alkohol", color: "#FF9223" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście", color: "#FFC234" },
  { category: "health", icon: faHeartbeat, title: "Zdrowie", color: "#e1e436 " },
  { category: "bills", icon: faCalculator, title: "Rachunki", color: "rgb(81, 255, 0)" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże", color: "#0AA350" },
  { category: "transport", icon: faBusAlt, title: "Transport", color: "#4BC0C0" },
  { category: "car", icon: faCar, title: "Samochód", color: "#00d9ff" },
  { category: "cosmetics", icon: faShower, title: "Kosmetyki", color: "#059BFF" },
  { category: "cloths", icon: faTshirt, title: "Ubrania", color: "#002fff" },
  { category: "home", icon: faHome, title: "Dom", color: "#693599" },
  { category: "sport", icon: faVolleyballBall, title: "Sport", color: "#8C00FF" },
  { category: "education", icon: faGraduationCap, title: "Edukacja", color: "#CF00FF" },
  { category: "events", icon: faTicketAlt, title: "Wydarzenia", color: "#D90B91" },
  { category: "gifts", icon: faGift, title: "Prezenty", color: "#E31627" },
  { category: "other", icon: faCoins, title: "Inne", color: "#87858E" },
];

// export const getIcon = (cat) => categories.filter((el) => {
//     return el.category === cat;
//   })[0].icon;

export const getIcon = (cat) => {
  return categories.find((el) => {
    return el.category === cat;
  })?.icon;
};

// const obj = { objA: { objC : 'Hello'} };

// obj && obj.objA && obj.objA.objC ? 'Hello' : 'Error';

// obj?.objA?.objC ? 'Hello' : 'Error'

export const getColor = (cat) => {
  return categories.find((el) => {
    return el.category === cat;
  })?.color;
};
