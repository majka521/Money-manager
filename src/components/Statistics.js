import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Doughnut } from "react-chartjs-2";
import { getColor, getIcon } from "./data/categories";

export const Statistics = ({ database, statisticMode, setStatisticMode }) => {
  const uniqueDatabase = {};
  database.forEach(({ category, cost, categoryTitle }) => {
    // Jeżeli taki klucz juz mamy to dodaj sume
    if (category in uniqueDatabase) {
      uniqueDatabase[category].sum += parseInt(cost);
      uniqueDatabase[category].quantity++;
      // Jeżeli nie mamy takiego klucza to go zrob i stworz obiekt
    } else {
      uniqueDatabase[category] = {
        categoryTitle,
        category,
        sum: parseInt(cost),
        quantity: 1,
      };
    }
  });
  // Konwersja obiektu na tablice obiektów
  const uniqueDatabaseArray = Object.values(uniqueDatabase);

  let sum = 0;
  let allSum = [];
  let allCategoriesTitle = [];
  let allColors = [];
  uniqueDatabaseArray.map((el) => {
    allSum.push(el.sum);
    allCategoriesTitle.push(el.categoryTitle);
    allColors.push(getColor(el.category));
    return (sum += +el.sum);
  });

  const handleStatisticsTransaction = (e, data) => {
    e.preventDefault();
    // setShowEditTransactionForm(true);
    setStatisticMode(data);
  };

  return (
    <section className="statistics section">
      <div className="section__header">
        <h2 className="section__title">Statystyki</h2>
        <p className="section__timePeriod">tu będą daty z okresu czasu</p>
      </div>
      <h2>
        Łącznie kwota wydatków: <span className="statistics__sum">-{sum.toFixed(2)} zł</span>
      </h2>
      <div className="statistics__doughnut">
        <Doughnut
          data={{
            labels: allCategoriesTitle,
            datasets: [
              {
                data: allSum,
                backgroundColor: allColors,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                usePointStyle: true,
                callbacks: {
                  label: (data) => {
                    let percent = (data.parsed * 100) / sum;
                    return data.label + `: ` + data.parsed + "zł - " + (Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(2)) + "%";
                  },
                },
              },
            },
          }}
        />
      </div>
      <ul>
        {uniqueDatabaseArray
          .sort((a, b) => {
            return b.sum - a.sum;
          })
          .map((data) => {
            return (
              <li key={data.category} className={`history__li ${statisticMode.category === data.category ? "history__editing" : ""} `}>
                <a href="/" className={`history__singleTransaction`} onClick={(e) => handleStatisticsTransaction(e, data)}>
                  <div className="history__singleTransaction__group">
                    <FontAwesomeIcon icon={getIcon(data.category)} className="history__singleTransaction__icon" style={{ color: getColor(data.category) }} />
                    <div>
                      <h3>{data.categoryTitle}</h3>
                      <p className="history__singleTransaction__description">Liczba transakcji: {data.quantity}</p>
                    </div>
                  </div>
                  <p className="history__singleTransaction__cost">-{data.sum} zł</p>
                </a>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
