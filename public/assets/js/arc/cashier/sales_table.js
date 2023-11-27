let saletable
moment.locale('sq')
$(document).ready(function () {
   saletable = $('#sales_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/sales/get-sales-arc',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'invoice' },
      { data: 'nr_producs' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          ${moment(data.updatedAt).format('L')} ${ moment(data.updatedAt).format('HH:mm')}
      </td>`;
        },
      },
      { data: 'total_price' },
    ],lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ]
  })


  const search_input1 = document.getElementById('sales_table_search')
  search_input1.addEventListener('keyup', (e) => {
    saletable.search(e.target.value).draw()
  })  
  saletable.on('draw', () => {
    KTMenu.createInstances()
  })
})
