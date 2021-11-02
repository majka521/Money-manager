import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faDollarSign, faCalendarAlt, faPen, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const AddTransaction = () => {
  const handleAddTransaction = () => {
    console.log("klik");
  };
  return (
    <>
      <button className="btn btn-newTransaction" onClick={handleAddTransaction}>
        <FontAwesomeIcon icon={faPlusCircle} />
      </button>
      <section className="newTransaction">
        <div className="container">
          <div>
            <form className="newTransaction__form">
              <h2 className="newTransaction__title">nowa transakcja</h2>
              <button className="btn btn-category">
                Wybierz kategorię <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <div className="newTransaction__label">
                <p>
                  <FontAwesomeIcon icon={faDollarSign} className="newTransaction__icon" />
                </p>
                <input type="number" placeholder={"0"} />
                <p className="newTransaction__currency">zł</p>
              </div>
              <div className="newTransaction__label">
                <p>
                  <FontAwesomeIcon icon={faCalendarAlt} className="newTransaction__icon" />
                </p>
                <input type="text" placeholder={"dzisiaj"} />
              </div>
              <div className="newTransaction__label">
                <p>
                  <FontAwesomeIcon icon={faPen} className="newTransaction__icon" />
                </p>
                <textarea rows="1" type="text" placeholder="miejsce na notatkę" />
              </div>
              <button className="btn btn-addTransaction">dodaj</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
