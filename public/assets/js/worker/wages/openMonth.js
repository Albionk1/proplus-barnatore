const yearSelectOutcome = $("#year");
const yearSelectOutcome1 = $("#year1");
const yearSelectOutcome2 = $("#year2");

const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 2023; year--) {
 const option = new Option(year, year);
 const option1 = new Option(year, year);
 const option2 = new Option(year, year);

 if (year === currentYear) {
   option.setAttribute("selected", "selected");
   option1.setAttribute("selected", "selected");
   option2.setAttribute("selected", "selected");
 }

 yearSelectOutcome.append(option);
 yearSelectOutcome1.append(option1);
 yearSelectOutcome2.append(option2);
}

yearSelectOutcome.select2();
yearSelectOutcome1.select2();
yearSelectOutcome2.select2();
const openMonthButton = document.getElementById('openMonthButton')

openMonthButton.addEventListener('click',async(e)=>{
  try{
    const month = document.getElementById('open-month').value
    const year = document.getElementById('year2').value
    showLoadingSpinner()
              fetch('/api/v1/wages/open-month', {
               method: 'POST',
               body: JSON.stringify({month,year }),
               headers: { 'Content-Type': 'application/json' },
             })
                .then(response => response.json())
                .then(data => {
                  hideLoadingSpinner()
                  console.log(data)
                  if(data.status === 'fail'){
                    const e = document.getElementsByClassName('show-errors-month')
                    for(var elm of e){
                      elm.textContent=''
                   }
                   if(data.errors){
                    for(var key of Object.keys(data.errors)){
                
                    if(data.errors[key]){
                     const p = document.getElementById(`${key}-month-error`)
                     if(p){
                     p.textContent = data.errors[key]}
                    }
                  }
                   }
                   if(data.message){
                    showErrorAlert(data.message)
                   }
                  }
                  if(data.status ==='success'){
                    const e = document.getElementsByClassName('show-errors-month')
                    for(var elm of e){
                      elm.textContent=''
                   }
                  }
                })
                .catch(error => console.error(error));
  }
  catch(e){
    console.log(e)
  }
})