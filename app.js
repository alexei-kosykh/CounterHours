// let data: [20, 10];
// var myBarChart = new Chart(ctx, {
//   type: "bar",
//   data: data,
//   // options: options,
// });
let btnSend = document.querySelector("#btnSend");

const drawDiagram = (category, amount) => {
  var ctx = document.getElementById("diagramLinear").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "horizontalBar",

    // The data for our dataset
    data: {
      labels: [
        "Reading",
        "Laziness",
        "Relax",
        "Sleeping",
        "Working",
        "Studing_ENG",
        "Studing_JS",
        "Watching_FILMS",
        "Walking",
      ],
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

btnSend.addEventListener("click" || "keyup", (event) => {
  event.preventDefault();
  if (event.code === "Enter" || event.type === "click") {
    let form = document.querySelector("#generalForm");
    let minutes = form.querySelector("#minutes").value;
    let select = form.querySelector("#selectItem"); // выбрали select
    let selectedItem = select.selectedIndex; // нашли выбранный индекс option (число в последовательности option)
    let optionItem = select.options; // Получили option

    let opt = [optionItem[select].value];
    console.log(opt);
    let valueSelectedItem = optionItem[selectedItem].value;
    console.log(valueSelectedItem, minutes);

    drawDiagram(valueSelectedItem, minutes);

    form.reset();
  }
});
