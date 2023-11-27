const modal = document.getElementById('payment_kesh');
const modal1 = document.getElementById('payment_new');
let modal_type
let client ='client_1_tab'
let colon = 'col_1'
// Function to handle the event
function handleModalOpen(event) {
  if(client==='client_1_tab'){
    colon = 'col_1'
    document.getElementById('show-total-cash').textContent=ColOneTotalPrice
    document.getElementById('show-total-cash-bank').textContent=ColOneTotalPrice
    document.getElementById('show-total-cash-new').textContent=ColOneTotalPrice
    document.getElementById('show-total-cash-new-bank').textContent=ColOneTotalPrice
    document.getElementById('pay-kesh').value=ColOneTotalPrice
    document.getElementById('pay-cash-new').value=ColOneTotalPrice
    document.getElementById('show-article-modal').textContent=ColOneTotalArticle + ' Artikuj'
    document.getElementById('show-article-modal-new').textContent=ColOneTotalArticle + ' Artikuj'
    document.getElementById('show-kusur-new').textContent='0.00'
    document.getElementById('show-kusur-cash').textContent='0.00'
  }
  if(client==='client_2_tab'){
    colon = 'col_2'
    document.getElementById('show-total-cash').textContent=ColTwoTotalPrice
    document.getElementById('show-total-cash-bank').textContent= ColTwoTotalPrice
    document.getElementById('show-total-cash-new').textContent= ColTwoTotalPrice
    document.getElementById('show-total-cash-new-bank').textContent= ColTwoTotalPrice
    document.getElementById('pay-kesh').value= ColTwoTotalPrice
    document.getElementById('pay-cash-new').value= ColTwoTotalPrice
    document.getElementById('show-article-modal').textContent= ColTwoTotalArticle + ' Artikuj'
    document.getElementById('show-article-modal-new').textContent= ColTwoTotalArticle + ' Artikuj'
    document.getElementById('show-kusur-new').textContent='0.00'
    document.getElementById('show-kusur-cash').textContent='0.00'
  }
  if(client==='client_3_tab'){
    colon = 'col_3'
    document.getElementById('show-total-cash').textContent=ColThreeTotalPrice
    document.getElementById('show-total-cash-bank').textContent=ColThreeTotalPrice
    document.getElementById('show-total-cash-new').textContent=ColThreeTotalPrice
    document.getElementById('show-total-cash-new-bank').textContent=ColThreeTotalPrice
    document.getElementById('pay-kesh').value=ColThreeTotalPrice
    document.getElementById('pay-cash-new').value=ColThreeTotalPrice
    document.getElementById('show-article-modal').textContent=ColThreeTotalArticle + ' Artikuj'
    document.getElementById('show-article-modal-new').textContent=ColThreeTotalArticle + ' Artikuj'
    document.getElementById('show-kusur-new').textContent='0.00'
    document.getElementById('show-kusur-cash').textContent='0.00'
  }
  if(client==='client_4_tab'){
    colon = 'col_4'
    document.getElementById('show-total-cash').textContent=ColFourTotalPrice
    document.getElementById('show-total-cash-bank').textContent=ColFourTotalPrice
    document.getElementById('show-total-cash-new').textContent=ColFourTotalPrice
    document.getElementById('show-total-cash-new-bank').textContent=ColFourTotalPrice
    document.getElementById('pay-kesh').value=ColFourTotalPrice
    document.getElementById('pay-cash-new').value=ColFourTotalPrice
    document.getElementById('show-article-modal').textContent=ColFourTotalArticle + ' Artikuj'
    document.getElementById('show-article-modal-new').textContent=ColFourTotalArticle + ' Artikuj'
    document.getElementById('show-kusur-new').textContent='0.00'
    document.getElementById('show-kusur-cash').textContent='0.00'
  }
  if(client==='client_5_tab'){
    colon = 'col_5'
    document.getElementById('show-total-cash').textContent=ColFiveTotalPrice
    document.getElementById('show-total-cash-bank').textContent=ColFiveTotalPrice
    document.getElementById('show-total-cash-new').textContent=ColFiveTotalPrice
    document.getElementById('show-total-cash-new-bank').textContent=ColFiveTotalPrice
    document.getElementById('pay-kesh').value=ColFiveTotalPrice
    document.getElementById('pay-cash-new').value=ColFiveTotalPrice
    document.getElementById('show-article-modal').textContent=ColFiveTotalArticle + ' Artikuj'
    document.getElementById('show-article-modal-new').textContent=ColFiveTotalArticle + ' Artikuj'
    document.getElementById('show-kusur-new').textContent='0.00'
    document.getElementById('show-kusur-cash').textContent='0.00'
  }

}
const modalType=(nr)=>{
  modal_type =nr
}
modal.addEventListener('show.bs.modal',(e)=>{
  handleModalOpen(e);
  modalType(1)
});
modal1.addEventListener('show.bs.modal',(e)=>{
  handleModalOpen(e);
  modalType(2)
} );


const tabList = document.querySelector('.nav.nav-tabs');


tabList.addEventListener('shown.bs.tab', (event) => {
 
  const activeTab = event.target;
  const activeTabId = activeTab.getAttribute('id');
  client= activeTabId
  if(client==='client_1_tab') colon = 'col_1',setTimeout(()=>{ $('#article-table-search').focus()},10)
  if(client==='client_2_tab') colon = 'col_2',setTimeout(()=>{ $('#article-table-2-search').focus()},10)
  if(client==='client_3_tab') colon = 'col_3',setTimeout(()=>{  $('#article-table-3-search').focus()},10)
  if(client==='client_4_tab') colon = 'col_4',setTimeout(()=>{$('#article-table-4-search').focus()},10)
  if(client==='client_5_tab') colon = 'col_5',setTimeout(()=>{ $('#article-table-5-search').focus()},10)
});

const payNew= document.getElementById('pay-cash-new')
payNew.addEventListener('input',()=>{
const totalCashNew = parseFloat(document.getElementById('show-total-cash-new').textContent).toFixed(2)
  let kusur = parseFloat(totalCashNew - payNew.value).toFixed(2)
  document.getElementById('show-kusur-new').textContent=kusur
})

const pay= document.getElementById('pay-kesh')
pay.addEventListener('input',()=>{
const totalCashNew = parseFloat(document.getElementById('show-total-cash').textContent).toFixed(2)
  let kusur = parseFloat(totalCashNew - pay.value).toFixed(2)
  document.getElementById('show-kusur-cash').textContent=kusur
})
$('input[name="radioGroup-col1"]').change(function() {
  setTimeout(()=>{ $('#article-table-search').focus()},10)
});
$('input[name="radioGroup-col_2"]').change(function() {
  setTimeout(()=>{ $('#article-table-2-search').focus()},10)
});
$('input[name="radioGroup-col_3"]').change(function() {
  setTimeout(()=>{ $('#article-table-3-search').focus()},10)
});
$('input[name="radioGroup-col_4"]').change(function() {
  setTimeout(()=>{ $('#article-table-4-search').focus()},10)
});
$('input[name="radioGroup-col_5"]').change(function() {
  setTimeout(()=>{ $('#article-table-5-search').focus()},10)
});