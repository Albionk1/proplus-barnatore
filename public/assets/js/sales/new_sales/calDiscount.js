const calcDiscount = ()=>{
    let price_many = parseFloat(document.getElementById('price_many').value).toFixed(2)
    let qty = parseInt(document.getElementById('qty').value)
    document.getElementById('show-qty').value=qty
    if(qty<1){
        document.getElementById('qty').value=1
        calcDiscount()
        return
    }
    let rab_1 = parseFloat(document.getElementById('rab_1').value)
    document.getElementById('show-rab_1').value=rab_1+'%'
    if(rab_1<0){
        document.getElementById('rab_1').value=0
        calcDiscount()
        return
    }
    let rab_2 = parseFloat(document.getElementById('rab_2').value)
    document.getElementById('show-rab_2').value=rab_2+'%'
    if(qty<0){
        document.getElementById('rab_2').value=0
        calcDiscount()
        return
    }
    let total_price = document.getElementById('total_price')
    let discount = parseFloat(document.getElementById('discountInput').value).toFixed(2)
    document.getElementById('show-price-total').value=parseFloat(qty*articlePrice).toFixed(2)+'€'
document.getElementById('show-price').value=articlePrice+'€'
    if(discount<0){
        document.getElementById('discountInput').value=0
        calcDiscount()
        return
    }
    document.getElementById('show-discount').value=discount

    let priceNew = (qty*price_many)
    priceNew = (priceNew -discount).toFixed(2)



    if(rab_1 && typeof rab_1 ==='number'){
        priceNew = priceNew-((rab_1 / 100)*priceNew).toFixed(2)
    }
    if(rab_2 && typeof rab_2 ==='number'){
        priceNew =priceNew- ((rab_2 / 100)*priceNew).toFixed(2)
    }
    total_price.value = priceNew
    document.getElementById('show-total-price').value=priceNew + ' €'
}

document.getElementById('qty').addEventListener('input',calcDiscount)
document.getElementById('discountInput').addEventListener('input',calcDiscount)
document.getElementById('rab_1').addEventListener('input',calcDiscount)
document.getElementById('rab_2').addEventListener('input',calcDiscount)
