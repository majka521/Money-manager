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
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze", color: "#E8BABA" },
  { category: "alcohol", icon: faWineGlassAlt, title: "Alkohol", color: "#E4BDAF" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście", color: "#E3CDAB" },
  { category: "health", icon: faHeartbeat, title: "Zdrowie", color: "#E2DEA7" },
  { category: "bills", icon: faWallet, title: "Rachunki", color: "#C9E2A7" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże", color: "#A3E0A7" },
  { category: "transport", icon: faBusAlt, title: "Transport", color: "#A3E0C7" },
  { category: "car", icon: faCar, title: "Samochód", color: "#9FDDDF" },
  { category: "cosmetics", icon: faShower, title: "Kosmetyki", color: "#9FCCDF" },
  { category: "cloths", icon: faTshirt, title: "Ubrania", color: "#A3C0E0" },
  { category: "home", icon: faHome, title: "Dom", color: "#9FADDF" },
  { category: "sport", icon: faVolleyballBall, title: "Sport", color: "#A99FDF" },
  { category: "education", icon: faGraduationCap, title: "Edukacja", color: "#C09FDF" },
  { category: "events", icon: faTicketAlt, title: "Wydarzenia", color: "#CFA3E0" },
  { category: "gifts", icon: faGift, title: "Prezenty", color: "#DAA3E0" },
  { category: "other", icon: faCoins, title: "Inne", color: "#E4AFDA" },
];

export const getIcon = (cat) => {
  return categories.filter((el) => {
    return el.category === cat;
  })[0].icon;
};

export default categories;
