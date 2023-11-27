const addCategoryName = document.getElementById('addCategoryName')

addCategoryName.addEventListener('click',async(e)=>{
    try{
        const name = document.getElementById('category-name').value
        const res = await fetch('/api/v1/sales/add-expense-category', {
          method: 'POST',
          body: JSON.stringify({name}),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if(data.status === 'fail'){
         document.getElementById('name-error-category').textContent=data.message
        }
        if(data.status === 'success'){
         document.getElementById('name-error-category').textContent=''
         showSuccessAlert(data.message)
         const newOption1 = $('<option>', {
            value: data.id,
            text: name
          });
          $('#category').append(newOption1)
          $('#category').trigger('change.select2')
        $('#add-category-expenses').modal('hide')
         document.getElementById('category-name').value = ''

        }
    }
    catch(e){
       console.log(e)
    }
})