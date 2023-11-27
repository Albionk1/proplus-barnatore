  
  const convertDateToDateTimeLocal = (date) =>
  new Date(date.getTime() + date.getTimezoneOffset() * -60 * 1000)
    .toISOString()
    .slice(0, 19)

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
    cancelButton: 'btn btn-success',
  },
  buttonsStyling: false,
})

const showSuccessAlert = (message) => {
  Swal.fire({
      text: message,
      icon: 'success',
      buttonsStyling: !1,
      confirmButtonText: 'Okay',
      customClass: { confirmButton: 'btn btn-primary' },
    })
}

const showErrorAlert = (message) => {
  Swal.fire({
      text: message,
      icon: 'error',
      buttonsStyling: !1,
      confirmButtonText: 'Okay',
      customClass: { confirmButton: 'btn btn-primary' },
    })
}



const showLoadingSpinner = () => {
    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }
  
  const hideLoadingSpinner = () => {
    Swal.close()
  }

  const disableButton = (button) => {
    button.classList.add('btn-disabled')
    button.disabled = true
  }
  
  const enableButton = (button) => {
    button.classList.remove('btn-disabled')
    button.disabled = false
  }

  async function compressImages(filesToCompres, output){
    return new Promise(async function(resolve){
        let numProcessedImages = 0
        let numImagesToProcess = filesToCompres.length
        for (let i = 0; i < numImagesToProcess; i++){
          
            const file = filesToCompres[i]
            // console.log(file)
           
            await new Promise(resolve =>{
                new Compressor(file, {
                    quality: 0.6,
                    success(result){
                      
                      const file1 = new File([result], result.name, {type: result.type})
                      
                        output.push(file1)
                        resolve()
                    }
                })
            })
            numProcessedImages += 1
        }
        if (numProcessedImages === numImagesToProcess){
            resolve()
        }
    })
  }

const separateWithComma = (num) => {
return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
  

