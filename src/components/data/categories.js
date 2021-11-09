import {
  faShoppingBasket,
  faPizzaSlice,
  faWallet,
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
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze", color: "#FF4069" },
  { category: "alcohol", icon: faWineGlassAlt, title: "Alkohol", color: "#FF9223" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście", color: "#FFC234" },
  { category: "health", icon: faHeartbeat, title: "Zdrowie", color: "#FFCF00" },
  { category: "bills", icon: faWallet, title: "Rachunki", color: "#a6ff00" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże", color: "rgb(81, 255, 0)" },
  { category: "transport", icon: faBusAlt, title: "Transport", color: "#4BC0C0" },
  { category: "car", icon: faCar, title: "Samochód", color: "#00d9ff" },
  { category: "cosmetics", icon: faShower, title: "Kosmetyki", color: "#059BFF" },
  { category: "cloths", icon: faTshirt, title: "Ubrania", color: "#002fff" },
  { category: "home", icon: faHome, title: "Dom", color: "#ae67ff" },
  { category: "sport", icon: faVolleyballBall, title: "Sport", color: "#8C00FF" },
  { category: "education", icon: faGraduationCap, title: "Edukacja", color: "#CF00FF" },
  { category: "events", icon: faTicketAlt, title: "Wydarzenia", color: "#ED00EA" },
  { category: "gifts", icon: faGift, title: "Prezenty", color: "#EE004F" },
  { category: "other", icon: faCoins, title: "Inne", color: "#87858E" },
];

export const getIcon = (cat) => {
  return categories.filter((el) => {
    return el.category === cat;
  })[0].icon;
};

export const getColor = (cat) => {
  return categories.filter((el) => {
    return el.category === cat;
  })[0].color;
};
