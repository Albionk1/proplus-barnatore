let workerId
const payWorker = document.getElementById('payWorker')
payWorker.addEventListener('click',async()=>{
    try{
      const month = document.getElementById('month-salary').value
      const year = document.getElementById('year').value
      const salary_after_debt = document.getElementById('salary_after_debt').value
      const salary = document.getElementById('salary').value
      const comment = document.getElementById('comment').value

      showLoadingSpinner()
              fetch('/api/v1/wages/pay-worker', {
               method: 'POST',
               body: JSON.stringify({month,year,worker:workerId,salary_after_debt,salary,comment }),
               headers: { 'Content-Type': 'application/json' },
             })
                .then(response => response.json())
                .then(data => {
                  hideLoadingSpinner()
                  console.log(data)
                  if(data.status === 'fail'){
                    const e = document.getElementsByClassName('show-errors-wage')
                    for(var elm of e){
                      elm.textContent=''
                   }
                   if(data.errors){
                    for(var key of Object.keys(data.errors)){
                
                    if(data.errors[key]){
                     const p = document.getElementById(`${key}-wage-error`)
                     if(p){
                     p.textContent = data.errors[key]}
                    }
                  }
                   }
                   if(data.message){
                    showErrorAlert(data.message)
                   }
                  }
                  if(data.status ==='success'){
                    const e = document.getElementsByClassName('show-errors-month')
                    for(var elm of e){
                      elm.textContent=''
                   }
                   const modal = $('#card_worker')
                   modal.modal('hide')
                   workertable.draw()
                   getDetailsWorkers()
                   document.getElementById('salary').value = ''
                   document.getElementById('comment').value = ''
                  }
                })
                .catch(error => console.error(error));
    }
    catch(e){
        console.log(e)
    }
})