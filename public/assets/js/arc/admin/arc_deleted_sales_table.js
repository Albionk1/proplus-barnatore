let deletedsalestable
$(document).ready(function () {
   deletedsalestable = $('#arc_deleted_sales_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/arc/get-arc-delete-sales',
    data:(d)=>{
     d.arc = location.pathname.split('/')[3]
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 2 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'invoice' },
      { data: 'article.name' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.createdAt).format('L')} ${moment(data.createdAt).format('HH:mm')}
      </td>`;
        },
      },
      { data: 'qty' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.total_price} €
      </td>`;
        },
      },
    ]
  })
  
  const documentTitle = 'Lista e Arikujve Të fshirë nga shitjet';
  var buttons = new $.fn.dataTable.Buttons(deletedsalestable, {
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
  }).container().appendTo($('#print_deletedSales'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('arc_deleted_sales_table_search')
  search_input1.addEventListener('keyup', (e) => {
    deletedsalestable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    deletedsalestable.search(document.getElementById('arc_deleted_sales_table_search').value).draw()
  }

  deletedsalestable.on('draw', () => {
    KTMenu.createInstances()
  })
})