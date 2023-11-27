const payTab = document.querySelector('.mod-pay');
setTimeout(()=>{ $('#article-table-search').focus()},10)
let payment_type  ='cash'
payTab.addEventListener('shown.bs.tab', (event) => {
 
    const activeTab = event.target;
    const activeTabId = activeTab.getAttribute('id');
  
    if(activeTabId ==='kesh_tab') payment_type ='cash'
    if(activeTabId ==='credit_card_tab') payment_type ='bank'

  });


document.getElementById('pay-cash').addEventListener('click',async()=>{
    try {
        let sale_status = 'primary'
        let payment_type = 'cash'
        const obj = {sale_status,colon,payment_type}
        if(client==='client_1_tab'&& buyer.col1) obj.cardUser=buyer.col1
        if(client==='client_2_tab'&& buyer.col2) obj.cardUser=buyer.col2
        if(client==='client_3_tab'&& buyer.col3) obj.cardUser=buyer.col3
        if(client==='client_4_tab'&& buyer.col4) obj.cardUser=buyer.col4
        if(client==='client_5_tab'&& buyer.col5) obj.cardUser=buyer.col5
        if(client==='client_1_tab'){
          if(writeFile(document.getElementById('col_1_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_2_tab'){
          if(writeFile(document.getElementById('col_2_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_3_tab'){
          if(writeFile(document.getElementById('col_3_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_4_tab'){
          if(writeFile(document.getElementById('col_4_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_5_tab'){
          if(writeFile(document.getElementById('col_5_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
          const res = await fetch('/api/v1/sales/close-sale-few', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json()
          if (data.status === 'fail') {
        showErrorAlert(data.message)
          }
          if (data.status === 'success') {
           const modal = $('#payment_kesh')
           modal.modal('hide')
           if(client==='client_1_tab') ColOneTable.draw(),buyer.col1='',deleteListUser(document.getElementById('user-list-col1'),document.getElementById('search-user-list-col1')),updatedCol1=0,setTimeout(()=>{ $('#article-table-search').focus()},10)
           if(client==='client_2_tab') ColTwoTable.draw(),buyer.col2='',deleteListUser(document.getElementById('user-list-col2'),document.getElementById('search-user-list-col2')),updatedCol2=0,setTimeout(()=>{ $('#article-table-2-search').focus()},10)
           if(client==='client_3_tab') ColThreeTable.draw(),buyer.col3='',deleteListUser(document.getElementById('user-list-col3'),document.getElementById('search-user-list-col3')),updatedCol3=0,setTimeout(()=>{  $('#article-table-3-search').focus()},10)
           if(client==='client_4_tab') ColFourTable.draw(),buyer.col4='',deleteListUser(document.getElementById('user-list-col4'),document.getElementById('search-user-list-col4')),updatedCol4=0,setTimeout(()=>{$('#article-table-4-search').focus()},10)
           if(client==='client_5_tab') ColFiveTable.draw(),buyer.col5='',deleteListUser(document.getElementById('user-list-col5'),document.getElementById('search-user-list-col5')),updatedCol5=0,setTimeout(()=>{ $('#article-table-5-search').focus()},10)
          }
        } catch (err) {
          console.log(err)
        }
})
document.getElementById('pay-new-cash').addEventListener('click',async()=>{
    try {
        let sale_status = 'secondary'
        let payment_type = 'cash'
        const obj = {sale_status,colon,payment_type}
        if(client==='client_1_tab'&& buyer.col1) obj.cardUser=buyer.col1
        if(client==='client_2_tab'&& buyer.col2) obj.cardUser=buyer.col2
        if(client==='client_3_tab'&& buyer.col3) obj.cardUser=buyer.col3
        if(client==='client_4_tab'&& buyer.col4) obj.cardUser=buyer.col4
        if(client==='client_5_tab'&& buyer.col5) obj.cardUser=buyer.col5
          const res = await fetch('/api/v1/sales/close-sale-few', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json()
          if (data.status === 'fail') {
        showErrorAlert(data.message)
          }
          if (data.status === 'success') {
           const modal = $('#payment_new')
           modal.modal('hide')
           if(client==='client_1_tab') ColOneTable.draw(),buyer.col1='',deleteListUser(document.getElementById('user-list-col1'),document.getElementById('search-user-list-col1')),updatedCol1=0,setTimeout(()=>{ $('#article-table-search').focus()},10)
           if(client==='client_2_tab') ColTwoTable.draw(),buyer.col2='',deleteListUser(document.getElementById('user-list-col2'),document.getElementById('search-user-list-col2')),updatedCol2=0,setTimeout(()=>{ $('#article-table-2-search').focus()},10)
           if(client==='client_3_tab') ColThreeTable.draw(),buyer.col3='',deleteListUser(document.getElementById('user-list-col3'),document.getElementById('search-user-list-col3')),updatedCol3=0,setTimeout(()=>{  $('#article-table-3-search').focus()},10)
           if(client==='client_4_tab') ColFourTable.draw(),buyer.col4='',deleteListUser(document.getElementById('user-list-col4'),document.getElementById('search-user-list-col4')),updatedCol4=0,setTimeout(()=>{$('#article-table-4-search').focus()},10)
           if(client==='client_5_tab') ColFiveTable.draw(),buyer.col5='',deleteListUser(document.getElementById('user-list-col5'),document.getElementById('search-user-list-col5')),updatedCol5=0,setTimeout(()=>{ $('#article-table-5-search').focus()},10)
          }
        } catch (err) {
          console.log(err)
        }
})
document.getElementById('pay-bank').addEventListener('click',async()=>{
    try {
        let sale_status = 'primary'
        let payment_type = 'bank'
        let bank = document.getElementById('bank-pay').value
        const obj = {sale_status,colon,payment_type,bank}
        if(client==='client_1_tab'&& buyer.col1) obj.cardUser=buyer.col1
        if(client==='client_2_tab'&& buyer.col2) obj.cardUser=buyer.col2
        if(client==='client_3_tab'&& buyer.col3) obj.cardUser=buyer.col3
        if(client==='client_4_tab'&& buyer.col4) obj.cardUser=buyer.col4
        if(client==='client_5_tab'&& buyer.col5) obj.cardUser=buyer.col5
        if(client==='client_1_tab'){
          if(writeFile(document.getElementById('col_1_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_2_tab'){
          if(writeFile(document.getElementById('col_2_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_3_tab'){
          if(writeFile(document.getElementById('col_3_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_4_tab'){
          if(writeFile(document.getElementById('col_4_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
        if(client==='client_5_tab'){
          if(writeFile(document.getElementById('col_5_table'))===false) return showErrorAlert('Fatura nuk u mbull')
        } 
          const res = await fetch('/api/v1/sales/close-sale-few', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json()
          if (data.status === 'fail') {
        showErrorAlert(data.message)
          }
          if (data.status === 'success') {
           const modal = $('#payment_kesh')
           modal.modal('hide')
           if(client==='client_1_tab') ColOneTable.draw(),buyer.col1='',deleteListUser(document.getElementById('user-list-col1'),document.getElementById('search-user-list-col1')),updatedCol1=0,setTimeout(()=>{ $('#article-table-search').focus()},10)
           if(client==='client_2_tab') ColTwoTable.draw(),buyer.col2='',deleteListUser(document.getElementById('user-list-col2'),document.getElementById('search-user-list-col2')),updatedCol2=0,setTimeout(()=>{ $('#article-table-2-search').focus()},10)
           if(client==='client_3_tab') ColThreeTable.draw(),buyer.col3='',deleteListUser(document.getElementById('user-list-col3'),document.getElementById('search-user-list-col3')),updatedCol3=0,setTimeout(()=>{  $('#article-table-3-search').focus()},10)
           if(client==='client_4_tab') ColFourTable.draw(),buyer.col4='',deleteListUser(document.getElementById('user-list-col4'),document.getElementById('search-user-list-col4')),updatedCol4=0,setTimeout(()=>{$('#article-table-4-search').focus()},10)
           if(client==='client_5_tab') ColFiveTable.draw(),buyer.col5='',deleteListUser(document.getElementById('user-list-col5'),document.getElementById('search-user-list-col5')),updatedCol5=0,setTimeout(()=>{ $('#article-table-5-search').focus()},10)
          }
        } catch (err) {
          console.log(err)
        }
})

document.getElementById('pay-bank-new').addEventListener('click',async()=>{
    // document.getElementById('pay-kesh').value
    try {
        let sale_status = 'secondary'
        let payment_type = 'bank'
        let bank = document.getElementById('bank-pay-new').value
        const obj = {sale_status,colon,payment_type,bank}
        if(client==='client_1_tab'&& buyer.col1) obj.cardUser=buyer.col1
        if(client==='client_2_tab'&& buyer.col2) obj.cardUser=buyer.col2
        if(client==='client_3_tab'&& buyer.col3) obj.cardUser=buyer.col3
        if(client==='client_4_tab'&& buyer.col4) obj.cardUser=buyer.col4
        if(client==='client_5_tab'&& buyer.col5) obj.cardUser=buyer.col5
          const res = await fetch('/api/v1/sales/close-sale-few', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
          })
          const data = await res.json()
          if (data.status === 'fail') {
        showErrorAlert(data.message)
          }
          if (data.status === 'success') {
           const modal = $('#payment_kesh')
           modal.modal('hide')
           if(client==='client_1_tab') ColOneTable.draw(),buyer.col1='',deleteListUser(document.getElementById('user-list-col1'),document.getElementById('search-user-list-col1')),updatedCol1=0,setTimeout(()=>{ $('#article-table-search').focus()},10)
           if(client==='client_2_tab') ColTwoTable.draw(),buyer.col2='',deleteListUser(document.getElementById('user-list-col2'),document.getElementById('search-user-list-col2')),updatedCol2=0,setTimeout(()=>{ $('#article-table-2-search').focus()},10)
           if(client==='client_3_tab') ColThreeTable.draw(),buyer.col3='',deleteListUser(document.getElementById('user-list-col3'),document.getElementById('search-user-list-col3')),updatedCol3=0,setTimeout(()=>{  $('#article-table-3-search').focus()},10)
           if(client==='client_4_tab') ColFourTable.draw(),buyer.col4='',deleteListUser(document.getElementById('user-list-col4'),document.getElementById('search-user-list-col4')),updatedCol4=0,setTimeout(()=>{$('#article-table-4-search').focus()},10)
           if(client==='client_5_tab') ColFiveTable.draw(),buyer.col5='',deleteListUser(document.getElementById('user-list-col5'),document.getElementById('search-user-list-col5')),updatedCol5=0,setTimeout(()=>{ $('#article-table-5-search').focus()},10)
          }
        } catch (err) {
          console.log(err)
        }
})