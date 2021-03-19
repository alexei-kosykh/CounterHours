let btnSend = document.querySelector("#btnSend");
let dataUserGeneral = {
  Reading: 0,
  Laziness: 0,
  Relax: 0,
  Sleeping: 0,
  Working: 0,
  Studing_ENG: 0,
  Studing_JS: 0,
  Watching_FILMS: 0,
  Walking: 0,
  Playing_Games: 0,
};
let dataUserWithDate = {};

localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));
localStorage.setItem("dataObjectForDate", JSON.stringify(dataUserGeneral));

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
            "rgb(155, 199, 132,0.3)",
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)",
            "rgba(255, 206, 86, 0.3)",
            "rgba(75, 192, 192, 0.3)",
            "rgba(153, 102, 255, 0.3)",
            "rgba(255, 159, 64, 0.3)",
            "rgba(9, 129, 45, 0.3)",
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
    },
  });
};

const createDate = () => {
  return `${new Date().getDate()}.${
    new Date().getMonth() + 1
  }.${new Date().getFullYear()}`;
};

const drawLineDiagram = () => {
  let ctx = document.getElementById("diagramLinear").getContext("2d");
  let daysData = {
    labels: [2, 12, 21, 12, 21, 21, 21], // дата
    datasets: [
      {
        label: "Car Speed",
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
        data: [20, 59, 75, 20, 20, 55, 40], // часы (по дням)
      },
      {
        label: "Car Down",
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
        data: [20, 59, 25, 20, 50, 65, 40], // часы (по дням)
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

    localStorage.setItem("dataUserGeneral", JSON.stringify(dataUserGeneral));

    const dateFull = createDate();
    let objInObject = {};
    // Проверка для второго графика и обнуление нужного параметра
    if (dataUserWithDate[dateFull]) {
      objInObject = dataUserWithDate[dateFull];
      objInObject[valueSelectedItem] += hours + 0;
    } else {
      objInObject = { [valueSelectedItem]: hours };
      dataUserWithDate[dateFull] = objInObject;
    }

    // dataUserWithDate.set([dateFull][valueSelectedItem] += hours);
    // dataUserWithDate[date][valueSelectedItem] += hours;
    // console.log(dataUserWithDate[].valueSelectedItem);
    localStorage.setItem("dateTime", JSON.stringify(dateFull));

    console.log(localStorage);

    drawHorBarDiagram(valueSelectedItem, hours);

    drawLineDiagram(valueSelectedItem, hours);

    console.log(dataUserGeneral);

    form.reset();
  }
});

dataUserGeneral = JSON.parse(window.localStorage.getItem("dataUserGeneral"));
drawHorBarDiagram();
drawLineDiagram();
// window.localStorage.getClear();
