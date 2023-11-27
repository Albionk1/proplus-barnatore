const yearSelectOutcome = $("#year");
 const currentYear = new Date().getFullYear();
 for (let year = currentYear; year >= 2023; year--) {
  const option = new Option(year, year);
 
  if (year === currentYear) {
    option.setAttribute("selected", "selected");
  }
 
  yearSelectOutcome.append(option);
 }
 
 yearSelectOutcome.select2();
 
 yearSelectOutcome.on("change", function() {
ownerinvestmentTable.draw()
strategicinvestmentTable.draw()
//   SalesByMonth.init()
 })
 $("#unit").on("change", function() {
//   SalesByMonth.init()
ownerinvestmentTable.draw()
strategicinvestmentTable.draw()
 })

document.addEventListener('DOMContentLoaded', async function (event) {  
//    SalesByMonth.init()
 })
 $(document).ready(() => {
  $('select:not(.normal)').each(function () {
      $(this).select2({
          dropdownParent: $(this).parent()
      });
  });
});
// var options = {
//   series: [],
//   labels: [],
//   legend: {
// fontSize: "12px"
// },
//   chart: {
//       fontFamily: 'inherit',
//       type: 'donut',
//       width: 600,
//   },
//   plotOptions: {
//       pie: {
//           donut: {
//               size: '50%',
//               labels: {
//                   value: {
//                       fontSize: '10px',
//                   },
//               },
//           },
//       },
      
//   },
//   stroke: {
//       width: 0,
//   },
//   responsive: [{
//       breakpoint: 480,
//       options: {
//           chart: {
//               width: 350
//           },
//           legend: {
//               position: 'bottom'
//           }
//       }
//   }]
// };

// var chart = new ApexCharts(document.querySelector("#outcomes_chart"), options);
// chart.render();

// function fetchDataAndRenderChart(chart) {
//   fetch('/api/v1/statistic/company-finance-chart-data',{
//     method: 'Post',
//     body: JSON.stringify({year:document.getElementById('year'),unit:document.getElementById('unit') }),
//     headers: { 'Content-Type': 'application/json' }
//   })
//       .then(function (response) {
//           return response.json();
//       })
//       .then(function (data) {
          
//           const series = data.data.map((el) => el.amount)
//           const labels = data.data.map((el) => el._id)

//           chart.updateSeries(series);
//           chart.updateOptions({ labels });

//       })
//       .catch(function (error) {
//           console.error('Error fetching data:', error);
//       });
// }
// fetchDataAndRenderChart(chart)