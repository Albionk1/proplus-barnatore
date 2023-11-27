const addActionMany = document.getElementById('addActionMany')

addActionMany.addEventListener('submit',async(e)=>{
e.preventDefault()
try {
      
    const price_now_many = document.getElementById('price_now_many').value
    const price_action_many = document.getElementById('price_action_many').value
    const percent_many = document.getElementById('percent_many').value
    const res = await fetch('/api/v1/action/add-action-article', {
      method: 'POST',
      body: JSON.stringify({action:location.pathname.split('/')[3],article:articleId,barcode:articleBarcode,price_now_many,price_action_many,percent:percent_many,price_for:'many' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-action')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){
    if(data.errors[key]){
     const p = document.getElementById(`${key}-action-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
    if(key==='percent'){
      const p = document.getElementById(`percent_many-action-error`)
      if(p){
       p.textContent = data.errors['percent']}
      
     }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-action')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     actiontable.search(document.getElementById('action_table-search').value).draw()
    }
  } catch (err) {
    console.log(err)
  }
})

const addActionFew = document.getElementById('addActionFew')

addActionFew.addEventListener('submit',async(e)=>{
e.preventDefault()
try {
      
    const price_now_few = document.getElementById('price_now_few').value
    const price_action_few = document.getElementById('price_action_few').value
    const percent_few = document.getElementById('percent_few').value
    const res = await fetch('/api/v1/action/add-action-article', {
      method: 'POST',
      body: JSON.stringify({action:location.pathname.split('/')[3],article:articleId,barcode:articleBarcode,price_now_few,price_action_few,percent:percent_few ,price_for:'few'}),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-action')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){
    if(data.errors[key]){
     const p = document.getElementById(`${key}-action-error`)
     if(p){
     p.textContent = data.errors[key]}
    }

    if(key==='percent'){
     const p = document.getElementById(`percent_few-action-error`)
     if(p){
      p.textContent = data.errors['percent']}
     
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-action')
      for(var elm of e){
        elm.textContent=''
     }
     showSuccessAlert(data.message)
     actiontable.search(document.getElementById('action_table-search').value).draw()
    }
  } catch (err) {
    console.log(err)
  }
})


const calcPercentMany = () =>{
  const price_now_many = parseFloat(document.getElementById('price_now_many').value).toFixed(2)
  const price_action_many =  parseFloat(document.getElementById('price_action_many').value).toFixed(2)
  const percent_many =  parseFloat(document.getElementById('percent_many').value).toFixed(2)
  if(isNaN(price_now_many)){
    document.getElementById('price_now_many').value = articlePriceMany
    return calcPercentMany()
  }
  if(isNaN(price_action_many)){
    document.getElementById('price_action_many').value = 0
     return calcPercentMany()
  }
  let percent = ((price_now_many - price_action_many) / price_now_many).toFixed(2) * 100
  document.getElementById('percent_many').value = percent
}

const calcDiscountMany = () =>{
  const price_now_many = parseFloat(document.getElementById('price_now_many').value).toFixed(2)
  const price_action_many =  parseFloat(document.getElementById('price_action_many').value).toFixed(2)
  const percent_many =  parseFloat(document.getElementById('percent_many').value).toFixed(2)
  if(isNaN(price_now_many)){
    document.getElementById('price_now_many').value = articlePriceMany
    return calcDiscounttMany()
  }
  if(isNaN(percent_many)){
    document.getElementById('percent_many').value = 0
     return calcDiscounttMany()
  }
  let percent = price_now_many - (price_now_many *percent_many/100 )
  document.getElementById('price_action_many').value = percent
}
document.getElementById('price_action_many').addEventListener('input',calcPercentMany)
document.getElementById('percent_many').addEventListener('input',calcDiscountMany)

const calcPercentFew = () =>{
  const price_now_few = parseFloat(document.getElementById('price_now_few').value).toFixed(2)
  const price_action_few =  parseFloat(document.getElementById('price_action_few').value).toFixed(2)
  const percent_few =  parseFloat(document.getElementById('percent_few').value).toFixed(2)
  if(isNaN(price_now_few)){
    document.getElementById('price_now_few').value = articlePriceFew
    return calcPercentFew()
  }
  if(isNaN(price_action_few)){
    document.getElementById('price_action_few').value = 0
     return calcPercentFew()
  }
  let percent = ((price_now_few - price_action_few) / price_now_few).toFixed(2) * 100
  document.getElementById('percent_few').value = percent
}

const calcDiscountFew = () =>{
  const price_now_few = parseFloat(document.getElementById('price_now_few').value).toFixed(2)
  const price_action_few =  parseFloat(document.getElementById('price_action_few').value).toFixed(2)
  const percent_few =  parseFloat(document.getElementById('percent_few').value).toFixed(2)
  if(isNaN(price_now_few)){
    document.getElementById('price_now_few').value = articlePriceFew
    return calcDiscountFew()
  }
  if(isNaN(percent_few)){
    document.getElementById('percent_few').value = 0
     return calcDiscountFew()
  }
  let percent = price_now_few - (price_now_few *percent_few/100 )
  document.getElementById('price_action_few').value = percent
}
document.getElementById('price_action_few').addEventListener('input',calcPercentFew)
document.getElementById('percent_few').addEventListener('input',calcDiscountFew)