let ColFourTable
let ColFourTotalPrice
let ColFourTotalArticle
$(document).ready(function () {
  ColFourTable = $('#col_4_table').DataTable({
    processing: true,
    paging: false,
    serverSide: true,
    ajax: {
      url: '/api/v1/sales/get-sales-pos',
      data: (d) => {
        d.colon = 'col_4'
      }
    },
    columnDefs: [
      // { className: "text-center pe-0", targets: "_all" },
      { orderable: !1, targets: 8 },
    ],

    columns: [
      { data: 'nr' },
      { data: 'barcode' },
      { data: 'article.name' },
      { data: 'price_few' },
      {
        data: null,
        className: 'text-700 text-center quantity-input-border',
        render: function (data, type, row) {
          return ` <td class="text-gray-700 text-center quantity-input-border">
          <input type="number" value="${data.qty}" min="1" id="${data._id}"
              contenteditable="true">
      </td>`;
        },
      },
      { data: 'discount' },
      { data: 'tvsh' },
      {
        data: null,
        className: 'text-center pe-0',
        render: function (data, type, row) {
          return ` <td class="text-center pe-0" ><span data-name="total_price">
         ${data.total_price}
             <span>
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-center pe-0',
        render: function (data, type, row) {
          return ` <a id="${data._id}" data-bs-toggle="tooltip" aria-label="Fshij" data-kt-delete-table-col-4="true"
          data-bs-original-title="Fshij">
          <i id="${data._id}"class="fas fa-times text-danger fs-3 pt-1 "></i>
      </a>`;
        },
      },
    ], drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      if (document.getElementById('col_4_table_search').value === '') {
        // Calculate total_price and update 'colon_1_article'
        let total_price = 0;
        for (let i = 0; i < data.data.length; i++) {
          total_price += parseFloat(data.data[i].total_price);
        }
        document.querySelector('[col-4-delete="all"]').id = data.sale
        document.querySelector('[col-4-delete-i="all"]').id = data.sale

        ColFourTotalPrice = total_price.toFixed(2)
        ColFourTotalArticle = data.recordsTotal
        document.getElementById('colon_4_article').textContent = data.recordsTotal;
        document.getElementById('price-col-4').textContent = total_price.toFixed(2);

        // Add input event listeners for quantity input in each row
        $('tbody tr', this).each(function () {
          var row = api.row(this).data();
          var qtyInput = $(this).find('input[type="number"]');

          qtyInput.on('input', function () {
            // Get the new quantity value from the input
            var newQty = parseInt(qtyInput.val()) || 0;

            // Calculate the new total_price for this row
            var newTotalPrice = (row.price_few * newQty).toFixed(2);
            // Update the total_price column in this row
            $(this).closest('tr').find('span[data-name="total_price"]').text(newTotalPrice);

            // Update the total_price for the whole table
            total_price = 0;


            $('#col_4_table').find('tr').each(function (i, e) {
              if (i !== 0) {
                var totalPriceText = parseFloat($(this).find('span[data-name="total_price"]').text());
                total_price += parseFloat(totalPriceText);
              }
            })
            // Update the total_price display
            $('#price-col-4').text(total_price.toFixed(2));
            ColFourTotalPrice = total_price.toFixed(2)

          });
          qtyInput.on('blur', async () => {
            try {
              const res = await fetch('/api/v1/sales/edit-sale-article-qty', {
                method: 'POST',
                body: JSON.stringify({ id: qtyInput[0].id, qty: qtyInput.val() }),
                headers: { 'Content-Type': 'application/json' },
              })
              const data = await res.json()
              if (data.status === 'fail') {
                showErrorAlert(data.message)
              }
              if (data.status === 'success') {
                ColFourTable.search(document.getElementById('col_4_table_search').value).draw()
              }
            } catch (err) {
              console.log(err)
            }
          })
        });
      }

    }
  })


  const search_input1 = document.getElementById('col_4_table_search')
  search_input1.addEventListener('keyup', (e) => {
    ColFourTable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    ColFourTable.search(document.getElementById('col_4_table_search').value).draw()
  }
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table-col-4="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini artikullin : ' + tdtableext + ' nga shitja',
          icon: 'warning',
          showCancelButton: !0,
          buttonsStyling: !1,
          confirmButtonText: 'Po, fshije',
          cancelButtonText: "Jo, mos e fshi",
          customClass: {
            confirmButton: 'btn fw-bold btn-danger',
            cancelButton: 'btn fw-bold btn-primary',
          },
        }).then(function (e) {
          e.value
            ? Swal.fire({
              text: 'Ti e fshive   artikullin: ' + tdtableext + ' nga shitja!.',
              icon: 'success',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            }).then(async function () {
              const res = await fetch('/api/v1/sales/delete-sale-article', {
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
              text: "Artikulli: " + tdtableext + " nuk u fshi nga shitja",
              icon: 'error',
              buttonsStyling: !1,
              confirmButtonText: 'Në rregull',
              customClass: { confirmButton: 'btn fw-bold btn-primary' },
            })
        })
      })
    })
  }
  ColFourTable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})
const searchArticleCol4 = document.getElementById('article-table-4-search')
searchArticleCol4.addEventListener('input', async (e) => {
  const radioButtons = document.querySelectorAll('[name="radioGroup-col_4"]');

  let selectedValue = null;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break; // Stop the loop when a checked radio is found
    }
  }
  if (selectedValue === 'name') {
    const nameRegex = new RegExp(searchArticleCol4.value, 'i')
    let filter = articles.filter(item => nameRegex.test(item.name)).slice(0, parseInt(document.getElementById('article_4_length').value))
    if (filter.length>0) {
      updateDataTableCol4(filter)
    }
    else {
      updateDataTableCol4([])

    }
  }
  if (selectedValue === 'code') {
    const nameRegex = new RegExp(searchArticleCol4.value, 'i')
    let filter = articles.filter(item => nameRegex.test(item.code)).slice(0,parseInt(document.getElementById('article_4_length').value))
    if (filter.length>0) {
      updateDataTableCol4(filter)
    }
    else {
      updateDataTableCol4([])
    }
  }
})
searchArticleCol4.addEventListener('keyup',async(e)=>{
  const radioButtons = document.querySelectorAll('[name="radioGroup-col_4"]');

  let selectedValue = null;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break; // Stop the loop when a checked radio is found
    }
  }
  if ((searchArticleCol4.value.length === 13 && selectedValue === 'barcode')||(selectedValue === 'barcode' && e.keyCode === 13)) {
    const articleFoundCol4 = articles.find(item => item.barcode === searchArticleCol4.value);
    if (articleFoundCol4) {
      searchArticleCol4.value = ''
      updateDataTableCol4([articleFoundCol4])
      let qty = document.getElementById('qty-col4').value
      let price = articleFoundCol4.price_few
      if (articleFoundCol4.price_few_discount) {
        if (articleFoundCol4.target_few === 'all') {
          const currentDate = new Date();
          const discountExpirationDate = new Date(articleFoundCol4.discount_date_few)
          const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
          if (startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate) {
            price = articleFoundCol4.price_few_discount
          }
        }
        if (articleFoundCol4.target_few === 'card'&& buyer.col4) {
          const currentDate = new Date();
          const discountExpirationDate = new Date(articleFoundCol4.discount_date_few)
          const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
          if (startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate) {
            price = articleFoundCol4.price_few_discount
          }
        }
      }
      try {
        const res = await fetch('/api/v1/sales/add-sale-pos', {
          method: 'POST',
          body: JSON.stringify({ qty, total_price: parseFloat(price * qty).toFixed(2), price_few: price, discount: parseFloat((articleFoundCol4.price_few - price) * qty).toFixed(2), article: articleFoundCol4._id, barcode: articleFoundCol4.barcode, colon: 'col_4', tvsh: articleFoundCol4.tvsh }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.errors) {
          const e = document.getElementsByClassName('show-errors-sales')
          for (var elm of e) {
            elm.textContent = ''
          }
          for (var key of Object.keys(data.errors)) {

            if (data.errors[key]) {
              const p = document.getElementById(`${key}-sales-error`)
              if (p) {
                p.textContent = data.errors[key]
              }
            }
          }
        }
        if (!data.errors) {
          const e = document.getElementsByClassName('show-errors-sales')
          for (var elm of e) {
            elm.textContent = ''
          }
          ColFourTable.search(document.getElementById('col_4_table_search').value).draw()
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      updateDataTableCol4([])
    }
  }
})
$('#qty-check-4').on('change', () => {
  document.getElementById('qty-col4').value = 1
  if (document.getElementById('qty-check-4').checked) {
    document.getElementById('qty-col4').classList.add('d-none')
  }
  else {
    document.getElementById('qty-col4').classList.remove('d-none')
  }
})