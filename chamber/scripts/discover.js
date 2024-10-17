document.addEventListener("DOMContentLoaded", function() {
    const visit = document.querySelector('#visit');
    const firstVisit = localStorage.getItem('firstVisit');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    let message;

    if (firstVisit == null) {
        localStorage.setItem('firstVisit', currentTime.toString());
        visit.innerHTML = `Welcome! Let us know if you have any questions.`
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (timeDifference < 1000 * 60 * 60 * 24) {
            visit.innerHTML = `Back so soon! Awesome!`;
        } else {
            visit.innerHTML = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
        }
    }
    localStorage.setItem('lastVisit', currentTime.toString());

});
