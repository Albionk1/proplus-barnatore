const form = document.getElementById('form-add-article')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const barcode = document.getElementById('barcode').value
    const name = document.getElementById('name').value
    const tvsh = document.getElementById('tvsh').value
    const sale_type = document.getElementById('sale_type').value
    const min_qty = document.getElementById('min_qty').value
    const price_few = document.getElementById('price_few').value
    const price_many = document.getElementById('price_many').value
    const manufacturer = document.getElementById('manufacturer').value
    const barcode_package = document.getElementById('barcode_package').value
    const code = document.getElementById('code').value
    const group = document.getElementById('group').value
    const subgroup = document.getElementById('subgroup').value
    const zone = document.getElementById('zone').value


    const res = await fetch('/api/v1/article/edit-article', {
      method: 'PATCH',
      body: JSON.stringify({id:location.pathname.split('/')[3],barcode,name,tvsh, sale_type, min_qty,price_few,price_many,manufacturer,barcode_package,code,group,subgroup,zone}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-article')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-article-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-article')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     setTimeout(()=>{
      location.assign('/admin/articles')
     },1000)
    }
  } catch (err) {
    console.log(err)
  }
  })