let strategicinvestmentTable
$(document).ready(function () {
  moment.locale('sq')
   strategicinvestmentTable = $('#strategic_investment_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/statistic/get-strategic-investment',
    data:(d)=>{
     d.unit = document.getElementById('unit').value
     d.year = document.getElementById('year').value
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 7 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'category.name' },
      { data: 'amount' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center pe-0" ${data.note.length>10?`onclick="Swal.fire('${data.note}')"`:''}>
          ${data.note.length>10?data.note.slice(0, 10 - 1) +'...':data.note
          }
      </td>`;
        },
      },
      { data: 'user.full_name' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="  text-center pe-0">
          ${moment(data.createdAt).format('LLL')}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="  text-center pe-0">
          ${moment(data.updatedAt).format('LLL')}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a id="${data._id}" data-bs-toggle="tooltip" edit-amount-strategicinvetsment="true"
              aria-label="Përditëso" 
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-kt-delete-strategic-investment="true"
              aria-label="Fshij" data-bs-original-title="Fshij">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  const resetSuccess = () =>{
    strategicinvestmentTable.search('').draw()
  }
  function editAbonim() {

    const n = document.querySelectorAll(
      '[edit-amount-strategicinvetsment="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const amount = o.querySelectorAll('td')[2].innerText
        const swalConfig = {
          title: 'Edito investimin e strategjik',
          html:
            '<div>' +
            '<p id="sw-amount-invest-error" class="show-errors-invest-swal text-danger mb0"></p>' +
            `<input type="number" step=".01" min="0.1" id="swal-amount-invest"  class="form-control form-control-solid"  value="${amount}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,

          preConfirm: async () => {
            const amount = document.getElementById('swal-amount-invest').value
            try {
              const res = await fetch('/api/v1/statistic/edit-strategic-investment', {
                method: 'PATCH',
                body: JSON.stringify({ id, amount }),
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status == 'fail') {
                const e = document.getElementsByClassName('show-errors-invest-swal')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`sw-${key}-invest-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
              }
                return false
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message)
                strategicinvestmentTable.draw()
                const e = document.getElementsByClassName('show-errors-invest-swal')
                for(var elm of e){
                  elm.textContent=''
               }
                return true
              }
            }
            catch (err) {
              console.log(err);
            }
          },
          didOpen:()=>{
            setTimeout(()=>{ $('#swal-amount-pronar').focus()},10)
          }
        }

        const { value: formValues } = await Swal.fire(swalConfig)

      })
    })
  }
  function swalDeleteSub() {
    const n = document.querySelectorAll(
      '[data-kt-delete-strategic-investment="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini investimin ',
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
                text: 'Ti fshive investimin',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/statistic/delete-strategic-investment', {
                   method: 'DELETE',
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
                text:"Investimi nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  const search_input1 = document.getElementById('strategic_investment_table_search')
  search_input1.addEventListener('keyup', (e) => {
    categoryTable.search(e.target.value).draw()
  })
  strategicinvestmentTable.on('draw', () => {
    swalDeleteSub()
    editAbonim()
    KTMenu.createInstances()
  })
})

const strategicInvestmentButton = document.getElementById('create_strategic_investment_form_submit_btn')

strategicInvestmentButton.addEventListener('click',async(e)=>{
    try{
        showLoadingSpinner()
        fetch('/api/v1/statistic/add-strategic-investment', {
         method: 'POST',
         body: JSON.stringify({ amount:document.getElementById('amount-invest').value,year:document.getElementById('year').value,unit:document.getElementById('unit').value,category:document.getElementById('category').value,note:document.getElementById('note').value }),
         headers: { 'Content-Type': 'application/json' },
       })
          .then(response => response.json())
          .then(data => {
            hideLoadingSpinner()
            if(data.status == 'fail' && data.errors){
                const e = document.getElementsByClassName('show-invest-error')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`${key}-invest-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
            }
            }
          if(data.status ==='success'){
            const e = document.getElementsByClassName('show-invest-error')
       for(var elm of e){
         elm.textContent=''
      }
strategicinvestmentTable.draw()
          }
          })
          .catch(error => console.error(error));
    }
    catch(e){
      hideLoadingSpinner()
        console.log(e)
    }
})