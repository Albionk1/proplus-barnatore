let expensestable
$(document).ready(function () {
   expensestable = $('#arc_expenses_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/arc/get-arc-expenses',
    data:(d)=>{
     d.arc = location.pathname.split('/')[3]
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'category_name' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.amount} €
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
        ${data.comment}
      </td>`;
        },
      },
    ],drawCallback: function(settings) {
      var api = this.api();
      var data = api.ajax.json();
      let total_expenses=0
    
      for(let i=0;i<data.data.length;i++){
        total_expenses+=data.data[i].amount
      }
      document.getElementById('amount_expense-show').textContent=parseFloat(total_expenses).toFixed(2)+' €'

    }
  })
  
  const documentTitle = 'Lista e Shpenzimeve';
  var buttons = new $.fn.dataTable.Buttons(expensestable, {
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
  }).container().appendTo($('#print-expenses'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('arc_expenses_table_search')
  search_input1.addEventListener('keyup', (e) => {
    expensestable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    expensestable.search(document.getElementById('arc_expenses_table_search').value).draw()
  }

  expensestable.on('draw', () => {
    KTMenu.createInstances()
  })
})