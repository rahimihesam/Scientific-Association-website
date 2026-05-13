/* -------- Image Preview -------- */

const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) {
    imagePreview.innerHTML = "بدون تصویر";
    return;
  }

  // Validation سایز و نوع
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (!file.type.startsWith("image/")) {
    alert("فایل انتخاب‌شده تصویر نیست.");
    imageInput.value = "";
    imagePreview.innerHTML = "بدون تصویر";
    return;
  }
  if (file.size > maxSize) {
    alert("حجم تصویر نباید بیشتر از 2 مگابایت باشد.");
    imageInput.value = "";
    imagePreview.innerHTML = "بدون تصویر";
    return;
  }

  // نمایش پیش‌نمایش
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Course Image">';
  };
  reader.readAsDataURL(file);
});

/* -------- Dynamic Prerequisites -------- */

const prereqList = document.getElementById("prereqList");
const addPrereqBtn = document.getElementById("addPrereqBtn");

let prereqCounter = 0;

function addPrerequisite(value = "") {
  prereqCounter++;
  const id = "prereq-" + prereqCounter;

  const wrapper = document.createElement("div");
  wrapper.className = "dynamic-item";
  wrapper.dataset.type = "prerequisite";

  wrapper.innerHTML = `
        <div class="dynamic-item-header">
            <span>پیش‌نیاز</span>
            <button type="button" class="btn btn-danger btn-sm js-remove">حذف</button>
        </div>
        <input class="C-input" type="text" class="js-prereq-input" placeholder="مثلاً آشنایی با HTML" value="${value}">
    `;

  prereqList.appendChild(wrapper);
}

addPrereqBtn.addEventListener("click", () => {
  addPrerequisite();
});

prereqList.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-remove")) {
    const item = e.target.closest(".dynamic-item");
    if (item) item.remove();
  }
});

/* -------- Dynamic Sections  -------- */

const sectionsList = document.getElementById("sectionsList");
const addSectionBtn = document.getElementById("addSectionBtn");

let sectionCounter = 0;

function addSection(
  data = {
    title: "",
    description: "",
  },
) {
  sectionCounter++;
  const id = "section-" + sectionCounter;

  const wrapper = document.createElement("div");
  wrapper.className = "dynamic-item";
  wrapper.dataset.type = "section";

  wrapper.innerHTML = `
        <div class="dynamic-item-header">
            <span>سرفصل</span>
            <button type="button" class="btn btn-danger btn-sm js-remove">حذف</button>
        </div>
        <div class="form-group">
            <label>عنوان سرفصل</label>
            <input class="C-input" type="text" class="js-section-title" placeholder="مثلاً مقدمه‌ای بر دوره" value="${data.title}">
        </div>
        <div class="form-group">
            <label>توضیح سرفصل</label>
            <textarea class="js-section-desc C-textarea" placeholder="در این بخش چه چیزهایی آموزش داده می‌شود؟">${data.description}</textarea>
        </div>
    `;

  sectionsList.appendChild(wrapper);
}

addSectionBtn.addEventListener("click", () => {
  addSection();
});

sectionsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-remove")) {
    const item = e.target.closest(".dynamic-item");
    if (item) item.remove();
  }
});

/* -------- Form Submit & Data Collect -------- */

const courseForm = document.getElementById("courseForm");
const outputDebug = document.getElementById("outputDebug");
const saveDraftBtn = document.getElementById("saveDraftBtn");

function collectFormData(status = "published") {
  const formData = new FormData(courseForm);

  // پایه
  const data = {
    title: formData.get("title")?.trim() || "",
    level: formData.get("level") || "",
    price: Number(formData.get("price") || 0),
    duration: formData.get("duration")?.trim() || "",
    instructorId: formData.get("instructorId") || null,
    description: formData.get("description")?.trim() || "",
    status, // 'draft' | 'published'
    prerequisites: [],
    syllabus: [],
  };

  // پیش‌نیازها
  prereqList.querySelectorAll(".dynamic-item").forEach((item) => {
    const input = item.querySelector(".js-prereq-input");
    if (input && input.value.trim() !== "") {
      data.prerequisites.push(input.value.trim());
    }
  });

  // سرفصل‌ها
  sectionsList.querySelectorAll(".dynamic-item").forEach((item) => {
    const titleInput = item.querySelector(".js-section-title");
    const descInput = item.querySelector(".js-section-desc");
    const title = titleInput?.value.trim() || "";
    const description = descInput?.value.trim() || "";
    if (title !== "" || description !== "") {
      data.syllabus.push({
        title,
        description,
      });
    }
  });

  return data;
}

courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = collectFormData("published");

  // نمونه ساده از Validation
  if (!data.title) {
    alert("نام دوره الزامی است.");
    return;
  }
  if (!data.level) {
    alert("سطح دوره را مشخص کنید.");
    return;
  }

  outputDebug.hidden = false;
  outputDebug.textContent = JSON.stringify(data, null, 2);
  alert("داده دوره آماده ارسال به سرور است (در کنسول پایین صفحه نمایش داده شد).");
});

saveDraftBtn.addEventListener("click", () => {
  const data = collectFormData("draft");
  outputDebug.hidden = false;
  outputDebug.textContent = JSON.stringify(data, null, 2);
  alert("پیش‌نویس آماده است (فقط در فرانت ذخیره/نمایش داده شده).");
});

addPrerequisite("آشنایی مقدماتی با کامپیوتر");
addSection({
  title: "معرفی دوره",
  description: "در این بخش با ساختار دوره و اهداف کلی آن آشنا می‌شوید.",
});
