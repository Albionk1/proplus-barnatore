const printFiscalSell=(table)=>{
   const fp = new Tremol.FP();
   var dev = fp.ServerFindDevice();
   if(dev){
      fp.ServerSetDeviceSerialSettings(dev.serialPort, dev.baudRate, dev.keepPortOpen)
      if(fp.ReadCurrentRecInfo().OptionIsReceiptOpened.toString() === '1') fp.CloseReceipt()
      fp.OpenReceipt(1,'0','0')
   const tr=   table.querySelectorAll('tr')
   let disc =0
      for(let i= 1;i<tr.length;i++){
         const td = tr[i].querySelectorAll('td')
         let article =td[2].textContent
         let price = td[7].textContent
         let amount = td[4].textContent
         let discount = td[5].textContent
         disc += patseFloat(discount).toFixed(2)
         let vat = td[6].textContent
         if(vat ==='') fp.SellPLUwithSpecifiedVAT(article,Tremol.Enums.OptionVATClass.VAT_Class_A, price, amount,parseFLoat(-discount).toFixed(2))
         if(vat ==='0') fp.SellPLUwithSpecifiedVAT(article,Tremol.Enums.OptionVATClass.VAT_Class_C, price, amount,parseFLoat(-discount).toFixed(2))
         if(vat ==='8') fp.SellPLUwithSpecifiedVAT(article,Tremol.Enums.OptionVATClass.VAT_Class_D, price, amount,parseFLoat(-discount).toFixed(2))
         if(vat ==='18') fp.SellPLUwithSpecifiedVAT(article,Tremol.Enums.OptionVATClass.VAT_Class_E, price, amount,parseFLoat(-discount).toFixed(2))
      }
   if(parseFloat(disc)>0){
     fp.Subtotal(Tremol.Enums.OptionPrinting.Yes,Tremol.Enums.OptionDisplay.Yes,null,parseFloat(-disc))
   }
   fp.CashPayCloseReceipt()
   return true
   }else{
      alert('Nuk keni printer fiskal')
      return false
   }
}

const writeFile = (table)=>{
   let headPrint = `<Command Name="OpenReceipt">
   <Args>
     <Arg Name="OperNum" Value="1" />
     <Arg Name="OperPass" Value="0" />
     <Arg Name="OptionPrintType" Value="">
       <Options>
         <Option Name="Postponed printing" Value="2" />
         <Option Name="Step by step printing" Value="0" />
       </Options>
     </Arg>
   </Args>
 </Command>
 
 
 
 <Options>
         <Option Name="VAT Class A" Value="A" />
         <Option Name="VAT Class B" Value="B" />
         <Option Name="VAT Class C" Value="C" />
         <Option Name="VAT Class D" Value="D" />
         <Option Name="VAT Class E" Value="E" />
         <Option Name="VAT Class F" Value="F" />
         <Option Name="VAT Class G" Value="G" />
         <Option Name="VAT Class H" Value="H" />
       </Options>`
       let body ='\n'
       const tr=   table.querySelectorAll('tr')
       for(let i= 1;i<tr.length;i++){
         const td = tr[i].querySelectorAll('td')
         let article =td[2].textContent
         let price = td[7].textContent
         let amount = td[4].querySelector('input').value
         let vat = td[6].textContent
         let vat_txt
         let new_price = parseFloat(price.trim()) / amount
         if(vat ==='') vat_txt ='A'
         if(vat ==='0') vat_txt ='C'
         if(vat ==='8') vat_txt ='D'
         if(vat ==='18') vat_txt ='E'
         body +=`<Command Name="SellPLUwithSpecifiedVAT">
         <Args>
           <Arg Name="NamePLU" Value="${article}" />
           <Arg Name="OptionVATClass" Value="${vat_txt}">
           </Arg>
           <Arg Name="Price" Value="`+new_price.toFixed(2)+`" />
           <Arg Name="Quantity" Value="`+amount+`" Compulsory="false" />
           <Arg Name="DiscAddP" Value="" Compulsory="false" />
           <Arg Name="DiscAddV" Value="" Compulsory="false" />
           <Arg Name="DepNum" Value="" Compulsory="false" />
         </Args>
       </Command>\n`

      }
      let end = `<Command Name="CashPayCloseReceipt" />`
   var blob = new Blob([headPrint+body+end], { type: 'application/xml' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'pf'+Date.now();
    a.className="d-none"
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const closeFiscalApi = (table)=>{
  fetch("http://localhost:4444/OpenReceipt(OperNum=1,OperPass=0,OptionPrintType='0')")
  const tr=   table.querySelectorAll('tr')
      for(let i= 1;i<tr.length;i++){
        const td = tr[i].querySelectorAll('td')
        let article =td[2].textContent
        let price = td[7].textContent
        let amount = td[4].querySelector('input').value
        let vat = td[6].textContent
        let vat_txt
        let new_price = parseFloat(price.trim()) / amount
        if(vat ==='') vat_txt ='A'
        if(vat ==='0') vat_txt ='C'
        if(vat ==='8') vat_txt ='D'
        if(vat ==='18') vat_txt ='E'
  fetch(`http://localhost:4444/SellPLUwithSpecifiedVAT(NamePLU='${article}',OptionVATClass=${vat_txt},Price='${new_price.toFixed(2)},Quantity='${amount}',DiscAddP='',DiscAddV='',DepNum=''))`)
     }
  fetch('http://localhost:4444/CashPayCloseReceipt()')
}