// let data: [20, 10];
// var myBarChart = new Chart(ctx, {
//   type: "bar",
//   data: data,
//   // options: options,
// });
let btnSend = document.querySelector("#btnSend");

let userObject = {
  Reading: 0,
  Laziness: 0,
  Relax: 0,
  Sleeping: 0,
  Working: 0,
  Studing_ENG: 0,
  Studing_JS: 0,
  Watching_FILMS: 0,
  Walking: 0,
};

const convertationTime = (minutes) => Math.floor((minutes / 60) * 100) / 100;

const drawHorBarDiagram = (category, amount, arrOpt) => {
  var ctx = document.getElementById("diagramHorBar").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "horizontalBar",

    // The data for our dataset
    data: {
      labels: Object.keys(userObject),
      datasets: [
        {
          label: ["Подпись сверху"],
          barPercentage: 1.2, // ширина линий
          backgroundColor: [
            "rgb(255, 99, 132,0.3)",
            "rgba(255, 99, 132, 0.3)",
            "rgba(54, 162, 235, 0.3)",
            "rgba(255, 206, 86, 0.3)",
            "rgba(75, 192, 192, 0.3)",
            "rgba(153, 102, 255, 0.3)",
            "rgba(255, 159, 64, 0.3)",
            "rgba(9, 129, 45, 0.3)",
            "rgba(15, 0, 100, 0.3)",
          ],
          hoverBackgroundColor: [],
          borderColor: [
            "rgb(255, 99, 132,1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(9, 129, 45, 1)",
            "rgba(15, 0, 100, 1)",
          ],
          data: [0, 10, 5, 2, 20, 30, 45, 20, 30], // Здесь нужно будет указывать вычисления суммы часов
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

const drawLineDiagram = () => {
  let ctx = document.getElementById("diagramLinear").getContext("2d");
  let speedData = {
    labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"], // дата
    datasets: [
      {
        label: "Car Speed",
        data: [0, 59, 75, 20, 20, 55, 40], // часы (по дням)
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
  };
  let lineChart = new Chart(ctx, {
    type: "line",
    data: speedData,
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

    userObject[valueSelectedItem] += hours;

    drawHorBarDiagram(valueSelectedItem, hours);

    drawLineDiagram(valueSelectedItem, hours);

    console.log(userObject);
    form.reset();
  }
});
