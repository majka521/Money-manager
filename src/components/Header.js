export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <a href="/" className="logo">
            Money Manager
          </a>
          <nav>
            <button className="btn btn-login">Zaloguj</button>
          </nav>
        </div>
      </div>
    </header>
  );
};
