document.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "F1":
            event.preventDefault();
            window.location.href = "/admin/index"; // Redirect to the specified URL for F1
            break;
        case "F2":
            event.preventDefault();
            window.location.href = "/pos/index"; // Redirect to the specified URL for F2
            break;
        case "F3":
            event.preventDefault();
            var giftCardLink = document.querySelector("[data-bs-target='#gift_card']");
            if (giftCardLink) {
                giftCardLink.click();
            }
            break;
        case "F4":
            event.preventDefault();
            var expensesLink = document.querySelector("[data-bs-target='#expenses']");
            if (expensesLink) {
                expensesLink.click();
            }
            break;
        case "F5":
            event.preventDefault();
            window.location.href = "/pos/partner"; // Redirect to the specified URL for F5
            break;
        case "F6":
            event.preventDefault();
            var calculatorLink = document.querySelector("[data-kt-menu-attach='parent']");
            if (calculatorLink) {
                calculatorLink.click();
            }
            break;
        case "F7":
            event.preventDefault();
            window.location.href = "/pos/search-product"; // Redirect to the specified URL for F7
            break;
        case "F8":
            event.preventDefault();
            window.location.href = "/pos/arc"; // Redirect to the specified URL for F8
            break;
        case "F9":
            event.preventDefault();
            var payId = document.getElementById("pay_id");
            if (payId) {
                payId.click();
            }
            break;
        case "F10":
            event.preventDefault();
            var keshLink = document.getElementById("keshLink");
            if (keshLink) {
                keshLink.click();
            }
            break;
        default:
            break;
    }
});