var SalesBuyProfitByMonth = {
  root: null, // add a property to store the am5.Root object
  init: function () {
    !(function () {
      if ('undefined' != typeof am5) {
        var e = document.getElementById('salesSupplyProfitByMonth')
        if (e) {
          // dispose of previous am5.Root object
          if (SalesBuyProfitByMonth.root) {
            SalesBuyProfitByMonth.root.dispose();
          }
          
          am5.ready(function() {

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            var root = am5.Root.new("salesSupplyProfitByMonth");
            
            
            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
              am5themes_Animated.new(root)
            ]);
            
            
            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
              panX: false,
              panY: false,
              wheelX: "panX",
              wheelY: "zoomX",
              layout: root.verticalLayout
            }));
            
            
            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            var legend = chart.children.push(
              am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
              })
            );
            var xRenderer = am5xy.AxisRendererX.new(root, {
              cellStartLocation: 0.1,
              cellEndLocation: 0.9
            })
            
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
              categoryField: "month",
              renderer: xRenderer,
              tooltip: am5.Tooltip.new(root, {})
            }));
            
            xRenderer.grid.template.setAll({
              location: 1
            })
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
              })
            }));

            function makeSeries(name, fieldName) {
              var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "month"
              }));
            
              series.columns.template.setAll({
                tooltipText: "{categoryX}, {name}:{valueY}€",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
              });
            
              series.data.setAll(data1);
            
              // Make stuff animate on load
              // https://www.amcharts.com/docs/v5/concepts/animations/
              series.appear();
            
              series.bullets.push(function() {
                return am5.Bullet.new(root, {
                  locationY: 0,
                  sprite: am5.Label.new(root, {
                    text: "{valueY}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true
                  })
                });
              });
            
              legend.data.push(series);
            }
            let data1 = []
            showLoadingSpinner()
               fetch('/api/v1/statistic/get-sales-buys-profit-by-month', {
                method: 'POST',
                body: JSON.stringify({ unit:document.getElementById('unit').value,year:$("#year").val() }),
                headers: { 'Content-Type': 'application/json' },
              })
                 .then(response => response.json())
                 .then(data => {
                   hideLoadingSpinner()
                   if(data.status == 'fail'){
                     showErrorAlert('Diçka shkoi keq të dhënat nuk mund të shfaqen')
                   }
                   data1=data.data
                   xAxis.data.setAll(data1)
                   makeSeries("Furnizim", "supply");
                   makeSeries("Shitje", "buys");
                  //  makeSeries("Profit", "profit");
                 })
                 .catch(error => console.error(error));
            chart.appear(1000, 100);
            SalesBuyProfitByMonth.root=root
            }); // end am5.ready()
            KTThemeMode.on('kt.thememode.change', function () {
              // dispose of am5.Root object when theme changes
              if (SalesBuyProfitByMonth.root) {
                SalesBuyProfitByMonth.root.dispose();
              }
              a()
            })
        }
      }
    })()
  },
}
yearSelectOutcome.on("change", function() {
  SalesBuyProfitByMonth.init()
 })
 $("#unit").on("change", function() {
  SalesBuyProfitByMonth.init()
 })

document.addEventListener('DOMContentLoaded', async function (event) {  
  SalesBuyProfitByMonth.init()
 })