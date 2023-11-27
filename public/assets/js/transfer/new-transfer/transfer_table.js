let transfertable
$(document).ready(function () {
   transfertable = $('#transfer_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/transfer/get-transfers',
     data:(d)=>{
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const transferValue = urlParams.get('transfer');
      d.transfer=transferValue
     }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'article.barcode' },
      { data: 'article.name' },
      { data: 'qty' },
      // { data: 'total_price' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
          <a id="${data._id}" data-bs-toggle="tooltip"
          data-kt-delete-table="true"
              aria-label="Fshij"
              data-bs-original-title="Fshij">
              <i id="${data._id}"
                  class="fas fa-trash text-danger fs-3 pt-1 "></i>
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
   let total_qty=0
for(let i =0;i<data.data.length;i++){
  total_qty += data.data[i].qty
  }
  document.getElementById('show_qty').value=total_qty
  document.getElementById('show_transfer_sells').value=data.total_sells + ' €'
  document.getElementById('show_transfer_buy').value=data.total_buys + ' €'

}
  })
   const documentTitle = 'Lista e lëvizjeve interne';
  var buttons = new $.fn.dataTable.Buttons(transfertable, {
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

  const search_input1 = document.getElementById('transfer_table-search')
  search_input1.addEventListener('keyup', (e) => {
    transfertable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    transfertable.search('').draw()
  }
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini artikullin : ' + tdtableext+' nga lëvizja interne',
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, fshije',
          cancelButtonText: "Jo, mos e fshi",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
                text: 'Ti e fshive   artikullin: ' + tdtableext + ' nga lëvizja interne!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/transfer/delete-transfer-article', {
                   method: 'PATCH',
                   body: JSON.stringify({id }),
                   headers: { 'Content-Type': 'application/json' }
                   
                });
                const data = await res.json();
                if(data.status =='fail'){
                   showErrorAlert(data.message)
                }
                if(data.status == 'success'){
                   showSuccessAlert(data.message)
                   resetSuccess()
                }
              })
            : 'cancel' === e.dismiss &&
              Swal.fire({
                text:"Artikulli: "+tdtableext+" nuk u fshi nga lëvizja interne",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  transfertable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})
