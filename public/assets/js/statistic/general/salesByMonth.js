
var SalesByMonth = {
   root: null, // add a property to store the am5.Root object
   init: function () {
     !(function () {
       if ('undefined' != typeof am5) {
         var e = document.getElementById('saleByMonth')
         if (e) {
           // dispose of previous am5.Root object
           if (SalesByMonth.root) {
             SalesByMonth.root.dispose();
           }
           
           var t,
             a = function (data) {
               // create new am5.Root object
               (t = am5.Root.new(e)).setThemes([am5themes_Animated.new(t)])
               var a = t.container.children.push(
                 am5xy.XYChart.new(t, {
                   panX: !1,
                   panY: !1,
                   layout: t.verticalLayout,
                 })
               )
               r = a.xAxes.push(
                 am5xy.CategoryAxis.new(t, {
                   categoryField: 'month',
                   renderer: am5xy.AxisRendererX.new(t, {
                     minGridDistance: 30,
                   }),
                   bullet: function (e, t, a) {
                     return am5xy.AxisBullet.new(e, {
                       location: 0.5,
                       sprite: am5.Picture.new(e, {
                         width: 24,
                         height: 24,
                         centerY: am5.p50,
                         centerX: am5.p50,
                         src: a.dataContext.icon,
                       }),
                     })
                   },
                 })
               )
             r.get('renderer').labels.template.setAll({
               paddingTop: 20,
               fontWeight: '400',
               fontSize: 10,
               fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500')),
             }),
               r
                 .get('renderer')
                 .grid.template.setAll({ disabled: !0, strokeOpacity: 0 }),
               r.data.setAll(data)
             var o = a.yAxes.push(
               am5xy.ValueAxis.new(t, {
                 renderer: am5xy.AxisRendererY.new(t, {}),
               })
             )
             o.get('renderer').grid.template.setAll({
               stroke: am5.color(KTUtil.getCssVariableValue('--bs-gray-300')),
               strokeWidth: 1,
               strokeOpacity: 1,
               strokeDasharray: [3],
             }),
               o.get('renderer').labels.template.setAll({
                 fontWeight: '400',
                 fontSize: 10,
                 fill: am5.color(KTUtil.getCssVariableValue('--bs-gray-500')),
               })
             var i = a.series.push(
               am5xy.ColumnSeries.new(t, {
                 xAxis: r,
                 yAxis: o,
                 valueYField: 'profit',
                 categoryXField: 'month',
               })
             )
             i.columns.template.setAll({
               tooltipText: `{categoryX}: {valueY} €`,
               tooltipY: 0,
               strokeOpacity: 0,
               templateField: 'columnSettings',
             }),
               i.columns.template.setAll({
                 strokeOpacity: 0,
                 cornerRadiusBR: 0,
                 cornerRadiusTR: 6,
                 cornerRadiusBL: 0,
                 cornerRadiusTL: 6,
               }),
               i.data.setAll(data),
               i.appear(),
               a.appear(1e3, 100)
 
                // store the new am5.Root object in the object's property
                SalesByMonth.root = t;
               
           }
                 
              
           am5.ready(function () {
               // fetch dynamic data from API or database
               showLoadingSpinner()
               fetch('/api/v1/statistic/get-article-buys-by-month', {
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
                   a(data.data); 
                 })
                 .catch(error => console.error(error));
           }),
             KTThemeMode.on('kt.thememode.change', function () {
               // dispose of am5.Root object when theme changes
               if (SalesByMonth.root) {
                 SalesByMonth.root.dispose();
               }
               a()
             })
         }
       }
     })()
   },
 }





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
  SalesByMonth.init()
 })
 $("#unit").on("change", function() {
  SalesByMonth.init()
 })

document.addEventListener('DOMContentLoaded', async function (event) {  
   SalesByMonth.init()
 })