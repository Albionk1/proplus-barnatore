$(document).ready(function () {
    const form = document.getElementById('edit-worker-form')
      form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        try {
          const id =location.pathname.split('/')[3]
          const acceses =$('#access').val()
        const full_name = document.getElementById('full_name').value
        const unit = $('#unit').val()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const role = document.getElementById('role').value
        const access = acceses.join(',')
        const phone_number = document.getElementById('phone_number').value
        const bank = document.getElementById('bank').value
        const salary_neto = document.getElementById('salary_neto').value
        const salary_bruto = document.getElementById('salary_bruto').value
        const comment = document.getElementById('comment').value
        const res = await fetch('/api/v1/auth/edit-worker', {
          method: 'POST',
          body: JSON.stringify({id, full_name,unit,username,password,role, access,phone_number, bank,salary_neto,salary_bruto,comment}),
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
         location.assign('/admin/workers')
         },1000)
        }
      } catch (err) {
        console.log(err)
      }
      })})
      const managmentAccess=[{value:'sales_many',text:'Shitje me shumic'},{value:'statistic',text:'Statistikat'},{value:'cash_register',text:'Arka'},{value:'stock',text:'Stoku'},{value:'actions',text:'Aksionet'},{value:'offerts',text:'Oferto'},{value:'supply',text:'Furnizimet'},{value:'intern_exhange',text:'Levizje interne'},{value:'article',text:'Artikujt'},{value:'clients',text:'Klientët'},{value:'workers',text:'Puntorët'},{value:'company',text:'Kompania'},{value:'partners',text:'Partnerët'}]
      const postAccess = [{value:'pos',text:'Pos'},{value:'arc',text:'Arka'}]
      const adminAccess = [{value:'admin',text:'Admin'}]
      // $('#access').empty();
      const units = document.getElementById('unit').querySelectorAll('option')
      // Re-initialize select2 with an empty list of options
      // $('#access').select2({
      //   data: []
      // });
      
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
         
       });
