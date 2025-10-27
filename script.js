// Function to open the registration modal
function openRegister(courseName) {
    const modal = document.getElementById('registerModal');
    const form = document.getElementById('registerForm');
    
    // 💡 تحديث: تغيير عنوان النافذة المنبثقة بناءً على ما إذا كان تسجيل في دورة أو مسابقة
    const modalTitle = modal.querySelector('h3');
    modalTitle.textContent = courseName.includes('مسابقة') || courseName.includes('تحدي') || courseName.includes('أولمبياد')
        ? 'تسجيل في المسابقة'
        : 'تسجيل في الدورة';
        
    // Update the description
    const modalDescription = modal.querySelector('.modal-description');
    modalDescription.textContent = "يرجى ملء النموذج أدناه لإكمال عملية التسجيل.";

    form.elements['selectedCourse'].value = courseName || '';
    modal.showModal();
}

// Function to close the registration modal
function closeRegister() {
    const modal = document.getElementById('registerModal');
    modal.close();
}

// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    const switchBox = document.getElementById('themeSwitch');
    if (switchBox.checked) {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
}

// IIFE to apply saved theme on page load
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        document.getElementById('themeSwitch').checked = (savedTheme === 'dark');
    }
})();

// Function to toggle the mobile navigation menu
function toggleMenu() {
    const nav = document.getElementById('mobileNav');
    nav.classList.toggle('active');
}

// Function to set up horizontal scrolling only (without indicators)
function setupHorizontalScrolling(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;
}

// Function to display a toast notification
function displayToastNotification(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #34b44c;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// Initialize the "Load More" functionality for all scrollable grids
document.addEventListener('DOMContentLoaded', () => {
    setupHorizontalScrolling('coursesGrid');
    setupHorizontalScrolling('competitionsGrid'); // 💡 تهيئة المسابقات
    setupHorizontalScrolling('activitiesGrid');
    setupHorizontalScrolling('projectsGrid');

    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);
            fetch(registerForm.action, {
                method: registerForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    closeRegister();
                    displayToastNotification("شكراً لك! تم تسجيلك بنجاح. سنتواصل معك قريباً.");
                    registerForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "))
                        } else {
                            alert("حدث خطأ ما! يرجى المحاولة مرة أخرى.");
                        }
                    })
                }
            }).catch(error => {
                alert("حدث خطأ في الاتصال. يرجى التأكد من اتصالك بالإنترنت والمحاولة مرة أخرى.");
            });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    contactForm.reset();
                    displayToastNotification("شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.");
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "))
                        } else {
                            alert("حدث خطأ ما! يرجى المحاولة مرة أخرى.");
                        }
                    })
                }
            }).catch(error => {
                alert("حدث خطأ في الاتصال. يرجى التأكد من اتصالك بالإنترنت والمحاولة مرة أخرى.");
            });
        });
    }
});