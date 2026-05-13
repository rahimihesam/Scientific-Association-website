document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const toggleBtn = document.getElementById("togglePassword");
  const eyeIcon = document.getElementById("eyeIcon");
  const passwordInput = document.getElementById("password");
  const strengthFill = document.getElementById("strengthFill");
  const strengthLabel = document.getElementById("strengthLabel");
  const passwordError = document.getElementById("passwordError");

  const eyeOpen = `<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>`;
  const eyeClosed = `<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>`;

  toggleBtn.addEventListener("click", () => {
    const isPass = passwordInput.type === "password";
    passwordInput.type = isPass ? "text" : "password";
    eyeIcon.innerHTML = isPass ? eyeClosed : eyeOpen;
  });

  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    passwordError.textContent = "";
    passwordInput.classList.remove("is-invalid");

    if (val.length === 0) {
      strengthFill.style.width = "0%";
      strengthLabel.textContent = "";
      return;
    }

    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { width: "25%", cls: "bg-danger", label: "ضعیف", labelCls: "text-danger" },
      { width: "50%", cls: "bg-warning", label: "متوسط", labelCls: "text-warning" },
      { width: "75%", cls: "bg-info", label: "خوب", labelCls: "text-info" },
      { width: "100%", cls: "bg-success", label: "قوی", labelCls: "text-success" },
    ];

    const lvl = levels[score - 1] || levels[0];
    strengthFill.style.width = lvl.width;
    strengthFill.className = `strength-fill ${lvl.cls}`;
    strengthLabel.textContent = `قدرت رمز: ${lvl.label}`;
    strengthLabel.className = `small ${lvl.labelCls}`;
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      let valid = true;

      fullNameInput.addEventListener("blur", () => {
        if (!fullNameInput.value) return;
        const ok = fullNameInput.value.length >= 3;
        fullNameInput.classList.toggle("is-valid", ok);
        fullNameInput.classList.toggle("is-invalid", !ok);
      });

      emailInput.addEventListener("blur", () => {
        if (!emailInput.value) return;
        const ok = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailInput.value);
        emailInput.classList.toggle("is-valid", ok);
        emailInput.classList.toggle("is-invalid", !ok);
      });

      mobileInput.addEventListener("blur", () => {
        if (!mobileInput.value) return;
        const ok = /^09[0-9]{9}$/.test(mobileInput.value);
        mobileInput.classList.toggle("is-valid", ok);
        mobileInput.classList.toggle("is-invalid", !ok);
      });

      mobileInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      });

      if (passwordInput) {
        if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
          passwordInput.classList.add("is-invalid");
          passwordInput.classList.remove("is-valid");
          if (passwordError) {
            passwordError.textContent = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
          }
          valid = false;
        } else if (passwordInput.value.length >= 8) {
          passwordInput.classList.add("is-valid");
          passwordInput.classList.remove("is-invalid");
        } else {
          passwordInput.classList.remove("is-invalid", "is-valid");
        }
      }
    });

    form.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.classList.contains("is-invalid")) {
          input.classList.remove("is-invalid");
        }
      });
    });
  }
});
