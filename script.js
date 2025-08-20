document.addEventListener("DOMContentLoaded", () => {
    // Fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".fade-in").forEach(el => {
        observer.observe(el);

        // If already visible on load
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("visible");
        }
    });

    // Contact form validation
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();
            let formMessage = document.getElementById("formMessage");

            if (name === "" || email === "" || message === "") {
                formMessage.style.color = "red";
                formMessage.textContent = "⚠ Please fill out all fields!";
                return;
            }

            // Basic email check
            let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.match(emailPattern)) {
                formMessage.style.color = "red";
                formMessage.textContent = "⚠ Please enter a valid email address!";
                return;
            }

            // Success message
            formMessage.style.color = "green";
            formMessage.textContent = "✅ Thank you, your message has been sent!";

            // Reset form
            form.reset();
        });
    }
});

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // stop page reload

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // send to backend
    const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    const data = await res.json();
    document.getElementById("response").innerText = data.message;
});
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  let response = await fetch("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  });

  let result = await response.json();
  document.getElementById("formMessage").innerText = result.message;
});