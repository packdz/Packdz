// متغيرات عامة
let productPrice = 2500; // سعر المنتج - يمكن تغييره
let deliveryPrices = {
    office: 140,
    home: 350
};

let algeriaData = {}; // سيتم تحميل البيانات من ملف JSON

// العناصر الرئيسية
const orderForm = document.getElementById('orderForm');
const productPriceElement = document.getElementById('productPrice');
const productSubtotalElement = document.getElementById('productSubtotal');
const quantityElement = document.getElementById('quantity');
const quantitySummaryElement = document.getElementById('quantitySummary');
const deliveryCostElement = document.getElementById('deliveryCost');
const totalPriceElement = document.getElementById('totalPrice');
const stateSelect = document.getElementById('state');
const municipalitySelect = document.getElementById('municipality');
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const jsonModal = document.getElementById('jsonModal');
const jsonOutput = document.getElementById('jsonOutput');
const closeModalBtn = document.getElementById('closeModal');
const copyJsonBtn = document.getElementById('copyJsonBtn');
const resetBtn = document.getElementById('resetBtn');

// رسائل الخطأ
const errorMessages = {
    phone: 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 05 أو 06 أو 07 ويحتوي على 10 أرقام',
    state: 'الرجاء اختيار الولاية',
    municipality: 'الرجاء اختيار البلدية'
};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل بيانات الولايات والبلديات
    loadAlgeriaData();
    
    // تحديث سعر المنتج في الواجهة
    productPriceElement.textContent = `${productPrice} دج`;
    
    // تعيين القيم الافتراضية
    updateOrderSummary();
    
    // إضافة مستمعي الأحداث
    addEventListeners();
});

