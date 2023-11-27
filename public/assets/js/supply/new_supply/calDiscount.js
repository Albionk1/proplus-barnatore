let products=[]
const calcProfit = ()=>{
    let price = parseFloat(document.getElementById('price').value).toFixed(2)
    // let qty = parseFloat(document.getElementById('qty').value) || 0;
    // qty = Math.max(qty, 0);
    // document.getElementById('qty').value = qty;
    let rab_1 = parseFloat(document.getElementById('rab_1').value)
    document.getElementById('show-rab_1').value=rab_1+'%'
    if(rab_1<0||isNaN(rab_1)){
        document.getElementById('rab_1').value=0
        calcProfit()
        return
    }
    let rab_2 = parseFloat(document.getElementById('rab_2').value)
    document.getElementById('show-rab_2').value=rab_2+'%'
    if(rab_2<0||isNaN(rab_2)){
        document.getElementById('rab_2').value=0
        calcProfit()
        return
    }
    // let price_many = parseFloat(document.getElementById('price_many').value).toFixed(2)
    // document.getElementById('show-price-total').value=parseFloat(qty*articlePrice).toFixed(2)+'€'
// document.getElementById('show-price').value=articlePrice+'€'
    // if(price_many<0){
    //     document.getElementById('price_many').value=0
    //     calcProfit()
    //     return
    // }
    // document.getElementById('show-discount').value=discount

    let priceNew = price



    if(rab_1 && typeof rab_1 ==='number'){
        priceNew = priceNew-((rab_1 / 100)*priceNew).toFixed(2)
    }
    if(rab_2 && typeof rab_2 ==='number'){
        priceNew =priceNew- ((rab_2 / 100)*priceNew).toFixed(2)
    }
    const mazh = document.getElementById('mazh')
    const price_few = document.getElementById('price_few')
    const price_many = document.getElementById('price_many')
    let price_sell =toggleInput.checked ? parseFloat(price_many.value).toFixed(2) : parseFloat(price_few.value).toFixed(2)
    document.getElementById('show-total-price').value=priceNew + ' €'
    priceNew= parseFloat(((price_sell - priceNew) / priceNew) * 100).toFixed(2)
    
    mazh.value=priceNew
    // price.value = priceNew
}

document.getElementById('qty').addEventListener('input',calcProfit)
document.getElementById('price').addEventListener('input',calcProfit)
document.getElementById('rab_1').addEventListener('input',calcProfit)
document.getElementById('rab_2').addEventListener('input',calcProfit)
document.getElementById('price_few').addEventListener('input',calcProfit)
document.getElementById('price_many').addEventListener('input',calcProfit)
const calcProfitByMazh = () => {
    const price_few = document.getElementById('price_few');
    const price_many = document.getElementById('price_many');
    const priceInput = document.getElementById('price');
    const mazhInput = document.getElementById('mazh');
  
    const price = parseFloat(priceInput.value);
    const mazh = parseFloat(mazhInput.value);
  
    if (!isNaN(price)) {
      if (isNaN(mazh)) {
        mazhInput.value = 0;
        calcProfit();
        return;
      }
      let sell_price = price * (1 + mazh/100); 

      sell_price = parseFloat(sell_price.toFixed(2));

      if (toggleInput.checked) {
        price_many.value = sell_price;
      } else {
        price_few.value = sell_price;
      }
    }
  };
document.getElementById('mazh').addEventListener('input',calcProfitByMazh)

$('#toggleInput').change(()=>{
    calcProfit()
})



