let articletable
$(document).ready(function () {
  articletable = $('#article_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: '/api/v1/article/get-articles',
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
      { orderable: !1, targets: 2 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'barcode' },
      { data: 'name' },
      { data: 'tvsh' },
      { data: 'sale_type' },
      { data: 'min_qty' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="  text-center pe-0">
          ${data.barcode_package ? data.barcode_package : ''}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="  text-center pe-0">
          ${data.code ? data.code : ''}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a href="/admin/articles-update/${data._id}" data-bs-toggle="tooltip"
              aria-label="Përditëso"
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-kt-delete-article="true"
              aria-label="Fshij" data-bs-original-title="Fshij">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  const documentTitle = 'Lista e artikujve';
  var buttons = new $.fn.dataTable.Buttons(articletable, {
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
      {
        extend: 'colvis',
        text: 'Zgjedh kolonat'
      }


    ]
  }).container().appendTo($('#print'));
  document.getElementsByClassName('dt-buttons btn-group flex-wrap')[0].classList.remove('flex-wrap')
  const search_input1 = document.getElementById('article-table-search')
  search_input1.addEventListener('keyup', (e) => {
    articletable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    articletable.search('').draw()
  }
  function swalDeleteSub() {
    const n = document.querySelectorAll(
      '[data-kt-delete-article="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tarticletableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini artikullin: ' + tarticletableext,
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
              text: 'Ti fshive artikullin ' + tarticletableext + '!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/article/delete-article', {
                method: 'PATCH',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' }

              });
              const data = await res.json();
              if (data.status == 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status == 'success') {
                showSuccessAlert(data.message)
                resetSuccess()
              }
            })
            : 'cancel' === e.dismiss &&
            Swal.fire({
              text: "Artikulli: " + tarticletableext + " nuk u fshi",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  articletable.on('draw', () => {
    swalDeleteSub()
    KTMenu.createInstances()
  })
})
// const barcodeStates ={
//   '000': 'United States',
//   '001': 'United States',
//   '002': 'Canada',
//   '003': 'Canada',
//   '004': 'Canada',
//   '005-029': 'United States',
//   '030–039':'United States',
//   '100–139':'United States'
// }
// barcode.addEventListener('input',()=>{

// })
function addArticle() {
  const add_articles_formbn = document.getElementById('add_articles_formbn')
  add_articles_formbn.addEventListener('click', async (e) => {
    try {
      const barcode = document.getElementById('barcode').value
      const name = document.getElementById('name').value
      const tvsh = document.getElementById('tvsh').value
      const sale_type = document.getElementById('sale_type').value
      const min_qty = document.getElementById('min_qty').value
      const price_few = document.getElementById('price_few').value
      const price_many = document.getElementById('price_many').value
      const price_supply = document.getElementById('price_supply').value
      const manufacturer = document.getElementById('manufacturer').value
      const barcode_package = document.getElementById('barcode_package').value
      const code = document.getElementById('code').value
      const group = document.getElementById('group').value
      const subgroup = document.getElementById('subgroup').value
      const zone = document.getElementById('zone').value


      const res = await fetch('/api/v1/article/add-article', {
        method: 'POST',
        body: JSON.stringify({ barcode, name, tvsh, sale_type, min_qty, price_few, price_many, price_supply, manufacturer, barcode_package, code, group, subgroup, zone }),
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.errors) {
        const e = document.getElementsByClassName('show-errors-article')
        for (var elm of e) {
          elm.textContent = ''
        }
        for (var key of Object.keys(data.errors)) {

          if (data.errors[key]) {
            const p = document.getElementById(`${key}-article-error`)
            if (p) {
              p.textContent = data.errors[key]
            }
          }
        }
      }
      if (!data.errors) {
        const e = document.getElementsByClassName('show-errors-article')
        for (var elm of e) {
          elm.textContent = ''
        }
        document.getElementById('barcode').value = ""
        document.getElementById('name').value = ""
        document.getElementById('tvsh').value = ""
        document.getElementById('sale_type').value = ""
        document.getElementById('min_qty').value = ""
        document.getElementById('price_few').value = ""
        document.getElementById('price_many').value = ""
        $('#manufacturer').val('').trigger('change.select2');
        document.getElementById('barcode_package').value = ""
        document.getElementById('code').value = ""
        $('#group').val('').trigger('change.select2');
        $('#subgroup').val('').trigger('change.select2');
        $('#zone').val('').trigger('change.select2');
        articletable.search('').draw()
      }
    } catch (err) {
      console.log(err)
    }
  })

}
addArticle()