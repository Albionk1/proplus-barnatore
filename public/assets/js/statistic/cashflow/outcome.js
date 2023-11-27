const outcomeButton = document.getElementById('create_outcome_form_submit_btn')

outcomeButton.addEventListener('click',async(e)=>{
    try{
        showLoadingSpinner()
        fetch('/api/v1/statistic/add-outcome', {
         method: 'POST',
         body: JSON.stringify({ amount:document.getElementById('amount_outcome').value,year:document.getElementById('year').value,unit:document.getElementById('unit').value,category:document.getElementById('category_outcome').value }),
         headers: { 'Content-Type': 'application/json' },
       })
          .then(response => response.json())
          .then(data => {
            hideLoadingSpinner()
            if(data.status == 'fail' && data.errors){
                const e = document.getElementsByClassName('show-outcome-error')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`${key}-outcome-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
            }
            }
          if(data.status ==='success'){
            const e = document.getElementsByClassName('show-outcome-error')
       for(var elm of e){
         elm.textContent=''
      }
      showSuccessAlert(data.message)
      const modal=$('#other_outcome_modal')
      modal.modal('hide')
          }
          
          })
          .catch(error => console.error(error));
    }
    catch(e){
      hideLoadingSpinner()
        console.log(e)
    }
})