// تحميل بيانات الولايات والبلديات من ملف JSON
async function loadAlgeriaData() {
    try {
        // في بيئة حقيقية، قم بتحميل البيانات من ملف dz.json
        // const response = await fetch('dz.json');
        // algeriaData = await response.json();
        
        // لأغراض العرض، سنستخدم بيانات تجريبية
        algeriaData = {
            "أدرار": ["أدرار", "رقان", "تيميمون", "تسابيت", "زاوية كنتة"],
            "الشلف": ["الشلف", "وادي الفضة", "بني حواء", "الكريمية", "تاوقريت"],
            "الاغواط": ["الأغواط", "قصر الحيران", "غرداية", "حاسي الرمل"],
            "أم البواقي": ["أم البواقي", "عين البيضاء", "سوق نعمان", "عين مليلة"],
            "باتنة": ["باتنة", "مروانة", "عين التوتة", "الشمرة", "سريانة"],
            "بجاية": ["بجاية", "أوكيس", "تيشي", "سيدي عيش", "برباشة"],
            "بسكرة": ["بسكرة", "أولاد جلال", "سيدي عقبة", "القنطرة"],
            "بشار": ["بشار", "بني ونيف", "تندوف", "العبادلة"],
            "البليدة": ["البليدة", "بوعرفة", "بوفاريك", "الأربعاء"],
            "البويرة": ["البويرة", "الأصنام", "بئر غبالو", "الحجرة"],
            "تمنراست": ["تمنراست", "عين صالح", "عين قزام"],
            "تبسة": ["تبسة", "العوينات", "مرسط", "نقرين"],
            "تلمسان": ["تلمسان", "غزوات", "صبرة", "بن سكران"],
            "تيارت": ["تيارت", "مغيلة", "مدروة", "عين الذهب"],
            "تيزي وزو": ["تيزي وزو", "أزفون", "ماكودة", "بني دوالة"],
            "الجزائر": ["الجزائر الوسطى", "باب الوادي", "بولوغين", "القبة"],
            "الجلفة": ["الجلفة", "حاسي بحبح", "عين وسارة", "دار الشيوخ"],
            "جيجل": ["جيجل", "الميلية", "الطاهير", "القنار"],
            "سطيف": ["سطيف", "عين أرنات", "عين ولمان", "بوقاعة"],
            "سعيدة": ["سعيدة", "يوب", "سيدي بوبكر", "الحساسنة"],
            "سكيكدة": ["سكيكدة", "الحدائق", "عزابة", "بن عزوز"],
            "سيدي بلعباس": ["سيدي بلعباس", "تسالة", "مولاي سليسن", "بن باديس"],
            "عنابة": ["عنابة", "البوني", "الحجار", "برحال"],
            "قالمة": ["قالمة", "هيليوبوليس", "وادي الزناتي", "بوشقوف"],
            "قسنطينة": ["قسنطينة", "الخروب", "عين عبيد", "زيغود يوسف"],
            "المدية": ["المدية", "وزرة", "العزيزية", "الشهبونية"],
            "مستغانم": ["مستغانم", "حجاج", "سيدي علي", "عين تادلس"],
            "المسيلة": ["المسيلة", "بوسعادة", "جبل مساعد", "المعاضيد"],
            "معسكر": ["معسكر", "سيق", "غريس", "زهانة"],
            "ورقلة": ["ورقلة", "حاسي مسعود", "انقوسة", "الرويسات"],
            "وهران": ["وهران", "عين الترك", "بطيوة", "السانية"],
            "البيض": ["البيض", "بوقطب", "الغاسول", "بريزينة"],
            "إليزي": ["إليزي", "جانت", "إن أمناس"],
            "برج بوعريريج": ["برج بوعريريج", "المعاصة", "برج الغدير", "تسامرت"],
            "بومرداس": ["بومرداس", "بودواو", "الثنية", "بغلية"],
            "الطارف": ["الطارف", "بن مهيدي", "البسباس", "العيون"],
            "تيندوف": ["تيندوف", "أوم العساس"],
            "تيسمسيلت": ["تيسمسيلت", "ثنية الاحد", "لرجام", "خميستي"],
            "الوادي": ["الوادي", "البياضة", "قمار", "الرباح"],
            "خنشلة": ["خنشلة", "قايس", "الشحم", "بابار"],
            "سوق أهراس": ["سوق أهراس", "سدراتة", "المراهنة", "تاورة"],
            "تيبازة": ["تيبازة", "حمر العين", "القليعة", "شرشال"],
            "ميلة": ["ميلة", "فرجيوة", "شلغوم العيد", "عين البيضاء أحريش"],
            "عين الدفلى": ["عين الدفلى", "مليانة", "بومدفع", "جندل"],
            "النعامة": ["النعامة", "مغرارة", "عين الصفراء", "عين بن خليل"],
            "عين تيموشنت": ["عين تيموشنت", "بني صاف", "العقيد عبد القادر", "الحاسي"],
            "غرداية": ["غرداية", "متليلي", "المنيعة", "القرارة"],
            "غليزان": ["غليزان", "وادي رهيو", "الحمادنة", "سيدي سعادة"]
        };
        
        // ملء قائمة الولايات
        populateStates();
    } catch (error) {
        console.error('خطأ في تحميل بيانات الولايات والبلديات:', error);
        showNotification('خطأ في تحميل بيانات الولايات والبلديات', 'error');
    }
}

