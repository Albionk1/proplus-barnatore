let ownerinvestmentTable
$(document).ready(function () {
  moment.locale('sq')
   ownerinvestmentTable = $('#owner_investment_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:{url:'/api/v1/statistic/get-owner-investment',
    data:(d)=>{
     d.unit = document.getElementById('unit').value
     d.year = document.getElementById('year').value
    }
  },
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 3 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'amount' },
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
          return `<td class="text-center fw-bold pt-3">
          <a id="${data._id}" data-bs-toggle="tooltip" edit-amount-ownerinvetsment="true"
              aria-label="Përditëso" 
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-kt-delete-owner-investment="true"
              aria-label="Fshij" data-bs-original-title="Fshij">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  const resetSuccess = () =>{
    ownerinvestmentTable.search('').draw()
  }
  function editAbonim() {

    const n = document.querySelectorAll(
      '[edit-amount-ownerinvetsment="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const amount = o.querySelectorAll('td')[1].innerText
        const swalConfig = {
          title: 'Edito Investimin e pronarit',
          html:
            '<div>' +
            '<p id="sw-amount-pronar-error" class="show-errors-pronar-swal text-danger mb0"></p>' +
            `<input type="number" step=".01" min="0.1" id="swal-amount-pronar"  class="form-control form-control-solid"  value="${amount}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,

          preConfirm: async () => {
            const amount = document.getElementById('swal-amount-pronar').value
            try {
              const res = await fetch('/api/v1/statistic/edit-owner-investment', {
                method: 'PATCH',
                body: JSON.stringify({ id, amount }),
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status == 'fail') {
                const e = document.getElementsByClassName('show-errors-pronar-swal')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`sw-${key}-pronar-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
              }
                return false
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message)
                ownerinvestmentTable.draw()
                const e = document.getElementsByClassName('show-errors-pronar-swal')
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
      '[data-kt-delete-owner-investment="true"]'
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
                const res = await fetch('/api/v1/statistic/delete-owner-investment', {
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
  ownerinvestmentTable.on('draw', () => {
    swalDeleteSub()
    editAbonim()
    KTMenu.createInstances()
  })
})

const ownerInvestmentButton = document.getElementById('create_owner_investment')

ownerInvestmentButton.addEventListener('click',async(e)=>{
    try{
        showLoadingSpinner()
        fetch('/api/v1/statistic/add-owner-investment', {
         method: 'POST',
         body: JSON.stringify({ amount:document.getElementById('amount_pronar').value,year:document.getElementById('year').value,unit:document.getElementById('unit').value }),
         headers: { 'Content-Type': 'application/json' },
       })
          .then(response => response.json())
          .then(data => {
            hideLoadingSpinner()
            if(data.status == 'fail' && data.errors){
                const e = document.getElementsByClassName('show-pronar-error')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`${key}-pronar-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
            }
            }
          if(data.status ==='success'){
            const e = document.getElementsByClassName('show-pronar-error')
       for(var elm of e){
         elm.textContent=''
      }
ownerinvestmentTable.draw()
          }
          })
          .catch(error => console.error(error));
    }
    catch(e){
      hideLoadingSpinner()
        console.log(e)
    }
})