let ColFiveTable
let ColFiveTotalPrice
let ColFiveTotalArticle
$(document).ready(function () {
  ColFiveTable = $('#col_5_table').DataTable({
    processing: true,
    paging: false,
    serverSide: true,
    ajax: {
      url: '/api/v1/sales/get-sales-pos',
      data: (d) => {
        d.colon = 'col_5'
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
          return ` <a id="${data._id}" data-bs-toggle="tooltip" aria-label="Fshij" data-kt-delete-table-col-5="true"
          data-bs-original-title="Fshij">
          <i id="${data._id}"class="fas fa-times text-danger fs-3 pt-1 "></i>
      </a>`;
        },
      },
    ], drawCallback: function (settings) {
      var api = this.api();
      var data = api.ajax.json();
      if (document.getElementById('col_5_table_search').value === '') {
        // Calculate total_price and update 'colon_1_article'
        let total_price = 0;
        for (let i = 0; i < data.data.length; i++) {
          total_price += parseFloat(data.data[i].total_price);
        }

        document.querySelector('[col-5-delete="all"]').id = data.sale
        document.querySelector('[col-5-delete-i="all"]').id = data.sale
        ColFiveTotalPrice = total_price.toFixed(2)
        ColFiveTotalArticle = data.recordsTotal
        document.getElementById('colon_5_article').textContent = data.recordsTotal;
        document.getElementById('price-col-5').textContent = total_price.toFixed(2);

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


            $('#col_5_table').find('tr').each(function (i, e) {
              if (i !== 0) {
                var totalPriceText = parseFloat($(this).find('span[data-name="total_price"]').text());
                total_price += parseFloat(totalPriceText);
              }
            })
            // Update the total_price display
            $('#price-col-5').text(total_price.toFixed(2));
            ColFiveTotalPrice = total_price.toFixed(2)

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
                ColFiveTable.search(document.getElementById('col_5_table_search').value).draw()
              }
            } catch (err) {
              console.log(err)
            }
          })
        });
      }

    }
  })


  const search_input1 = document.getElementById('col_5_table_search')
  search_input1.addEventListener('keyup', (e) => {
    ColFiveTable.search(e.target.value).draw()
  })
  const resetSuccess = () => {
    ColFiveTable.search(document.getElementById('col_5_table_search').value).draw()
  }
  function swalDelete() {
    const n = document.querySelectorAll(
      '[data-kt-delete-table-col-5="true"]'
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
  ColFiveTable.on('draw', () => {
    KTMenu.createInstances()
    swalDelete()
  })
})
const searchArticleCol5 = document.getElementById('article-table-5-search')
searchArticleCol5.addEventListener('input', async (e) => {
  const radioButtons = document.querySelectorAll('[name="radioGroup-col_5"]');

  let selectedValue = null;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break; // Stop the loop when a checked radio is found
    }
  }
  if (selectedValue === 'name') {
    const nameRegex = new RegExp(searchArticleCol5.value, 'i')
    let filter = articles.filter(item => nameRegex.test(item.name)).slice(0,parseInt(document.getElementById('article_5_length').value))
    if (filter.length>0) {
      updateDataTableCol5(filter)
    }
    else {
      updateDataTableCol5([])

    }
  }
  if (selectedValue === 'code') {
    const nameRegex = new RegExp(searchArticleCol5.value, 'i')
    let filter = articles.find(item => nameRegex.test(item.code)).slice(0,parseInt(document.getElementById('article_5_length').value))
    if (filter.length>0) {
      updateDataTableCol5(filter)
    }
    else {
      updateDataTableCol5([])
    }
  }
})
searchArticleCol5.addEventListener('keyup',async(e)=>{
  const radioButtons = document.querySelectorAll('[name="radioGroup-col_5"]');

  let selectedValue = null;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break; // Stop the loop when a checked radio is found
    }
  }
  if ((searchArticleCol5.value.length === 13 && selectedValue === 'barcode')||(selectedValue === 'barcode' && e.keyCode === 13)) {
    const articleFoundCol5 = articles.find(item => item.barcode === searchArticleCol5.value);
    if (articleFoundCol5) {
      searchArticleCol5.value = ''
      updateDataTableCol5([articleFoundCol5])
      let qty = document.getElementById('qty-col5').value
      let price = articleFoundCol5.price_few
      if (articleFoundCol5.price_few_discount) {
        if (articleFoundCol5.target_few === 'all') {
          const currentDate = new Date();
          const discountExpirationDate = new Date(articleFoundCol5.discount_date_few)
          const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
          if (startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate) {
            price = articleFoundCol5.price_few_discount
          }
        }
        if (articleFoundCol5.target_few === 'card' && buyer.col5) {
          const currentDate = new Date();
          const discountExpirationDate = new Date(articleFoundCol5.discount_date_few)
          const startdiscountExpirationDate = new Date(foundArticle.discount_date_few_start)
          if (startdiscountExpirationDate<=currentDate &&currentDate <= discountExpirationDate) {
            price = articleFoundCol5.price_few_discount
          }
        }
      }
      try {
        const res = await fetch('/api/v1/sales/add-sale-pos', {
          method: 'POST',
          body: JSON.stringify({ qty, total_price: parseFloat(price * qty).toFixed(2), price_few: price, discount: parseFloat((articleFoundCol5.price_few - price) * qty).toFixed(2), article: articleFoundCol5._id, barcode: articleFoundCol5.barcode, colon: 'col_5', tvsh: articleFoundCol5.tvsh }),
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
          ColFiveTable.search(document.getElementById('col_5_table_search').value).draw()
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      updateDataTableCol5([])
    }
  }
})
$('#qty-check-5').on('change', () => {
  document.getElementById('qty-col5').value = 1
  if (document.getElementById('qty-check-5').checked) {
    document.getElementById('qty-col5').classList.add('d-none')
  }
  else {
    document.getElementById('qty-col5').classList.remove('d-none')
  }
})