// ملء قائمة الولايات
function populateStates() {
    stateSelect.innerHTML = '<option value="">اختر ولاية</option>';
    
    // فرز أسماء الولايات أبجدياً
    const sortedStates = Object.keys(algeriaData).sort();
    
    sortedStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// ملء قائمة البلديات بناءً على الولاية المختارة
function populateMunicipalities(state) {
    municipalitySelect.innerHTML = '<option value="">اختر بلدية</option>';
    
    if (algeriaData[state]) {
        // فرز أسماء البلديات أبجدياً
        const sortedMunicipalities = algeriaData[state].sort();
        
        sortedMunicipalities.forEach(municipality => {
            const option = document.createElement('option');
            option.value = municipality;
            option.textContent = municipality;
            municipalitySelect.appendChild(option);
        });
        
        municipalitySelect.disabled = false;
    } else {
        municipalitySelect.disabled = true;
    }
}

// تحديث ملخص الطلب
function updateOrderSummary() {
    const quantity = parseInt(quantityElement.value) || 1;
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    const deliveryPrice = deliveryPrices[deliveryType];
    
    // حساب السعر
    const subtotal = productPrice * quantity;
    const total = subtotal + deliveryPrice;
    
    // تحديث الواجهة
    productSubtotalElement.textContent = `${subtotal} دج`;
    quantitySummaryElement.textContent = quantity;
    deliveryCostElement.textContent = `${deliveryPrice} دج`;
    totalPriceElement.textContent = `${total} دج`;
}

// التحقق من صحة رقم الهاتف الجزائري
function validatePhoneNumber(phone) {
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    return phoneRegex.test(phone);
}

// جمع بيانات النموذج في كائن JSON
function collectFormData() {
    const formData = {
        customerInfo: {
            fullName: document.getElementById('fullName').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim()
        },
        address: {
            state: stateSelect.value,
            municipality: municipalitySelect.value
        },
        orderDetails: {
            productPrice: productPrice,
            quantity: parseInt(quantityElement.value),
            deliveryType: document.querySelector('input[name="delivery"]:checked').value,
            deliveryPrice: deliveryPrices[document.querySelector('input[name="delivery"]:checked').value],
            subtotal: productPrice * parseInt(quantityElement.value),
            total: productPrice * parseInt(quantityElement.value) + deliveryPrices[document.querySelector('input[name="delivery"]:checked').value]
        },
        timestamp: new Date().toISOString()
    };
    
    return formData;
}

// عرض بيانات JSON في نافذة منبثقة
function showJsonData(data) {
    const formattedJson = JSON.stringify(data, null, 2);
    jsonOutput.textContent = formattedJson;
    jsonModal.classList.add('active');
}

// نسخ JSON إلى الحافظة
function copyJsonToClipboard() {
    const jsonText = jsonOutput.textContent;
    
    navigator.clipboard.writeText(jsonText).then(() => {
        showNotification('تم نسخ JSON إلى الحافظة', 'success');
    }).catch(err => {
        console.error('خطأ في النسخ: ', err);
        showNotification('فشل نسخ JSON', 'error');
    });
}

// إظهار إشعار
function showNotification(message, type = 'info') {
    // إزالة أي إشعارات سابقة
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // إضافة أيقونة بناءً على نوع الإشعار
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إخفاء الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// إضافة أنماط للإشعارات
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 2000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.3s ease;
        max-width: 90%;
    }
    
    .notification.show {
        transform: translateX(-50%) translateY(0);
    }
    
    .notification.success {
        background: linear-gradient(90deg, #2ecc71 0%, #27ae60 100%);
    }
    
    .notification.error {
        background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
    }
    
    .notification.info {
        background: linear-gradient(90deg, #3498db 0%, #2980b9 100%);
    }
`;

document.head.appendChild(notificationStyles);

// إضافة مستمعي الأحداث
function addEventListeners() {
    // تحديث ملخص الطلب عند تغيير الكمية أو نوع التوصيل
    quantityElement.addEventListener('change', updateOrderSummary);
    decreaseQtyBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityElement.value);
        if (currentValue > 1) {
            quantityElement.value = currentValue - 1;
            updateOrderSummary();
        }
    });
    
    increaseQtyBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityElement.value);
        if (currentValue < 100) {
            quantityElement.value = currentValue + 1;
            updateOrderSummary();
        }
    });
    
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });
    
    // تحديث قائمة البلديات عند اختيار الولاية
    stateSelect.addEventListener('change', function() {
        if (this.value) {
            populateMunicipalities(this.value);
            document.getElementById('stateError').textContent = '';
        } else {
            municipalitySelect.innerHTML = '<option value="">اختر الولاية أولاً</option>';
            municipalitySelect.disabled = true;
        }
        updateOrderSummary();
    });
    
    // التحقق من صحة رقم الهاتف أثناء الكتابة
    document.getElementById('phoneNumber').addEventListener('input', function() {
        const phoneError = document.getElementById('phoneError');
        if (this.value && !validatePhoneNumber(this.value)) {
            phoneError.textContent = errorMessages.phone;
        } else {
            phoneError.textContent = '';
        }
    });
    
    // إرسال النموذج
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من صحة الحقول
        let isValid = true;
        
        // التحقق من الاسم
        const fullName = document.getElementById('fullName').value.trim();
        if (!fullName) {
            document.getElementById('nameError').textContent = 'الرجاء إدخال الاسم الكامل';
            isValid = false;
        } else {
            document.getElementById('nameError').textContent = '';
        }
        
        // التحقق من رقم الهاتف
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
            document.getElementById('phoneError').textContent = errorMessages.phone;
            isValid = false;
        } else {
            document.getElementById('phoneError').textContent = '';
        }
        
        // التحقق من الولاية
        if (!stateSelect.value) {
            document.getElementById('stateError').textContent = errorMessages.state;
            isValid = false;
        } else {
            document.getElementById('stateError').textContent = '';
        }
        
        // التحقق من البلدية
        if (!municipalitySelect.value || municipalitySelect.disabled) {
            document.getElementById('municipalityError').textContent = errorMessages.municipality;
            isValid = false;
        } else {
            document.getElementById('municipalityError').textContent = '';
        }
        
        // إذا كان النموذج صالحاً
        if (isValid) {
            // جمع البيانات وعرض JSON
            const formData = collectFormData();
            showJsonData(formData);
            
            // إظهار رسالة نجاح
            showNotification('تم إنشاء طلبك بنجاح! البيانات جاهزة للإرسال.', 'success');
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى Google Sheet
            // sendToGoogleSheet(formData);
        } else {
            showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
        }
    });
    
    // إعادة تعيين النموذج
    resetBtn.addEventListener('click', function() {
        orderForm.reset();
        municipalitySelect.innerHTML = '<option value="">اختر الولاية أولاً</option>';
        municipalitySelect.disabled = true;
        
        // إعادة تعيين رسائل الخطأ
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // إعادة تعيين الكمية
        quantityElement.value = 1;
        
        // تحديث ملخص الطلب
        updateOrderSummary();
        
        showNotification('تم إعادة تعيين النموذج', 'info');
    });
    
    // إغلاق نافذة JSON
    closeModalBtn.addEventListener('click', function() {
        jsonModal.classList.remove('active');
    });
    
    // إغلاق نافذة JSON بالنقر خارجها
    jsonModal.addEventListener('click', function(e) {
        if (e.target === jsonModal) {
            jsonModal.classList.remove('active');
        }
    });
    
    // نسخ JSON إلى الحافظة
    copyJsonBtn.addEventListener('click', copyJsonToClipboard);
}

// دالة لإرسال البيانات إلى Google Sheet (جاهزة للاستخدام لاحقاً)
function sendToGoogleSheet(data) {
    // هذا المثال يوضح كيفية إرسال البيانات إلى Google Sheet
    // تحتاج إلى إنشاء سكريبت Google Apps وتعديل الرابط
    /*
    const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        showNotification('تم إرسال الطلب بنجاح!', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('حدث خطأ أثناء إرسال الطلب', 'error');
    });
    */
}

// دالة لتغيير سعر المنتج (يمكن استدعاؤها من وحدة التحكم)
function updateProductPrice(newPrice) {
    productPrice = newPrice;
    productPriceElement.textContent = `${productPrice} دج`;
    updateOrderSummary();
    showNotification(`تم تحديث سعر المنتج إلى ${productPrice} دج`, 'info');
}
