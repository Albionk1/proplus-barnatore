let workertable
$(document).ready(function () {
  const access = { 'sales_many': 'Shitje me shumic', 'statistic': 'Statistikat', 'cash_register': 'Arka', 'stock': 'Stoku', 'actions': 'Aksionet', 'offerts': 'Oferto', 'supply': 'Furnizimet', 'intern_exhange': 'Levizje interne', 'article': 'Artikujt', 'clients': 'Klientët', 'workers': 'Puntorët', 'company': 'Kompania', 'partners': 'Partnerët', 'pos': 'Pos', 'arc': 'Arka', 'admin': 'Admin' }
  const role = { superadmin: 'Admin', managment: 'Menagjment', pos: 'Pos' }
  const Month = { january: 'Janar', february: 'Shkurt', march: 'Mars',april:'Prill',may:'Maj',june:'Qershor',july:'Korrik',august:'Gusht',september:'Shtator',october:'Tetor',november:'Nëntor',december:'Dhjetor' }
  workertable = $('#worker_table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: '/api/v1/wages/get-workers-for-wages',
      data: (d) => {
        d.unit = document.getElementById('unit').value
        d.month = document.getElementById('month-filter').value
        d.year = document.getElementById('year1').value
      }
    },
    columnDefs: [
      { className: "text-center pe-0", targets: "_all" },
    ],
    columns: [
      { data: 'nr' },
      { data: 'full_name' },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${role[data.role]}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          const userAccessArray = data.access.split(',')
          const accessLabels = userAccessArray.map(accessRight => access[accessRight]);
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${accessLabels.join(', ')}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.salary_neto ? data.salary_neto + ' €' : '').toFixed(2)}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${parseFloat(data.salary_bruto ? data.salary_bruto + ' €' : '').toFixed(2)}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${data.date ? data.date : ''}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${document.getElementById('month-filter').value?Month[document.getElementById('month-filter').value]:''}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td
          class="text-gray-700 text-center fw-bold">
         ${document.getElementById('year1').value?document.getElementById('year1').value:''}/${data.isActive?'Aktiv':'Deaktiv'}
      </td>`;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a id="${data._id}" data-kt-pay-table="true"
              style="cursor: pointer;">
              <i id="${data._id}" class="fa-solid fa-money-bill text-primary fs-5"></i>
          </a>
      </td>`;
        },
      },
    ], lengthMenu: [
      [10, 20, 50, 100],
      [10, 20, 50, 100],
    ]
  })
  function swalPay() {
    const n = document.querySelectorAll(
      '[data-kt-pay-table="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tdtableext = o.querySelectorAll('td')[1].innerText
        const td_neto = o.querySelectorAll('td')[4].innerText
        const td_bruto = o.querySelectorAll('td')[5].innerText
        showLoadingSpinner()
              fetch('/api/v1/wages/get-workers-details', {
               method: 'POST',
               body: JSON.stringify({id,month:document.getElementById('month-filter').value,year:document.getElementById('year1').value }),
               headers: { 'Content-Type': 'application/json' },
             })
                .then(response => response.json())
                .then(data => {
                  hideLoadingSpinner()
                  if(data.status === 'fail'){
                    showErrorAlert(data.message)
                  }
                  if(data.status ==='success'){
                    workerId =id
                    $('#month-salary').val(document.getElementById('month-filter').value).trigger('change')
                   document.getElementById('show-debt').textContent=data.debt
                   document.getElementById('show-neto-salary').textContent=td_neto
                   document.getElementById('show-bruto-salary').textContent=td_bruto
                   document.getElementById('salary_after_debt').value=parseFloat(td_neto).toFixed(2)-data.debt*-1
                   const modal = $('#card_worker')
                   modal.modal('show')
                  }
                })
                .catch(error => console.error(error),hideLoadingSpinner());
      })
    })
  }
  const search_input1 = document.getElementById('worker_table_search')
  search_input1.addEventListener('keyup', (e) => {
    workertable.search(e.target.value).draw()
  })

  workertable.on('draw', () => {
    KTMenu.createInstances()
    swalPay()
  })
})
const filterBtn = document.getElementById('filtro-btn')
filterBtn.addEventListener('click',()=>{
  workertable.draw()
  getDetailsWorkers()
})
$("#unit").on("change", function() {
  workertable.draw()
 })