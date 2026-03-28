// ================================================================
// SCROLL TO TOP ON PAGE LOAD/REFRESH
// ================================================================
if (history.scrollRestoration) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// BURGER
const burger = document.getElementById('burger-toggle');
const navMenu = document.getElementById('nav-menu');
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ACCORDION
function toggleCat(header) {
    const cat = header.closest('.mat-category');
    const isOpen = cat.classList.contains('open');
    document.querySelectorAll('.mat-category').forEach(c => c.classList.remove('open'));
    if (!isOpen) cat.classList.add('open');
}

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// LANGUAGE
const langData = {
    ru: { btn:'KZ', 'nav-kamaz':'Техника', 'nav-materials':'Материалы', 'nav-order':'Заказать', 'hero-title':'Быстро.<br><em>Надёжно.</em>', 'hero-p':'Доставка строительных материалов по Алматы и области. Собственный парк КАМАЗов — гарантия точного веса и своевременной доставки.', 'kamaz-eyebrow':'Ваша техника', 'kamaz-h2':'Мощь КАМАЗа.<br><em>Честный объём.</em>', 'kamaz-p':'Собственный парк — никаких посредников. Точный вес на весах, документы на каждый рейс, доставка в любую точку Алматы и области.', 'mat-eyebrow':'Что доставляем', 'materials-h2':'Все виды<br>материалов.', 'form-title':'Быстро.<br><em>Надёжно.</em>', 'form-btn':'Отправить заявку', 'footer-about':'Надёжная доставка строительных материалов по Алматы и области. Работаем с 2015 года.' },
    kz: { btn:'EN', 'nav-kamaz':'Техника', 'nav-materials':'Материалдар', 'nav-order':'Тапсырыс', 'hero-title':'Жылдам.<br><em>Сенімді.</em>', 'hero-p':'Алматы және облыс бойынша құрылыс материалдарын жеткізу. Жеке КАМАЗ паркі — дәл салмақ пен уақтылы жеткізудің кепілі.', 'kamaz-eyebrow':'Сіздің техникаңыз', 'kamaz-h2':'КАМАЗ қуаты.<br><em>Нақты көлем.</em>', 'kamaz-p':'Жеке парк — делдалдарсыз. Таразыдағы дәл салмақ, әр рейске құжат, Алматы мен облыстың кез келген нүктесіне жеткізу.', 'mat-eyebrow':'Не жеткіземіз', 'materials-h2':'Барлық түрдегі<br>материалдар.', 'form-title':'Жылдам.<br><em>Сенімді.</em>', 'form-btn':'Өтінім жіберу', 'footer-about':'Алматы және облыс бойынша құрылыс материалдарын сенімді жеткізу. 2015 жылдан бері жұмыс істейміз.' },
    en: { btn:'RU', 'nav-kamaz':'Fleet', 'nav-materials':'Materials', 'nav-order':'Order', 'hero-title':'Fast.<br><em>Reliable.</em>', 'hero-p':'Construction material delivery across Almaty and the region. Our own KAMAZ fleet guarantees accurate weight and on-time delivery.', 'kamaz-eyebrow':'Your Machinery', 'kamaz-h2':'KAMAZ Power.<br><em>Honest volume.</em>', 'kamaz-p':'Own fleet — no middlemen. Precise weight on scales, documents for every trip, delivery anywhere in Almaty and the region.', 'mat-eyebrow':'What we deliver', 'materials-h2':'All types<br>of materials.', 'form-title':'Fast.<br><em>Reliable.</em>', 'form-btn':'Send Request', 'footer-about':'Reliable construction material delivery across Almaty and the region. Working since 2015.' }
};
let languages = ['ru','kz','en'], currentIndex = 0;
function toggleLang() {
    currentIndex = (currentIndex + 1) % 3;
    const lang = languages[currentIndex];
    document.getElementById('lang-btn').innerText = langData[lang].btn;
    Object.keys(langData[lang]).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.cssText = 'opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s';
            setTimeout(() => { el.innerHTML = langData[lang][id]; el.style.cssText = 'opacity:1;transform:translateY(0);transition:opacity .3s,transform .3s'; }, 280);
        }
    });
}

// ================================================================
// PHONE MASK — автоматически форматирует +7 (XXX) XXX-XX-XX
// ================================================================
const telInput = document.getElementById('input-tel');

telInput.addEventListener('focus', () => {
    if (!telInput.value) telInput.value = '+7 (';
});

telInput.addEventListener('input', (e) => {
    let val = telInput.value.replace(/\D/g, ''); // только цифры
    // Всегда начинаем с 7
    if (val.length === 0) { telInput.value = ''; return; }
    if (val[0] !== '7') val = '7' + val;
    val = val.substring(0, 11); // макс 11 цифр

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 4) formatted += ')';
    if (val.length > 4) formatted += ' ' + val.substring(4, 7);
    if (val.length > 7) formatted += '-' + val.substring(7, 9);
    if (val.length > 9) formatted += '-' + val.substring(9, 11);

    telInput.value = formatted;
});

