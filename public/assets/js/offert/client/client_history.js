let saletable
$(document).ready(function () {
   saletable = $('#client_sales_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/offert/get-offerts-client-history',
     data:(d)=>{
      d.paid_status=document.getElementById('paid_status').value
      d.client=location.pathname.split('/')[3]
     }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'invoice' },
      { data: 'date' },
      { data: 'nr_producs' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${(data.total_price_Without_Discount).toFixed(2)}€
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${([(data.total_price_Without_Discount - data.total_price) / data.total_price_Without_Discount] * 100).toFixed(2)}%
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${(data.total_price).toFixed(2)}€
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">${data.paid_status===false?`<a id="${data._id}"  data-kt-pay-table="true" data-bs-toggle="tooltip" aria-label="Karta"
          data-bs-original-title="Paguaj">
          <i id="${data._id}" class="fas fa-money-bill text-primary fs-5"></i>
      </a>`:''}
          <a href="/admin/sales-wholesale?sale=${data._id}" class="ms-10" data-bs-toggle="tooltip"
              aria-label="Shiko"  target="_blank"
              data-bs-original-title="Shiko">
              <i id="${data._id}" class="fas fa-eye text-primary fs-5"></i>
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
    document.getElementById('sale_count_total').textContent=data.sale+'€'
    document.getElementById('debt_count_total').textContent=data.debt +'€'
  }
  })
   const documentTitle = 'Lista e Shitjeve për klientin: '+document.getElementById('name').value;
  var buttons = new $.fn.dataTable.Buttons(saletable, {
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

  const search_input1 = document.getElementById('client_sales_table_search')
  search_input1.addEventListener('keyup', (e) => {
    saletable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    saletable.search('').draw()
  }
  function swalPay() {
    const n = document.querySelectorAll(
      '[data-kt-pay-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta paguani shitjen me faturën: ' + tdtableext,
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, paguaje',
          cancelButtonText: "Jo, mos e paguaj",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-active-light-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
                text: 'Ti e pagove   faturen: ' + tdtableext ,
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/offerts/pay-client-sale', {
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
                text:"Fatura: "+tdtableext+" u pagua",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  saletable.on('draw', () => {
    KTMenu.createInstances()
    swalPay()
  })
})
