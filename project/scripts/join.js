document.addEventListener("DOMContentLoaded", function() {
    var timestampField = document.getElementById('timestamp');
    var now = new Date();
    timestampField.value = now.toISOString();

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('.membership-option').forEach(option => {
        observer.observe(option);
    });
});

// dialog
const oppenButton1 = document.querySelector('#openButton1');
const oppenButton2 = document.querySelector('#openButton2');
const oppenButton3 = document.querySelector('#openButton3');
const oppenButton4 = document.querySelector('#openButton4');
const dialogBox = document.querySelector('#mydialog');
const mytitle = document.querySelector('#mydialog h2'); 
const myinfo = document.querySelector('#mydialog p');
const closeButton = document.querySelector('#closeButton');

oppenButton1.addEventListener("click", () => {
    dialogBox.showModal();
    mytitle.innerHTML = `Non profit organizations and there is no fee.`
    myinfo.innerHTML = `<b>Description:</b> NP Membership is designed specifically for non-profit organizations. This membership level does not incur any fees, making it accessible for non-profit entities to join and benefit from the organization's offerings without financial burden.
The benefits include free conferences, basic business with agronomy courses, and giveaways.`;
});

oppenButton2.addEventListener("click", () => {
    dialogBox.showModal();
    mytitle.innerHTML = `Bronze Membersip.`
    myinfo.innerHTML = `<b>Description:</b> Bronze Membership is the entry-level tier, requiring a fee of 50 dollars. Members at this level enjoy foundational benefits, including access to all general events, basic training sessions about entrepreneurship, and nominal advertising opportunities within the organization's platforms. And if the members want to buy some of our products, they will get an 30% discount on the prices.`;
});

oppenButton3.addEventListener("click", () => {
    dialogBox.showModal();
    mytitle.innerHTML = `Silver Membership`
    myinfo.innerHTML = `<b>Description:</b> Members at this level pay a fee of 100 dollars, gaining access to more exclusive perks. These may include invitations to special events, and advanced training workshops about agronomy and how to handle the business with it. And if the members want to buy some of our products, they will get an 50% discount on the prices.`;
});

oppenButton4.addEventListener("click", () => {
    dialogBox.showModal();
    mytitle.innerHTML = `Gold Membership`
    myinfo.innerHTML = `<b>Description:</b> Gold Membership represents the premium tier within the organization. Members at this level pay a fee of 150 dollars and receive the most comprehensive set of benefits. These can include VIP access to all events, personalized training sessions, or consultations, and courses about how to be a great leader of business. Also, they will be a great part of this company, and if they have their own company, it will appear as the best company here. If the members want to buy some of our products, they will get an 80% discount on the prices.`;
});

closeButton.addEventListener('click', () => {
    dialogBox.close();
})

