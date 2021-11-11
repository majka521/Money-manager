import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColor, getIcon } from "./data/categories";

export const SingleTransaction = ({ dataID, dataCategory, dataCategoryTitle, dataCost, dataDescription, data, setActiveCategory, editModeID, setEditMode }) => {
  // Edit transaction button
  const handleEditTransaction = (e, data) => {
    e.preventDefault();
    setEditMode(data);
  };
  // Set SingleStatistic currently title
  setActiveCategory(dataCategoryTitle);

  return (
    <li className={`history__li ${editModeID === dataID ? "history__editing" : ""}`}>
      <a href="/" className={`history__singleTransaction`} onClick={(e) => handleEditTransaction(e, data)}>
        <div className="history__singleTransaction__group">
          <FontAwesomeIcon icon={getIcon(dataCategory)} className="history__singleTransaction__icon" style={{ color: getColor(dataCategory) }} />
          <div>
            <h3>{dataCategoryTitle}</h3>
            <p className="history__singleTransaction__description"> {new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
            <p className="history__singleTransaction__description">{dataDescription}</p>
          </div>
        </div>
        <p className="history__singleTransaction__cost">-{parseFloat(dataCost).toFixed(2)} zł</p>
      </a>
    </li>
  );
};
