
const closeCount = document.getElementById('closeCount')
const startCountShow=document.getElementById('startCount-show')
const total_sells=document.getElementById('total_sells-show')
const amount_expense=document.getElementById('amount_expense-show')
const equalShow=document.getElementById('equal-show')
let closeCounti =0

const getArcDetail = async()=>{
    try{
        const res = await fetch('/api/v1/arc/get-arc-detail-close', {
            method: 'POST',
            body: JSON.stringify({arc:location.pathname.split('/')[3]}),
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json()
          closeCount.value=data.equal
          closeCounti=parseFloat(data.equal).toFixed(2)
          startCountShow.textContent=parseFloat(data.startCount).toFixed(2)+' €'
          total_sells.textContent=data.total_sells+' €'
          amount_expense.textContent=parseFloat(data.amount_expense).toFixed(2)+' €'
          equalShow.textContent=parseFloat(data.equal).toFixed(2)+' €'
          document.getElementById('total_sells-show').textContent=parseFloat(data.total_sells).toFixed(2)+' €'



    }
    catch(e){
        console.log(e)
    }
}

getArcDetail()
const countInp = document.getElementById('count')
const debtInp = document.getElementById('debt')

countInp.addEventListener('input',()=>{
    if(countInp.value===''){
        countInp.value=0
    }
    const counti = parseFloat(countInp.value).toFixed(2)
    debtInp.value = parseFloat(closeCounti -counti).toFixed(2) *-1
})