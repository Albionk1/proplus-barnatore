"use strict";
var offersReservation = (function () {
    var e,
        t,
        n,
        r,
        o,
        a = (e, n, a) => {
            (r = e[0] ? new Date(e[0]) : null),
                (o = e[1] ? new Date(e[1]) : null),
                $.fn.dataTable.ext.search.push(function (e, t, n) {
                    var a = r,
                        c = o,
                        l = new Date(moment($(t[5]).text(), "DD/MM/YYYY")),
                        u = new Date(moment($(t[6]).text(), "DD/MM/YYYY"));
                    return (null === a && null === c) || (null === a && c >= u) || (a <= l && null === c) || (a <= l && c >= u);
                }),
                t.draw();
        },
        c = () => {
            e.querySelectorAll('[data-kt-ecommerce-order-filter="delete_row"]').forEach((e) => {
                e.addEventListener("click", function (e) {
                    e.preventDefault();
                    const n = e.target.closest("tr"),
                        r = n.querySelector('[data-kt-ecommerce-order-filter="order_id"]').innerText;
                    Swal.fire({
                        text: "Are you sure you want to delete order: " + r + "?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, delete!",
                        cancelButtonText: "No, cancel",
                        customClass: { confirmButton: "btn fw-bold btn-danger", cancelButton: "btn fw-bold btn-active-light-primary" },
                    }).then(function (e) {
                        e.value
                            ? Swal.fire({ text: "You have deleted " + r + "!.", icon: "success", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } }).then(function () {
                                  t.row($(n)).remove().draw();
                              })
                            : "cancel" === e.dismiss && Swal.fire({ text: r + " was not deleted.", icon: "error", buttonsStyling: !1, confirmButtonText: "Ok, got it!", customClass: { confirmButton: "btn fw-bold btn-primary" } });
                    });
                });
            });
        };
    return {
        init: function () {
            (e = document.querySelector("#kt_ecommerce_sales_table2")) &&
                ((t = $(e).DataTable({
                    info: !1,
                    order: [],
                    pageLength: 10,
                    columnDefs: [
                        { orderable: !1, targets: 0 },
                        { orderable: !1, targets: 7 },
                    ],
                })).on("draw", function () {
                    c();
                }),
                (() => {
                    const e = document.querySelector("#kt_ecommerce_sales_flatpickr");
                    n = $(e).flatpickr({
                        altInput: !0,
                        altFormat: "d/m/Y",
                        dateFormat: "Y-m-d",
                        mode: "range",
                        onChange: function (e, t, n) {
                            a(e, t, n);
                        },
                    });
                })(),
                document.querySelector('[data-kt-ecommerce-order-filter2="search"]').addEventListener("keyup", function (e) {
                    t.search(e.target.value).draw();
                }),
                (() => {
                    const e = document.querySelector('[data-kt-ecommerce-order-filter="status"]');
                    $(e).on("change", (e) => {
                        let n = e.target.value;
                        "all" === n && (n = ""), t.column(3).search(n).draw();
                    });
                })(),
                c(),
                document.querySelector("#kt_ecommerce_sales_flatpickr_clear").addEventListener("click", (e) => {
                    n.clear();
                }));
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    offersReservation.init();
});
