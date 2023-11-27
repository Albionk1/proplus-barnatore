let transfertable
$(document).ready(function () {
   transfertable = $('#transfer_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/transfer/get-transfers-transfer',
     data:(d)=>{
      d.unit=document.getElementById('unit').value
     }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'incializer_user.full_name' },
      { data: 'code' },
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
      { data: 'date' },
      { data: 'nr_producs' },
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
          <a id="${data._id}"  class="ms-10" data-bs-toggle="tooltip"
            aria-label="Prano"
            data-kt-approve-table="true"
            data-kt-accept-table="true"
            data-bs-original-title="Prano">
             <i id="${data._id}"
             class="fas fa-check text-success fs-2"></i>
                                                                                </a>
          <a id="${data._id}" class="ms-10" data-kt-delete-table="true"
              data-bs-toggle="tooltip"
              aria-label="Refuzo"
              data-bs-original-title="Refuzo">
              <i id="${data._id}"
                  class="fas fa-times text-danger fs-2"></i>
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
    document.getElementById('transfer_total').textContent=data.transferTotal

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

  const search_input1 = document.getElementById('transfer_table_search')
  search_input1.addEventListener('keyup', (e) => {
    transfertable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    transfertable.search(document.getElementById('transfer_table_search').value).draw()
  }
  function swalDelete() {
    const n = document.querySelectorAll('[data-kt-delete-table="true"]');
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault();
        const id = e.path ? e.path[0].id : e.target.id;
        const o = e.target.closest('tr');
        const tdtableext = o.querySelectorAll('td')[2].innerText;
  console.log(id)
        Swal.fire({
          text: 'A jeni të sigurt që doni ta refuzoni lëvizjen interne',
          icon: 'warning',
          showCancelButton: true,
          input: 'text',
          inputPlaceholder: 'Arsyeja e refuzimit...',
          inputValidator: (value) => {
            if (!value) {
              return 'Arsyeja e refuzimit është e detyrueshme!';
            }
          },
          buttonsStyling: false,
          confirmButtonText: 'Po, refuzo',
          cancelButtonText: "Jo, mos e refuzo",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(async (result) => {
          if (result.value) {
            // User confirmed the delete with a reason
            const reason = result.value;
  
            Swal.fire({
              text: 'Ti e refuzove  lëvizjen interne! Arsyeja: ' + reason,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async () => {
              const res = await fetch('/api/v1/transfer/reject-transfer', {
                method: 'PATCH',
                body: JSON.stringify({ id, reason }), // Include the reason in the request
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status === 'fail') {
                showErrorAlert(data.message);
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message);
                resetSuccess();
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              text: "U refuzua nga lëvizja interne",
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            });
          }
        });
      });
    });
  }
  function swalAprove() {
    const n = document.querySelectorAll(
      '[data-kt-approve-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta aprovoni lëvizjen interne',
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, pranoje',
          cancelButtonText: "Jo, mos e prano",
          customClass: {
            confirmButton: 'btn fw-bold btn-success',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
                text: 'Ti e pranove lëvizjen interne!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/transfer/accept-transfer', {
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
                text:"Levizja interne nuk u pranua",
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
    swalAprove()
  })
})
$('#unit').change(()=>{
  transfertable.search(document.getElementById('transfer_table_search').value).draw()
})