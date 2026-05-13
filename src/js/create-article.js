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
            <span>ریزعنوان</span>
            <button type="button" class="btn btn-danger btn-sm js-remove">حذف</button>
        </div>
        <div class="form-group">
            <label>ریزعنوان</label>
            <input class="C-input" type="text" class="js-section-title" value="${data.title}">
        </div>
        <div class="form-group">
            <label> توضیحات</label>
            <textarea class="js-section-desc C-textarea" >${data.description}</textarea>
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
  }
});

addPrerequisite("آشنایی مقدماتی با کامپیوتر");
addSection({
  title: "معرفی دوره",
  description: "در این بخش با ساختار دوره و اهداف کلی آن آشنا می‌شوید.",
});
