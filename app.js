let btnSend = document.querySelector("#btnSend");
let dataUserGeneral = {
  Reading: 0,
  Laziness: 0,
  My_projects: 0,
  Sleeping: 0,
  Working: 0,
  Studing_ENG: 0,
  Studing_JS: 0,
  Watching_FILMS: 0,
  Walking: 0,
  Playing_Games: 0,
};

let dataUserWithDate = {};

const saveLocalStorage = () => {
  if (localStorage.getItem("dataUserGeneral")) {
    dataUserGeneral = JSON.parse(
      window.localStorage.getItem("dataUserGeneral")
    );
    dataUserWithDate = JSON.parse(
      window.localStorage.getItem("dataUserWithDate")
    );
  } else {
    localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));
    localStorage.setItem("dataUserWithDate", JSON.stringify(dataUserWithDate));
  }
};

const convertationTime = (minutes) => Math.round((minutes / 60) * 100) / 100;

const drawHorBarDiagram = () => {
  var ctx = document.getElementById("diagramHorBar").getContext("2d");

  Chart.defaults.global.defaultFontFamily = "Raleway";
  Chart.defaults.global.defaultFontSize = 18;
  Chart.defaults.global.defaultFontColor = "#000";

  var chart = new Chart(ctx, {
    type: "horizontalBar",

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
            "rgb(12, 13, 124,0.6)",
            "rgb(186, 74, 1, 0.6)",
            "rgb(46, 64, 83,0.6)",
            "rgba(215, 79, 129, 0.5)",
          ],
          hoverBackgroundColor: [
            "rgb(203, 67, 53,1)",
            "rgb(155, 89, 182,1)",
            "rgb(37, 113, 163, 1)",
            "rgba(255, 206, 86, 1)",
            "rgb(22, 159, 133,1)",
            "rgb(214, 137, 16,1)",
            "rgb(12, 13, 124,1)",
            "rgb(186, 74, 1, 1)",
            "rgb(46, 64, 83,1)",
            "rgba(215, 79, 129, 1)",
          ],
          borderColor: [
            "rgb(203, 67, 53,1)",
            "rgb(155, 89, 182,1)",
            "rgb(37, 113, 163, 1)",
            "rgba(255, 206, 86, 1)",
            "rgb(22, 159, 133,1)",
            "rgb(214, 137, 16,1)",
            "rgb(12, 13, 124,1)",
            "rgb(186, 74, 1, 1)",
            "rgb(46, 64, 83,1)",
            "rgba(215, 79, 129, 1)",
          ],
          data: Object.values(dataUserGeneral),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "All amount of my hours",
        fontSize: 30,
        fontColor: "#fff",
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "#fff",
            },
            gridLines: {
              color: "#fff",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#fff",
              beginAtZero: true,
            },
            gridLines: {
              color: "#fff",
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

const drawLineDiagram = () => {
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
        backgroundColor: "rgb(203, 67, 53,0.1)",
        borderColor: "rgb(203, 67, 53,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(203, 67, 53,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(203, 67, 53,1)",
        pointRadius: 3,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Reading) {
            return item.Reading;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[1]}`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgb(155, 89, 182,0.4)",
        borderColor: "rgb(155, 89, 182,1)",
        borderDash: [20, 5],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(155, 89, 182,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(155, 89, 182,1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(37, 113, 163, 0.4)",
        borderColor: "rgb(37, 113, 163, 1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(37, 113, 163, 1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(37, 113, 163, 1)",
        pointRadius: 3,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.My_projects) {
            return item.My_projects;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[3]}`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(255, 206, 86, 0.4)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(255, 206, 86, 1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgba(255, 206, 86, 1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(22, 159, 133,0.4)",
        borderColor: "rgb(22, 159, 133,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(22, 159, 133,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(22, 159, 133,1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(214, 137, 16,0.4)",
        borderColor: "rgb(214, 137, 16,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(214, 137, 16,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(214, 137, 16,1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(12, 13, 124,0.4)",
        borderColor: "rgb(12, 13, 124,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(12, 13, 124,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(12, 13, 124,1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(186, 74, 1, 0.4)",
        borderColor: "rgb(186, 74, 1, 1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(186, 74, 1, 1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(186, 74, 1, 1)",
        pointRadius: 3,
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
        backgroundColor: "rgb(46, 64, 83,0.4)",
        borderColor: "rgb(46, 64, 83,1)",
        borderDash: [],
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(46, 64, 83,1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgb(46, 64, 83,1)",
        pointRadius: 3,
        data: Object.values(dataUserWithDate).map(function (item) {
          if (item.Walking) {
            return item.Walking;
          }
          return 0;
        }),
      },
      {
        label: `${Object.keys(dataUserGeneral)[9]}`,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(25, 79, 129, 0.2)",
        borderColor: "rgba(215, 79, 129, 1)",
        borderDash: [10, 2],
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(215, 79, 129, 1)",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgba(215, 79, 129, 1)",
        pointRadius: 3,
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
        fontColor: "#fff",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#fff",
          },
          gridLines: {
            color: "#fff",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "#fff",
          },
          gridLines: {
            color: "#fff",
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

    drawHorBarDiagram();

    drawLineDiagram();

    localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));
    localStorage.setItem("dataUserWithDate", JSON.stringify(dataUserWithDate));

    form.reset();
  }
});

saveLocalStorage();
drawHorBarDiagram();
drawLineDiagram();
// window.localStorage.getClear();
