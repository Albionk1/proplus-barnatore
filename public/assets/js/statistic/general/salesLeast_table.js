let SalesLeastTable
$(document).ready(function () {
   SalesLeastTable = $('#table-sales-least').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/statistic/get-least-saled',
    data:(d)=>{
      d.year=document.getElementById('year').value
      d.unit=document.getElementById('unit').value
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 0 },
        { orderable: !1, targets: 1 },
        { orderable: !1, targets: 2 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'name' },
      { data: 'qty' },
    ],
    lengthMenu: [
      [10],
      [10],
  ]
  })
  //  const documentTitle = 'Lista e Produkteve me pak te shitura';
  // var buttons = new $.fn.dataTable.Buttons(SalesLeastTable, {
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
  SalesLeastTable.on('draw', () => {
    KTMenu.createInstances()
  })
})
yearSelectOutcome.on("change", function() {
  SalesLeastTable.draw()
 })
 $("#unit").on("change", function() {
  SalesLeastTable.draw()
 })
 
//  document.addEventListener('DOMContentLoaded', async function (event) {  
//   SalesLeastTable.draw()
//  })