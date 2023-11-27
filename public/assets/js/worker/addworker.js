$(document).ready(function () {
    const form = document.getElementById('add-worker-form')
      form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        try {
          const acceses =$('#access').val()
        const full_name = document.getElementById('full_name').value
        const unit = $('#unit').val()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const role = document.getElementById('role').value
        const access = acceses.join(',')
        const date = document.getElementById('kt_datepicker_1').value
        const phone_number = document.getElementById('phone_number').value
        const bank = document.getElementById('bank').value
        const salary_neto = document.getElementById('salary_neto').value
        const salary_bruto = document.getElementById('salary_bruto').value
        const comment = document.getElementById('comment').value
        const start_work = document.getElementById('start_work').value
        const end_work = document.getElementById('end_work').value
        const regular = document.getElementById('regular').checked
        const res = await fetch('/api/v1/auth/add-worker', {
          method: 'POST',
          body: JSON.stringify({ full_name,unit,username,password,role, access,date,phone_number, bank,salary_neto,salary_bruto,regular,comment,start_work,end_work}),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        if (data.errors) {
          const e = document.getElementsByClassName('show-errors')
        for(var elm of e){
          elm.textContent=''
       }
       for(var key of Object.keys(data.errors)){
    
        if(data.errors[key]){
         const p = document.getElementById(`${key}-error`)
         if(p){
         p.textContent = data.errors[key]}
        }
      }
        }
        if (!data.errors) {
          const e = document.getElementsByClassName('show-errors')
          for(var elm of e){
            elm.textContent=''
         }
         showSuccessAlert(data.message)
         setTimeout(()=>{
         location.assign('/admin/worker-new')
         },1000)
        }
      } catch (err) {
        console.log(err)
      }
      })})
      const managmentAccess=[{value:'sales_many',text:'Shitje me shumic'},{value:'statistic',text:'Statistikat'},{value:'cash_register',text:'Arka'},{value:'stock',text:'Stoku'},{value:'actions',text:'Aksionet'},{value:'offerts',text:'Oferto'},{value:'supply',text:'Furnizimet'},{value:'intern_exhange',text:'Levizje interne'},{value:'article',text:'Artikujt'},{value:'clients',text:'Klientët'},{value:'workers',text:'Puntorët'},{value:'company',text:'Kompania'},{value:'partners',text:'Partnerët'}]
      const postAccess = [{value:'pos',text:'Pos'},{value:'arc',text:'Arka'}]
      const adminAccess = [{value:'admin',text:'Admin'}]
      const counterAccess = [{value:'counter',text:'Numërues stoku'}]
      $('#access').empty();
      const units = document.getElementById('unit').querySelectorAll('option')
      // Re-initialize select2 with an empty list of options
      $('#access').select2({
        data: []
      });
      
      $("#role").change(async function(){
        $('#access').empty();
      $('#access').select2({
        data: []
      });
        if($(this).val() ==='superadmin'){
      for(var i =0;i<adminAccess.length;i++){
        $('#access').append($('<option>',adminAccess[i]));
      }
      document.getElementById('unit').removeAttribute('multiple')
      $('#unit').select2()
      $('#access').select2();

    } 
     if($(this).val()==='managment'){
      $('#access').append(new Option('Të gjitha', 'all', false, false))
      for(var i =0;i<managmentAccess.length;i++){
        $('#access').append($('<option>',managmentAccess[i]));
     }
     document.getElementById('unit').setAttribute('multiple','multiple')
      $('#unit').select2()
 

     $('#access').select2();
     $('#access').on('change', function () {
      if ($(this).val() && $(this).val().includes('all')) {
        const allValues = managmentAccess.map(item => item.value);
        $('#access').val(allValues).trigger('change');
      }
    });
     }    
     if($(this).val()==='pos'){
      for(var i =0;i<postAccess.length;i++){
        $('#access').append($('<option>',postAccess[i]));
     }
     document.getElementById('unit').removeAttribute('multiple')
     $('#unit').select2()
     $('#access').select2();
     }   
     if($(this).val()==='counter'){
      for(var i =0;i<counterAccess.length;i++){
        $('#access').append($('<option>',counterAccess[i]));
     }
     document.getElementById('unit').removeAttribute('multiple')
     $('#unit').select2()
     $('#access').select2();
     document.getElementById('kt_datepicker_1').disabled =true
     document.getElementById('phone_number').disabled =true
     document.getElementById('bank').disabled =true
     document.getElementById('salary_neto').disabled =true
     document.getElementById('salary_bruto').disabled =true
     document.getElementById('comment').disabled =true
     document.getElementById('start_work').disabled =true
     document.getElementById('end_work').disabled =true
     document.getElementById('regular').disabled =true
     }
     else{
      document.getElementById('kt_datepicker_1').disabled =false
     document.getElementById('phone_number').disabled =false
     document.getElementById('bank').disabled =false
     document.getElementById('salary_neto').disabled =false
     document.getElementById('salary_bruto').disabled =false
     document.getElementById('comment').disabled =false
     document.getElementById('start_work').disabled  =false
     document.getElementById('end_work').disabled =false
     document.getElementById('regular').disabled =false
     }
       });
