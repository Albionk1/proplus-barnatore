let categoryTable
$(document).ready(function () {
  moment.locale('sq')
   categoryTable = $('#category_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/statistic/get-category',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 3 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'name' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="  text-center pe-0">
          ${data.type ==='outcome'?'Dalje':'Investim strategjik'}
      </td>`;
        },
      },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-center fw-bold pt-3">
          <a id="${data._id}" data-bs-toggle="tooltip" edit-name-category="true"
              aria-label="Përditëso" 
              data-bs-original-title="Përditëso">
              <i id="${data._id}" class="fas fa-edit text-primary fs-5"></i>
          </a>
          <a id="${data._id}" class="ms-10" data-kt-delete-category="true"
              aria-label="Fshij" data-bs-original-title="Fshij">
              <i id="${data._id}" class="fas fa-trash-alt text-danger fs-5"></i>
          </a>
      </td>`;
        },
      },
    ]
  })
  const resetSuccess = () =>{
    categoryTable.search('').draw()
  }
  function editCategory() {

    const n = document.querySelectorAll(
      '[edit-name-category="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', async function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const name = o.querySelectorAll('td')[1].innerText
        const swalConfig = {
          title: 'Edito kategorin',
          html:
            '<div>' +
            '<p id="sw-name-category-error" class="show-errors-category-swal text-danger mb0"></p>' +
            `<input type="text" id="swal-name-category"  class="form-control form-control-solid"  value="${name}" >` +
            '</div>',
          confirmButtonColor: '#2abf52',
          confirmButtonText: 'Ruaj',
          focusConfirm: false,

          preConfirm: async () => {
            const name = document.getElementById('swal-name-category').value
            try {
              const res = await fetch('/api/v1/statistic/edit-category', {
                method: 'PATCH',
                body: JSON.stringify({ id, name }),
                headers: { 'Content-Type': 'application/json' }
              });
              const data = await res.json();
              if (data.status == 'fail') {
                const e = document.getElementsByClassName('show-errors-category-swal')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`sw-${key}-category-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
              }
                return false
              }
              if (data.status === 'success') {
                showSuccessAlert(data.message)
                categoryTable.draw()
                const e = document.getElementsByClassName('show-errors-category-swal')
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
        }

        const { value: formValues } = await Swal.fire(swalConfig)

      })
    })
  }
  function swalDeleteCategory() {
    const n = document.querySelectorAll(
      '[data-kt-delete-category="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini kategorin ',
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
                text: 'Ti fshive kategorin',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/statistic/delete-category', {
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
                text:"Kategoria nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  const search_input1 = document.getElementById('category_table_search')
  search_input1.addEventListener('keyup', (e) => {
    categoryTable.search(e.target.value).draw()
  })
  categoryTable.on('draw', () => {
    swalDeleteCategory()
    editCategory()
    KTMenu.createInstances()
  })
})

const categoryButton = document.getElementById('create_outcome_category_form_submit_btn')

categoryButton.addEventListener('click',async(e)=>{
    try{
        showLoadingSpinner()
        fetch('/api/v1/statistic/create-category', {
         method: 'POST',
         body: JSON.stringify({ name:document.getElementById('category-name').value,type:$('input[name="type"]:checked').val()}),
         headers: { 'Content-Type': 'application/json' },
       })
          .then(response => response.json())
          .then(data => {
            hideLoadingSpinner()
            if(data.status == 'fail' && data.errors){
                const e = document.getElementsByClassName('show-category-error')
                for(var elm of e){
                  elm.textContent=''
               }
               for(var key of Object.keys(data.errors)){
            
                if(data.errors[key]){
                 const p = document.getElementById(`${key}-category-error`)
                 if(p){
                 p.textContent = data.errors[key]}
                }
            }
            }
          if(data.status ==='success'){
            const e = document.getElementsByClassName('show-category-error')
       for(var elm of e){
         elm.textContent=''
      }
      categoryTable.draw()
     if($('input[name="type"]:checked').val()==='strategic_investment'){
      let select =$('#category').data('select2')
      const newOption = $('<option>', {
        value: data.id,
        text:document.getElementById('category-name').value
      });

      select.append(newOption)
      $('#category').trigger('change.select2');
     }else{
      let select =$('#category_outcome').data('select2')
      const newOption = $('<option>', {
        value: data.id,
        text:document.getElementById('category-name').value
      });
      select.append(newOption)
      $('#category_outcome').trigger('change.select2');
     } 
          }
          })
          .catch(error => console.error(error));
    }
    catch(e){
      hideLoadingSpinner()
        console.log(e)
    }
})