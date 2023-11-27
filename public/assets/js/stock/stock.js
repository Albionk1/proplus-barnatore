let stockTable
$(document).ready(function () {
   stockTable = $('#stock_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/article/get-articles-stock',
    data:(d)=>{
     d.unit = document.getElementById('unit').value
    //  d.unit = '64f700dc48259ede9818b486'
     d.group = document.getElementById('group').value
     d.subgroup = document.getElementById('subgroup').value
     d.zone = document.getElementById('zone').value
     d.manufacturer = document.getElementById('manufacturer').value
     d.date = document.getElementById('kt_daterangepicker_1').value
     d.tvsh=document.getElementById('tvshcheck').checked
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 0 },
        { orderable: !1, targets: 1 },
        { orderable: !1, targets: 2 },
        { orderable: !1, targets: 3 },
        { orderable: !1, targets: 4 },
        { orderable: !1, targets: 5 },
        { orderable: !1, targets: 6 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'barcode' },
      { data: 'name' },
      { data: 'supply_price' },
      { data: 'sell_price' },
      { data: 'supply_qty' },
      { data: 'sale_qty' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.supply_qty-data.sale_qty}
      </td>`;
        },
      },
      { data: 'profit' },

      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a href="/admin/stock-product/${data._id}" data-bs-toggle="tooltip"
              aria-label="Produkti"
              data-bs-original-title="Produkti">
              <i class="bi bi-credit-card-fill fs-3"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  
  const documentTitle = 'Lista e artikujve dhe fitimi';
  var buttons = new $.fn.dataTable.Buttons(stockTable, {
      buttons: [
          {
              extend: 'excelHtml5',
              title: documentTitle,
              exportOptions: {
                columns: ':visible'
            }
          },
          {
              extend: 'pdfHtml5',
              title: documentTitle,
              exportOptions: {
                columns: ':visible'
            }
          },
          {
            extend: 'print',
            title: documentTitle,
            exportOptions: {
              columns: ':visible'
          }
        },
        {extend:'colvis',
      text:'Zgjedh kolonat'}
        
          
      ]
  }).container().appendTo($('#print'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('stock_table_search')
  search_input1.addEventListener('keyup', (e) => {
    stockTable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    stockTable.search(document.getElementById('stock_table_search').value).draw()
  }

  stockTable.on('draw', () => {
  
    KTMenu.createInstances()
  })
})

$('#unit').change(()=>{
    stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#date').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#group').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#subgroup').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#zone').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#manufacturer').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
$('#tvshcheck').change(()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})
document.getElementById('filto-btn').addEventListener('click',()=>{
  stockTable.search(document.getElementById('stock_table_search').value).draw()
})