import React from "react";
import { Doughnut } from "react-chartjs-2";
import { getColor } from "./data/categories";

export const Statistics = ({ database }) => {
  let sum = 0;
  let allCosts = [];
  let allCategoriesTitle = [];
  let allColors = [];

  //nowy obiekt, for Each, {groceries: {title: "Zakupy spozywcze" cost:10} jesli istnieje to += jesli nie to nowy}

  database.map((el) => {
    sum += +el.cost;
    allCosts.push(el.cost);
    allCategoriesTitle.push(el.categoryTitle);
    allColors.push(getColor(el.category));
  });

  return (
    <section className="statistics section">
      <div className="section__header">
        <h2 className="section__title">Statystyki</h2>
        <p className="section__timePeriod">tu będą daty z okresu czasu</p>
      </div>
      <h2>
        Łącznie kwota wydatków: <span className="statistics__sum">-{sum.toFixed(2)}</span>
      </h2>
      <Doughnut
        data={{
          labels: allCategoriesTitle,
          datasets: [
            {
              label: "Expenses",
              data: allCosts,
              backgroundColor: allColors,
            },
          ],
        }}
      />
    </section>
  );
};
