function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = checkTime(day);
    month = checkTime(month);

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('real_time').innerHTML = day + "/" + month + "/" + year + " " + h + ":" + m + ":" + s;
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}