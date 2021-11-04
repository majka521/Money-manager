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
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze" },
  { category: "alcohol", icon: faWineGlassAlt, title: "Alkohol" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście" },
  { category: "health", icon: faHeartbeat, title: "Zdrowie" },
  { category: "bills", icon: faWallet, title: "Rachunki" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże" },
  { category: "transport", icon: faBusAlt, title: "Transport" },
  { category: "car", icon: faCar, title: "Samochód" },
  { category: "cosmetics", icon: faShower, title: "Kosmetyki" },
  { category: "cloths", icon: faTshirt, title: "Ubrania" },
  { category: "home", icon: faHome, title: "Dom" },
  { category: "sport", icon: faVolleyballBall, title: "Sport" },
  { category: "education", icon: faGraduationCap, title: "Edukacja" },
  { category: "events", icon: faTicketAlt, title: "Wydarzenia" },
  { category: "gifts", icon: faGift, title: "Prezenty" },
  { category: "other", icon: faCoins, title: "Inne" },
];

export default categories;
