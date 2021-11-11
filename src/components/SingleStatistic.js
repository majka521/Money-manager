import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const SingleStatistic = () => {
  return (
    <section className="newTransaction section container">
      <div className="section__header">
        <h2 className="section__title">Nazwa kategorii</h2>
        <p className="section__timePeriod">tu będą daty z okresu czasu</p>
      </div>
      <button
        className="btn btn-exit"
        // onClick={handleExitTransaction}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </section>
  );
};
