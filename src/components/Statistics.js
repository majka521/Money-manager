import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getColor, getIcon } from "./data/categories";

export const Statistics = ({ database, statisticMode, setStatisticMode, setSingleStatistic, currentlyDateStart, currentlyDateEnd }) => {
  //New array with unique categories (one each, no repetitions)
  //const uniqueDatabase = {};
  // database.forEach(({ category, cost, categoryTitle }) => {
  //   // If we already have this category - add the sum
  //   if (category in uniqueDatabase) {
  //     uniqueDatabase[category].sum += parseFloat(cost);
  //     uniqueDatabase[category].quantity++;
  //     // If we don't have this category - make an object
  //   } else {
  //     uniqueDatabase[category] = {
  //       categoryTitle,
  //       category,
  //       sum: parseFloat(cost),
  //       quantity: 1,
  //     };
  //   }
  // });
  
  const uniqueDatabase = database.reduce((prevObj, currObj) => {
    const { category, cost, categoryTitle } = currObj;
    if (category in prevObj) {
      prevObj[category].sum += parseFloat(cost);
      prevObj[category].quantity = prevObj[category].quantity + 1;
      // wazne - zawsze zwracaj
      return prevObj;
    } else {
      return { ...prevObj, [category]: {
        categoryTitle,
              category,
              sum: parseFloat(cost),
              quantity: 1,
      }}
    }
  }, {});


  // [1,2,3].reduce((acc, curr) => { return  curr % 2 === 0 ? acc + curr : acc }, 0);
 // const uniqueDatabaseArray = Object.values(uniqueDatabase);
  console.log('!!', uniqueDatabase);

  //Sort by Sum
  const sortBySum = (a, b) => {
    return b.sum - a.sum;
  };

 const uniqueDatabaseArray = Object.values(uniqueDatabase).sort(sortBySum);

  //Prepare arrays for chart and total sum of expenses
  // let totalSum = 0;
  // let allSum = [];
  // let allCategoriesTitle = [];
  // let allColors = [];

  // forEach!!
  // uniqueDatabaseArray.map((el) => {
  //   allSum.push(parseFloat(el.sum).toFixed(2));
  //   allCategoriesTitle.push(el.categoryTitle);
  //   allColors.push(getColor(el.category));
  //   return (totalSum += +el.sum);
  // });

  const statisticsData = uniqueDatabaseArray.reduce((accObj, currObj) => ({
    allSum: accObj.allSum.concat(parseFloat(currObj.sum).toFixed(2)),
    allCategoriesTitle: accObj.allCategoriesTitle.concat(currObj.categoryTitle),
    allColors: accObj.allColors.concat(getColor(currObj.category)),
    totalSum: accObj.totalSum + currObj.sum
  }), { allSum: [], allCategoriesTitle: [], allColors: [], totalSum: 0 });

  const { allSum, allCategoriesTitle, allColors, totalSum } = statisticsData;


  // const tablicaDanych = [{name: 'Jurek', plec; "M"}, {name: 'Alicja', plec: "F"}];
  // const wynik = tablicaDanych.filter(el => el.plec === 'F').map(el => el.name)


  //Buttons - choose category for statistics
  const [dataCat, seDataCat] = useState("");
  const handleStatisticsTransaction = (e, data) => {
    e.preventDefault();
    setStatisticMode(data);
    seDataCat(data.category);
  };
  useEffect(() => {
    setSingleStatistic(
      database.filter((el) => {
        return el.category === dataCat;
      })
    );
  }, [database, dataCat, setSingleStatistic]);

  return (
    <section className="statistics section">
      <div className="section__header">
        <h2 className="section__title">Statystyki</h2>
        {!!database.length ? (
          <h1>Ładuję dane...</h1>
        ) : (
          <p className="section__timePeriod">
            {currentlyDateStart} - {currentlyDateEnd}
          </p>
        )}
      </div>
      {database?.length ? (
        <h1>Ładuję dane...</h1>
      ) : (
        <h2>
          Łącznie kwota wydatków: <span className="statistics__sum">-{totalSum.toFixed(2)} zł</span>
        </h2>
      )}

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
                    let percent = (data.parsed * 100) / totalSum;
                   // return data.label + `: ` + data.parsed + "zł - " + (Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(2)) + "%";
                    return `${data.label}:  ${data.parsed} zł - ${(Number.isInteger(percent) ? percent.toFixed(0) : percent.toFixed(2))}%`;
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
                  <p className="history__singleTransaction__cost">-{data.sum.toFixed(2)} zł</p>
                </a>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
