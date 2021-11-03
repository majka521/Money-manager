import { faShoppingBasket, faPizzaSlice, faWallet, faPlaneDeparture, faBusAlt, faCar, faHome, faGraduationCap, faGift } from "@fortawesome/free-solid-svg-icons";

const categories = [
  { category: "groceries", icon: faShoppingBasket, title: "Zakupy spożywcze" },
  { category: "eatingOut", icon: faPizzaSlice, title: "Jedzenie na mieście" },
  { category: "bills", icon: faWallet, title: "Rachunki" },
  { category: "travel", icon: faPlaneDeparture, title: "Podróże" },
  { category: "transport", icon: faBusAlt, title: "Transport" },
  { category: "car", icon: faCar, title: "Samochód" },
  { category: "home", icon: faHome, title: "Dom" },
  { category: "education", icon: faGraduationCap, title: "Edukacja" },
  { category: "gifts", icon: faGift, title: "Prezenty" },
];

export default categories;
