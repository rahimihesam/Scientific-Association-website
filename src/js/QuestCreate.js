let questionCounter = 1;

function getOptionsHTML(questionNum, type) {
    let html = '';
    const labels = ['الف', 'ب', 'ج', 'د'];
    const count = type === 'truefalse' ? 2 : 4;

    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) html += '<div class="col-md-6">';
        html += `
                <div class="mb-2">
                    <label class="option-label">گزینه ${labels[i]}</label>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="گزینه ${labels[i]}">
                        <span class="input-group-text">
                            <input class="form-check-input mt-0" type="radio" name="correct-${questionNum}" aria-label="صحیح">
                            <span class="me-1">صحیح</span>
                        </span>
                    </div>
                </div>
            `;
        if (i % 2 === 1 || i === count - 1) html += '</div>';
    }
    return html;
}

function renderOptions(questionNum, type) {
    const container = document.getElementById(`options-${questionNum}`);
    if (container) {
        container.innerHTML = getOptionsHTML(questionNum, type);
    }
}

function changeQuestionType(selectEl, questionNum) {
    const type = selectEl.value;
    const card = document.getElementById(`question-${questionNum}`);
    const codeSection = card.querySelector('.code-block-section');

    if (type === 'codeoutput') {
        codeSection.classList.remove('d-none');
    } else {
        codeSection.classList.add('d-none');
    }

    renderOptions(questionNum, type);
}

function addQuestion() {
    questionCounter++;
    const container = document.getElementById('questionsContainer');

    const div = document.createElement('div');
    div.className = 'question-card';
    div.id = `question-${questionCounter}`;
    div.innerHTML = `
            <div class="question-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">سؤال ${questionCounter}</h5>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-danger btn-icon" onclick="removeQuestion(${questionCounter})" title="حذف"><i class="bi bi-x-lg"></i> حذف</button>
                </div>
            </div>
            <div class="p-3">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">نوع سوال</label>
                        <select class="form-select question-type" onchange="changeQuestionType(this, ${questionCounter})">
                            <option value="truefalse">صحیح/غلط</option>
                            <option value="multiple">چند گزینه‌ای</option>
                            <option value="codeoutput">خروجی کد</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="Q-score">نمره سوال</label>
                        <input type="number" class="form-control" min="1" value="1" name="Q-score" id="Q-score">
                    </div>
                </div>
                <div class="mt-3">
                        <label class="form-label" for="Q-text">متن سوال</label>
                        <textarea class="form-control" rows="3" placeholder="متن سوال را وارد کنید..." id="Q-text" name="Q-text"></textarea>
                    </div>
                    <div class="code-block-section mt-3 d-none">
                        <label class="form-label" for="Q-code">بلوک کد</label>
                        <textarea class="form-control" rows="3" placeholder="کد خود را اینجا وارد کنید..." name="Q-code" id="Q-code"></textarea>
                    </div>
                <div class="row g-3 mt-2 options-container" id="options-${questionCounter}"></div>
            </div>
        `;

    container.appendChild(div);
    renderOptions(questionCounter, 'truefalse');

    // Scroll to new question
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeQuestion(num) {
    const el = document.getElementById(`question-${num}`);
    if (el) {
        el.remove();
        renumberQuestions();
    }
}

function renumberQuestions() {
    const cards = document.querySelectorAll('.question-card');
    cards.forEach((card, index) => {
        const header = card.querySelector('h5');
        header.textContent = `سوال ${index + 1}`;
    });
}

// Initialize first question options
document.addEventListener('DOMContentLoaded', function () {
    renderOptions(1, 'multiple');
});