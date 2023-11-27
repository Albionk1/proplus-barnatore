const analizeStats = ()=>{
    fetch('/api/v1/article/get-article-stock-details', {
        method: 'POST',
        body: JSON.stringify({date: document.getElementById('kt_daterangepicker_1').value,unit: document.getElementById('unit').value}),
        headers: { 'Content-Type': 'application/json' },
      })
         .then(response => response.json())
         .then(data => {
           hideLoadingSpinner()
           if(data.status == 'fail'){
             showErrorAlert('Diçka shkoi gabim të dhënat nuk mund të shfaqen')
           }
           if(data.status == 'success'){
            document.getElementById('supply_total_show').textContent=parseFloat(data.total_cost).toFixed(2) +' €'
      document.getElementById('sell_total_show').textContent=parseFloat(data.total_revenu).toFixed(2) +' €'
      document.getElementById('profit_total_show').textContent=parseFloat(data.total_profit).toFixed(2) +' €'
           }
         })
         .catch(error => console.error(error));
}

$("#kt_daterangepicker_1").on("change", function() {
    analizeStats()
   })
   $("#unit").on("change", function() {
    analizeStats()
   })

   
   document.addEventListener('DOMContentLoaded', async function (event) {  
    analizeStats()
  })