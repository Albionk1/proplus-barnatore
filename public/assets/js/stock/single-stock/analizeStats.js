const analizeStats = ()=>{
    fetch('/api/v1/article/get-analize-stats', {
        method: 'POST',
        body: JSON.stringify({ article: location.pathname.split('/')[3] ,date: document.getElementById('kt_daterangepicker_1').value,unit: document.getElementById('unit_select').value}),
        headers: { 'Content-Type': 'application/json' },
      })
         .then(response => response.json())
         .then(data => {
           hideLoadingSpinner()
           if(data.status == 'fail'){
             showErrorAlert('Diçka shkoi keq të dhënat nuk mund të shfaqen')
           }
           if(data.status == 'success'){
            document.getElementById('buy_total_show').textContent =data.cost+' €'
            document.getElementById('sell_total_tvsh').textContent =data.sales+' €'
            document.getElementById('profit_total_show').textContent =data.profit+' €'

           }
         })
         .catch(error => console.error(error));
}

$("#kt_daterangepicker_1").on("change", function() {
    analizeStats()
   })
   $("#unit_select").on("change", function() {
    analizeStats()
   })

   
   document.addEventListener('DOMContentLoaded', async function (event) {  
    analizeStats()
  })