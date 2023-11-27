const getDetailsWorkers = async () => {
  try{
    const month = document.getElementById('month-filter').value
    const year = document.getElementById('year1').value
    const unit = document.getElementById('unit').value
    showLoadingSpinner()
            fetch('/api/v1/wages/get-wages-details', {
             method: 'POST',
             body: JSON.stringify({month,year,unit}),
             headers: { 'Content-Type': 'application/json' },
           })
              .then(response => response.json())
              .then(data => {
                hideLoadingSpinner()
                if(data.status === 'fail'){
                  showErrorAlert(data.message)
                }
                if(data.status ==='success'){
                  document.getElementById('show_ungiven_wage').textContent=parseFloat(data.total)
                    document.getElementById('show_total_wage').textContent=parseFloat(data.total)
                    document.getElementById('show_total_regular').textContent=parseFloat(data.total_regular)
                    document.getElementById('show_total_unregular').textContent=parseFloat(data.total_unregular)
                    document.getElementById('show_given_wage').textContent=parseFloat(data.total_given)

                }
              })
              .catch(error => console.error(error));
  }
  catch(e){
      console.log(e)
  }
}
 $("#unit").on("change", function() {
  getDetailsWorkers()
 })

document.addEventListener('DOMContentLoaded', async function (event) {  
  getDetailsWorkers()
 })