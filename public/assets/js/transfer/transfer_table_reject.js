let transfertable
$(document).ready(function () {
   transfertable = $('#reject_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/transfer/get-transfers-reject',
     data:(d)=>{
      d.unit=document.getElementById('unit').value
     }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'code' },
      { data: 'incializer_user.full_name' },
      { data: 'response_user.full_name' },
      { data: 'date' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          ${moment(data.updatedAt).format('l')}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-center pe-0',
        render: function (data, type, row) {
          if(data.comment === undefined){
             return `<td></td>` 
          }else{
            return `<td onclick="Swal.fire('${data.comment}')"> 
            ${data.comment.length > 60
              ? data.comment.slice(0, 60 - 1) + '...'
              : data.comment}
        </td>`;
          }
        },
      },
      {
        data: null,
        className: 'text-center pe-0',
        render: function (data, type, row) {
          if(data.comment_rejected === undefined){
             return `<td></td>` 
          }else{
            return `<td onclick="Swal.fire('${data.comment_rejected}')"> 
            ${data.comment_rejected.length > 60
              ? data.comment_rejected.slice(0, 60 - 1) + '...'
              : data.comment_rejected}
        </td>`;
          }
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a href="/admin/merchandise-transfer?transfer=${data._id}" data-bs-toggle="tooltip"
              aria-label="Vështro"
              data-bs-original-title="Vështro">
              <i
                  class="fas fa-eye text-primary fs-2"></i>
          </a>
      </td>`;
        },
      },
    ],lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ],drawCallback: function(settings) {
    var api = this.api();
    var data = api.ajax.json();
    // document.getElementById('transfer_total').textContent=data.transferTotal

  }
  })
  //  const documentTitle = 'Lista e levizjeve interne në kërkes';
  // var buttons = new $.fn.dataTable.Buttons(transfertable, {
  //     buttons: [
  //         {
  //             extend: 'excelHtml5',
  //             title: documentTitle,
  //             exportOptions: {
  //               columns: ':visible'
  //           }
  //         },
  //         {
  //             extend: 'pdfHtml5',
  //             title: documentTitle,
  //             exportOptions: {
  //               columns: ':visible'
  //           }
  //         },
  //         {
  //           extend: 'print',
  //           title: documentTitle,
  //           exportOptions: {
  //             columns: ':visible'
  //         }
  //       },
  //       {extend:'colvis',
  //     text:'Zgjedh kolonat'}
        
          
  //     ]
  // }).container().appendTo($('#print'));
  // document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')

  const search_input1 = document.getElementById('reject_table_search')
  search_input1.addEventListener('keyup', (e) => {
    transfertable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    transfertable.search(document.getElementById('reject_table_search').value).draw()
  }

  transfertable.on('draw', () => {
    KTMenu.createInstances()
  })
})
$('#unit').change(()=>{
  transfertable.search(document.getElementById('reject_table_search').value).draw()
})