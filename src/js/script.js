document.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector(".custom-toggler");
  toggler.addEventListener("click", () => {
    toggler.classList.toggle("active");
  });
});

// Notif
const params = new URLSearchParams(window.location.search);
if (params.get("login") === "success") {
  const toastEl = document.getElementById("loginToast");
  const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
  toast.show();
}

// Search page
document.addEventListener("DOMContentLoaded", function () {
  const q = document.getElementById("search-query");
  const summary = document.getElementById("search-term-label");
  const results = document.getElementById("search-results");
  const empty = document.getElementById("search-empty");
  const count = document.getElementById("result-count-label");

  document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = q.value.trim();
    summary.textContent = value || "–";

    if (!value) {
      results.classList.add("d-none");
      empty.classList.remove("d-none");
      count.textContent = "۰ نتیجه یافت شد";
    } else {
      results.classList.remove("d-none");
      empty.classList.add("d-none");
      count.textContent = "۳ نتیجه یافت شد";
    }
  });
});
