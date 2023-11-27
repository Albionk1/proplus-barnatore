let subtable
$(document).ready(function () {
   subtable = $('#subgroup_table').DataTable({
    processing: true,
    serverSide: true,
    ajax:'/api/v1/article/get-subgroups',
    columnDefs: [
        { className: "text-center pe-0", targets: "_all" },
        { orderable: !1, targets: 3 },
    ],
    columns: [
      { data: 'nr' },
      { data: 'group.name' },
      { data: 'name' },
      {
        data: null,
        className: 'text-end',
        render: function (data, type, row) {
          return `<td class="text-gray-700 text-center fw-bold">
          <a id="${data._id}" data-bs-toggle="tooltip" data-kt-delete-subgroup="true">
              <i id="${data._id}" class="fas fa-times text-danger fs-3 pt-1 "></i>
          </a>
      </td>`;
        },
      },
    ]
  })
 
  const search_input1 = document.getElementById('subgroup-table-search')
  search_input1.addEventListener('keyup', (e) => {
    subtable.search(e.target.value).draw()
  })
  const resetSuccess = () =>{
    subtable.search('').draw()
  }
  function swalDeleteSub() {
    const select1 = $('#subgroup');
const select2Instance1 = select1.select2();
    const n = document.querySelectorAll(
      '[data-kt-delete-subgroup="true"]'
    )
    n.forEach((e) => {
      e.addEventListener('click', function (e) {
        e.preventDefault()
        const id = e.path ? e.path[0].id : e.target.id
        const o = e.target.closest('tr')
        const tsubtableext = o.querySelectorAll('td')[2].innerText
        Swal.fire({
          text: 'A jeni të sigurt që doni ta fshini nën grupin: ' + tsubtableext,
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
                text: 'Ti fshive nën grupin ' + tsubtableext + '!.',
                icon: 'success',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              }).then(async function () {
                const res = await fetch('/api/v1/article/delete-subgroup', {
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
                   const optionToRemove1 = select1.find(`option[value="${id}"]`);
                   if (optionToRemove1.length > 0) {
                     optionToRemove1.remove();
                     select2Instance1.trigger('change');
                   }
                }
              })
            : 'cancel' === e.dismiss &&
              Swal.fire({
                text:"Nën grupi: "+tsubtableext+" nuk u fshi",
                icon: 'error',
                buttonsStyling: !1,
                confirmButtonText: 'Në rregull',
                customClass: { confirmButton: 'btn fw-bold btn-primary' },
              })
        })
      })
    })
  }
  subtable.on('draw', () => {
    swalDeleteSub()
    KTMenu.createInstances()
  })
})
function addSubGrup(){
  const form = document.getElementById('form-add-subgrup')
  form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    try {
    const name = document.getElementById('subgroup-name').value
    const group = document.getElementById('subgroup-grname').value
    const res = await fetch('/api/v1/article/add-subgroup', {
      method: 'POST',
      body: JSON.stringify({ name,group }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    if (data.errors) {
      const e = document.getElementsByClassName('show-errors-subgroup')
    for(var elm of e){
      elm.textContent=''
   }
   for(var key of Object.keys(data.errors)){

    if(data.errors[key]){
     const p = document.getElementById(`${key}-group-error`)
     if(p){
     p.textContent = data.errors[key]}
    }
  }
    }
    if (!data.errors) {
      const e = document.getElementsByClassName('show-errors-group')
      for(var elm of e){
        elm.textContent=''
     }
     const newOption = $('<option>', {
      value: data.id,
      text: name
    });
    $('#subgroup').append(newOption);
    $('#subgroup').trigger('change.select2');
     showSuccessAlert(data.message)
     subtable.search('').draw()
    }
  } catch (err) {
    console.log(err)
  }
  })
  
}
addSubGrup()