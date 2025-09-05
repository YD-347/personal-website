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

        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add("visible");
        }
    });

    // Contact form logic
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            // Validation
            if (!name || !email || !message) {
                formMessage.style.color = "red";
                formMessage.textContent = "⚠ Please fill out all fields!";
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
            if (!email.match(emailPattern)) {
                formMessage.style.color = "red";
                formMessage.textContent = "⚠ Please enter a valid email address!";
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await response.json();
                formMessage.style.color = "green";
                formMessage.textContent = data.message || "✅ Your message has been sent!";
                form.reset();
            } catch (error) {
                formMessage.style.color = "red";
                formMessage.textContent = "❌ Something went wrong. Please try again later.";
                console.error(error);
            }
        });
    }
});

  const dots = document.querySelector(".menu-dots");
  const dropdown = document.querySelector(".dropdown");

  dots.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  });

  // Close menu if click outside
  window.addEventListener("click", function(e) {
    if (!e.target.matches('.menu-dots')) {
      dropdown.style.display = "none";
    }
  });

