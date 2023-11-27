const addExpenseButton = document.getElementById('addExpenseButton')

addExpenseButton.addEventListener('click',async(e)=>{
    try{
        const category = document.getElementById('category').value
        const amount = document.getElementById('amount').value
        const comment = document.getElementById('comment').value

        const res = await fetch('/api/v1/sales/add-expense', {
          method: 'POST',
          body: JSON.stringify({category,amount,comment}),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if(data.status === 'fail'){
          const e = document.getElementsByClassName('show-errors-expense')
          for(var elm of e){
            elm.textContent=''
         }
         for(var key of Object.keys(data.errors)){
          if(data.errors[key]){
           const p = document.getElementById(`${key}-error-expense`)
           if(p){
           p.textContent = data.errors[key]}
          }
        }
        }
        if(data.status === 'success'){
          const e = document.getElementsByClassName('show-errors-expense')
          for(var elm of e){
            elm.textContent=''
         }
         showSuccessAlert(data.message)
         expensesTable.draw()
        // $('#expenses').modal('hide')
        }
    }
    catch(e){
       console.log(e)
    }
})