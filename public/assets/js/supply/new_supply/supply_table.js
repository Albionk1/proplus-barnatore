let supplytable
$(document).ready(function () {
   supplytable = $('#supply_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/supply/get-supplies',
    data:(d)=>{
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      
      const supplyValue = urlParams.get('supply');
      d.supply = supplyValue
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'article.barcode' },
      { data: 'article.name' },
      { data: 'price' },
      { data: 'qty' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.qty*data.price).toFixed(2)}
      </td>`;
        },
      },
      { data: 'rab_1' },
      { data: 'rab_2' },
      { data: 'mazh' },
      { data: 'total_price' },
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
    ],drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      let total = 0
      let qty_total =0
      let price_total =0
      let sell_total =0
      
      for (let i = 0; i < data.data.length; i++) {
        total += data.data[i].total_price
        qty_total += data.data[i].qty
        price_total += data.data[i].qty *data.data[i].price
        sell_total += data.data[i].qty *data.data[i].price_few
      }
      document.getElementById('show-total-price').textContent = parseFloat(total).toFixed(2) +' €'
      document.getElementById('show_price_discount').value = parseFloat(total).toFixed(2) +' €'
      document.getElementById('show_price_total').value = parseFloat(price_total).toFixed(2) +' €'
      document.getElementById('show-price').value = parseFloat(sell_total).toFixed(2) +' €'
      document.getElementById('show-qty').value = qty_total
    },
    lengthMenu: [
      [10,20,50,100],
      [10,20,50,100],
  ]
  })
   const documentTitle = 'Lista e furnizimeve';
  var buttons = new $.fn.dataTable.Buttons(supplytable, {
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

  const search_input1 = document.getElementById('supply_table-search')
  search_input1.addEventListener('keyup', (e) => {
    supplytable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    supplytable.search('').draw()
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
          text: 'A jeni të sigurt që doni ta fshini furnizimin për artikullin : ' + tdtableext,
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
                text: 'Ti e fshive furnizimin e artikullit: ' + tdtableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/supply/delete-supply-article', {
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
                text:"Furnizimin e artikullit: "+tdtableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  supplytable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})
