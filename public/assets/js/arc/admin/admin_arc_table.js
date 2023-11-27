let arctable
$(document).ready(function () {
   arctable = $('#arc_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/arc/admin-get-arc',
    data:(d)=>{
     d.unit = document.getElementById('unit').value
     d.date = document.getElementById('kt_datepicker_1').value
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
      { data: 'seller.full_name' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.createdAt).format('L')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${moment(data.createdAt).format('HH:mm')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.startCount} €
      </td>`;
        },
      },

      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.sells_cash} €
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.sells_bank} €
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.expenses} €
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${parseFloat(data.sells_cash+data.sells_bank).toFixed(2)} €
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td>
        ${data.isOpen===true? `<div class="badge badge-light-success fs-6 mt-1">
       E Hapur</div>` :`<div class="badge badge-light-danger fs-6 mt-1"> E
       Mbyllur</div>`}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a href="/admin/arc-see/${data._id}" data-bs-toggle="tooltip"
              aria-label="Shiko" data-bs-original-title="Shiko">
              <i class="fas fa-eye text-primary fs-5"></i>
          </a>
      </td>`;
        },
      },
    ],drawCallback: function(settings) {
      var api = this.api();
      var data = api.ajax.json();
      let sales_total_show = 0
      let expense_show = 0

      for(let i =0;i<data.data.length;i++){
       const total =(parseFloat(data.data[i].sells_cash) + parseFloat(data.data[i].sells_bank)).toFixed(2);
        sales_total_show+=total
        expense_show=expense_show+parseFloat(data.data[i].expenses).toFixed(2)
      }

      document.getElementById('sales_total_show').textContent=parseFloat(sales_total_show).toFixed(2)+' €'
      document.getElementById('expense_show').textContent=parseFloat(expense_show).toFixed(2)+' €'
      document.getElementById('active_arc_show').textContent=data.activeArc


    }
  })
  
  const documentTitle = 'Lista e arkave';
  var buttons = new $.fn.dataTable.Buttons(arctable, {
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
  const search_input1 = document.getElementById('arc_table_search')
  search_input1.addEventListener('keyup', (e) => {
    arctable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    arctable.search(document.getElementById('arc_table_search').value).draw()
  }

  arctable.on('draw', () => {
    KTMenu.createInstances()
  })
})

$('#filter_table').click(()=>{
    arctable.search(document.getElementById('arc_table_search').value).draw()
})

$("#unit").on("change", function() {
  arctable.draw()
 })