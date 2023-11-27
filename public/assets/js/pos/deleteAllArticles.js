function deleteAllArticles() {
    const n = document.querySelectorAll('[kt-delete-all="articles"]');
    n.forEach((e) => {
        e.addEventListener('click', function (e) {
            e.preventDefault();
            const id = e.path ? e.path[0].id : e.target.id;
            if (!id) {
                return showErrorAlert('Nuk keni asnjë artikull për ta fshir');
            }
            Swal.fire({
                text: 'A jeni të sigurt që doni ta fshini të gjitha artikulljt nga shitja',
                icon: 'warning',
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: 'Po, fshiji',
                cancelButtonText: "Jo, mos e fshi",
                customClass: {
                    confirmButton: 'btn fw-bold btn-danger',
                    cancelButton: 'btn fw-bold btn-primary',
                },
            }).then(function (e) {
                e.value
                    ? fetch('/api/v1/sales/delete-all-articles', {
                        method: 'PATCH',
                        body: JSON.stringify({ id }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(async (res) => {
                            const data = await res.json();
                            if (data.status == 'fail') {
                                showErrorAlert(data.message);
                            }
                            if (data.status == 'success') {
                                showSuccessAlert(data.message);
                                ColOneTable.search(document.getElementById('col_1_table_search').value).draw();
                                ColTwoTable.search(document.getElementById('col_2_table_search').value).draw();
                                ColThreeTable.search(document.getElementById('col_3_table_search').value).draw();
                                ColFourTable.search(document.getElementById('col_4_table_search').value).draw();
                                ColFiveTable.search(document.getElementById('col_5_table_search').value).draw();
                            }
                        })
                    : 'cancel' === e.dismiss &&
                    Swal.fire({
                        text: "Artikujt nuk u fshin nga shitja",
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Në rregull',
                        customClass: { confirmButton: 'btn fw-bold btn-primary' },
                    });
            });
        });
    });
}


deleteAllArticles()