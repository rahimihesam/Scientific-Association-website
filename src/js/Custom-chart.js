// دریافت المنت canvas از صفحه
const ctx = document.getElementById('UsersChart').getContext('2d');

// ایجاد و پیکربندی نمودار
const UsersChart = new Chart(ctx, {
    type: 'bar', // نوع نمودار: 'bar' (میله‌ای), 'line' (خطی), 'pie' (دایره‌ای), 'doughnut' و غیره
    data: {
        labels: ['دانشجو', 'استاد', 'ادمین'],
        datasets: [{
            label: 'آمار ',
            data: [
                42, // دانشجویان
                19, // استادان
                5  // ادمین ها
            ], // داده‌ها
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            borderRadius: 5 // گرد کردن گوشه‌های میله‌ها
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Tahoma, Arial' // فونت مناسب برای فارسی
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { family: 'Tahoma, Arial' }
                }
            },
            x: {
                ticks: {
                    font: { family: 'Tahoma, Arial' }
                }
            }
        }
    }
});


const c2tx = document.getElementById('ContentChart').getContext('2d');
// ایجاد و پیکربندی نمودار
const ContentChart = new Chart(c2tx, {
    type: 'bar', // نوع نمودار: 'bar' (میله‌ای), 'line' (خطی), 'pie' (دایره‌ای), 'doughnut' و غیره
    data: {
        labels: ['دوره ها', 'مقالات', 'فایل ها' , 'اعلانات' , 'NEA'],
        datasets: [{
            label: 'آمار ',
            data: [
                42, // دوره ها
                19, // مقالات
                5,  // فایل ها
                13, // اعلانات
                15  // NEA
            ], // داده‌ها
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            borderRadius: 5 // گرد کردن گوشه‌های میله‌ها
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: 'Tahoma, Arial' // فونت مناسب برای فارسی
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { family: 'Tahoma, Arial' }
                }
            },
            x: {
                ticks: {
                    font: { family: 'Tahoma, Arial' }
                }
            }
        }
    }
});