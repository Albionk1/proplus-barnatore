let salestable
$(document).ready(function () {
   salestable = $('#arc_sales_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/arc/get-arc-sales',
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
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.articles?data.articles:0} 
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.createdAt).format('L')} ${moment(data.createdAt).format('HH:mm')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.total_price} €
      </td>`;
        },
      },
    ],drawCallback: function(settings) {
      var api = this.api();
      var data = api.ajax.json();
      let total_sells=0
    
      document.getElementById('sales_count').value=data.recordsFiltered

      for(let i=0;i<data.data.length;i++){
        total_sells+=data.data[i].total_price
      }

    }
  })
  
  const documentTitle = 'Lista e Shitjeve';
  var buttons = new $.fn.dataTable.Buttons(salestable, {
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
  }).container().appendTo($('#print-sales'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('arc_sales_table_search')
  search_input1.addEventListener('keyup', (e) => {
    salestable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    salestable.search(document.getElementById('arc_sales_table_search').value).draw()
  }

  salestable.on('draw', () => {
    KTMenu.createInstances()
  })
})