telInput.addEventListener('keydown', (e) => {
    // Не даём удалить префикс +7 (
    const minLen = 4; // '+7 ('
    if ((e.key === 'Backspace' || e.key === 'Delete') && telInput.value.length <= minLen) {
        e.preventDefault();
    }
});

telInput.addEventListener('blur', () => {
    if (telInput.value === '+7 (' || telInput.value === '+7') telInput.value = '';
});

// ================================================================
// FORM SUBMIT → отправка в WhatsApp на три номера
// ================================================================
// ⚠️ Замените на реальные номера (только цифры, без +)
const WA_NUMBERS = ['77023471214'];


// ================================================================
// FIELD ERROR HELPER
// ================================================================
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#e74c3c';
    field.style.background = 'rgba(231,76,60,0.06)';
    // Remove error on input
    field.addEventListener('input', function once() {
        field.style.borderColor = '';
        field.style.background = '';
        field.removeEventListener('input', once);
    }, { once: true });
    // Show tooltip message under field
    let err = field.parentNode.querySelector('.field-err');
    if (!err) {
        err = document.createElement('p');
        err.className = 'field-err';
        err.style.cssText = 'color:#e74c3c;font-size:0.72rem;margin-top:4px;margin-bottom:0;';
        field.parentNode.insertBefore(err, field.nextSibling);
    }
    err.textContent = message;
    setTimeout(() => { if (err.parentNode) err.parentNode.removeChild(err); field.style.borderColor = ''; field.style.background = ''; }, 3500);
}

document.getElementById('orderForm').addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('input-name').value.trim();
    const tel     = document.getElementById('input-tel').value.trim();
    const mat     = document.getElementById('input-mat').value;
    const address = document.getElementById('input-address').value.trim();

    // Валидация всех полей
    const telClean = tel.replace(/\D/g, '');
    if (!name.trim()) {
        document.getElementById('input-name').focus();
        showFieldError('input-name', 'Введите ваше имя');
        return;
    }
    if (telClean.length < 11) {
        document.getElementById('input-tel').focus();
        showFieldError('input-tel', 'Введите полный номер телефона');
        return;
    }
    if (!mat) {
        document.getElementById('input-mat').focus();
        showFieldError('input-mat', 'Выберите материал');
        return;
    }
    if (!address.trim()) {
        document.getElementById('input-address').focus();
        showFieldError('input-address', 'Введите адрес доставки');
        return;
    }

    // Формируем текст сообщения
    const msg = encodeURIComponent(
        '*Новая заявка с сайта*' + '\n\n' +
        'Имя: ' + name + '\n' +
        'Телефон: ' + tel + '\n' +
        'Материал: ' + mat + '\n' +
        'Адрес: ' + address
    );

    // Открываем WhatsApp для каждого номера с небольшой задержкой
    WA_NUMBERS.forEach((num, i) => {
        setTimeout(() => {
            window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
        }, i * 600); // 0ms, 600ms, 1200ms — чтобы браузер не блокировал
    });

    // Визуальный фидбек
    const btn = document.getElementById('form-btn');
    btn.textContent = '✓ Заявки отправлены!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#000';
    setTimeout(() => {
        btn.textContent = 'Отправить заявку';
        btn.style.background = '';
        btn.style.color = '';
        e.target.reset();
        telInput.value = '';
    }, 4000);
});

// ================================================================
// HEADER HIDE / SHOW ON SCROLL
// ================================================================
const headerEl = document.querySelector('header');
let lastScrollY = 0;
let scrollTicking = false;

function handleHeaderScroll() {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;

    // Показываем ТОЛЬКО у самого верха страницы (до 50px)
    if (currentY < 50) {
        headerEl.classList.remove('header--hidden');
    }
    // Прячем мгновенно при любом скролле вниз (даже 1px) после 50px
    else if (delta > 0) {
        headerEl.classList.add('header--hidden');
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Подсветка бордера
    headerEl.style.borderBottomColor = currentY > 60 ? 'rgba(200,146,42,0.25)' : 'rgba(200,146,42,0.15)';

    lastScrollY = currentY;
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(handleHeaderScroll);
        scrollTicking = true;
    }
}, { passive: true });

// ================================================================
// BACK TO TOP BUTTON
// ================================================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================================================================
// WHATSAPP MULTI-NUMBER WIDGET
// ================================================================
const waWidget = document.getElementById('waWidget');
const waBtn = document.getElementById('waBtn');
const waOverlay = document.getElementById('waOverlay');

waBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    waWidget.classList.toggle('open');
});

// Клик на overlay (вне виджета) — закрываем
waOverlay.addEventListener('click', () => {
    waWidget.classList.remove('open');
});

// Закрываем при нажатии Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') waWidget.classList.remove('open');
});

// Закрываем при клике на номер
document.querySelectorAll('.wa-number-item a').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => waWidget.classList.remove('open'), 200);
    });
});