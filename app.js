let btnSend = document.querySelector("#btnSend");
let dataUserGeneral = {
  Reading: 2,
  Laziness: 6,
  Relax: 3,
  Sleeping: 2,
  Working: 4,
  Studing_ENG: 5,
  Studing_JS: 4,
  Watching_FILMS: 2,
  Walking: 7,
  Playing_Games: 10,
};

let dataUserWithDate = {
  "9.3.2021": { Reading: 2, Playing_Games: 3 },
  "10.3.2021": {
    Reading: 2,
    Laziness: 6,
    Relax: 3,
    Sleeping: 2,
    Working: 1,
    Studing_ENG: 5,
    Studing_JS: 4,
    Watching_FILMS: 2,
    Walking: 7,
    Playing_Games: 10,
  },
  "11.3.2021": {
    Reading: 5,
    Laziness: 5,
    Relax: 3,
    Sleeping: 2,
    Working: 1,
    Studing_ENG: 9,
    Studing_JS: 10,
    Watching_FILMS: 1,
    Walking: 4,
    Playing_Games: 11,
  },
  "12.3.2021": { Reading: 2 },
  "13.3.2021": { Watching_FILMS: 2 },
  "15.3.2021": { Reading: 10 },
  "17.3.2021": { Playing_Games: 10 },
};

localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));
localStorage.setItem("dataUserWithDate", JSON.stringify(dataUserWithDate));

const convertationTime = (minutes) => Math.round((minutes / 60) * 100) / 100;

const drawHorBarDiagram = (category, amount, arrOpt) => {
  var ctx = document.getElementById("diagramHorBar").getContext("2d");

  Chart.defaults.global.defaultFontFamily = "Raleway";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = "#000";

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "horizontalBar",

    // The data for our dataset
    data: {
      labels: Object.keys(dataUserGeneral),
      datasets: [
        {
          barPercentage: 1.2, // ширина линий
          backgroundColor: [
            "rgb(203, 67, 53,0.6)",
            "rgb(155, 89, 182,0.6)",
            "rgb(37, 113, 163, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgb(22, 159, 133,0.6)",
            "rgb(214, 137, 16,0.6)",
            "rgb(112, 123, 124,0.6)",
            "rgb(46, 64, 83,0.6)",
            "rgba(15, 0, 100, 0.3)",
          ],
          hoverBackgroundColor: [
            "rgb(155, 199, 142,0.6)",
            "rgba(255, 99, 142, 0.6)",
            "rgba(54, 162, 245, 0.6)",
            "rgba(255, 206, 96, 0.6)",
            "rgba(75, 192, 182, 0.6)",
            "rgba(153, 102, 245, 0.6)",
            "rgba(255, 159, 74, 0.6)",
            "rgba(9, 129, 55, 0.6)",
            "rgba(15, 0, 110, 0.6)",
          ],
          borderColor: [
            "rgb(155, 199, 132,1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(9, 129, 45, 1)",
            "rgba(15, 0, 100, 1)",
          ],
          data: Object.values(dataUserGeneral), // Здесь нужно будет указывать вычисления суммы часов
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "All amount of my hours",
        fontSize: 25,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};

const createDate = () => {
  return `${new Date().getDate()}.${
    new Date().getMonth() + 1
  }.${new Date().getFullYear()}`;
};

const checkArrayWithDate = (date, value, hours) => {
  let objInObject = {};
  // Проверка для второго графика и обнуление нужного параметра
  if (dataUserWithDate[date]) {
    objInObject = dataUserWithDate[date];
    if (!objInObject[value]) {
      objInObject[value] = 0;
    }
    objInObject[value] += hours;
  } else {
    objInObject = { [value]: hours + 0 };
    dataUserWithDate[date] = objInObject;
  }
};

const drawLineDiagram = (value, hours) => {
  let ctx = document.getElementById("diagramLinear").getContext("2d");
  let datesAll = Object.keys(dataUserWithDate);
  console.log(
    Object.values(dataUserWithDate).map(function (item) {
      if (item.Playing_Games) {
        return item.Playing_Games;
      }
      return 0;
    })
  );
  let daysData = {
    labels: datesAll,

    datasets: [
      {
        label: `${Object.keys(dataUserGeneral)[0]}`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Reading) {
            return item.Reading;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[1]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Laziness) {
            return item.Laziness;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[2]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(150,206,180,0.4)",
        borderColor: "rgba(150,206,180,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(150,206,180,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(150,206,180,1)",
        pointHoverBorderColor: "rgba(150,206,180,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Relax) {
            return item.Relax;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[3]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Sleeping) {
            return item.Sleeping;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[4]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Working) {
            return item.Working;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[5]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Studing_ENG) {
            return item.Studing_ENG;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[6]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Studing_JS) {
            return item.Studing_JS;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[7]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Watching_FILMS) {
            return item.Watching_FILMS;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[8]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Walking) {
            return item.Walking;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[9]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,75,192,0.4)",
        borderColor: "rgba(75,72,192,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,72,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackground: "rgba(75, 72,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointRadius: 1,
        pointHitRadius: 10,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Playing_Games) {
            return item.Playing_Games;
          }
          return 0;
        }),
      },
    ],
  };

  let chartOptions = {
    legend: {
      display: true,
      position: "top",
      labels: {
        boxWidth: 80,
        fontColor: "black",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  let lineChart = new Chart(ctx, {
    type: "line",
    data: daysData,
    options: chartOptions,
  });
};

btnSend.addEventListener("click" || "keyup", (event) => {
  event.preventDefault();
  if (event.code === "Enter" || event.type === "click") {
    let form = document.querySelector("#generalForm");

    let minutes = form.querySelector("#minutes").value;
    let hours = convertationTime(minutes);

    let select = form.querySelector("#selectItem"); // выбрали select
    let selectedItem = select.selectedIndex; // нашли выбранный индекс option (число в последовательности option)
    let optionItem = select.options; // Получили option

    let valueSelectedItem = optionItem[selectedItem].innerText;

    dataUserGeneral[valueSelectedItem] += hours;

    const dateFull = createDate();

    checkArrayWithDate(dateFull, valueSelectedItem, hours);

    drawHorBarDiagram(valueSelectedItem, hours);

    drawLineDiagram(valueSelectedItem, hours);

    localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));
    localStorage.setItem("dataUserWithDate", JSON.stringify(dataUserWithDate));

    form.reset();
  }
});

dataUserGeneral = JSON.parse(window.localStorage.getItem("dataUserGeneral"));
dataUserWithDate = JSON.parse(window.localStorage.getItem("dataUserWithDate"));
drawHorBarDiagram();
drawLineDiagram();
// window.localStorage.getClear();
