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

const categories = [
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze", color: "#FF3200" },
  { category: "alcohol", icon: faWineGlassAlt, title: "Alkohol", color: "#FF8C00" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście", color: "#FFCF00" },
  { category: "health", icon: faHeartbeat, title: "Zdrowie", color: "#FFF700" },
  { category: "bills", icon: faWallet, title: "Rachunki", color: "#D3FF00" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże", color: "#92FF00" },
  { category: "transport", icon: faBusAlt, title: "Transport", color: "#00EE93" },
  { category: "car", icon: faCar, title: "Samochód", color: "#00F9FF" },
  { category: "cosmetics", icon: faShower, title: "Kosmetyki", color: "#00D3FF" },
  { category: "cloths", icon: faTshirt, title: "Ubrania", color: "#0092FF" },
  { category: "home", icon: faHome, title: "Dom", color: "#0038FF" },
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

export default categories;
