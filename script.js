"use strict";

/* ============================
   إنشاء الجدول اليومي للمواد
============================ */
const dailyTimetable = [
  { day: "السبت", subjects: ["فيزياء","مراجعة E"] },
  { day: "الأحد", subjects: ["E", "مراجعة رياضة"] },
  { day: "الاثنين", subjects: ["رياضة", "مراجعة عربي"] },
  { day: "الثلاثاء", subjects: ["عربي", "مراجعة كيمياء"] },
  { day: "الأربعاء", subjects: ["كيمياء", "مراجعة رياضة"] },
  { day: "الخميس", subjects: ["رياضة", "مراجعة E"] }
];

// تحديد أوقات الفترات
const firstSlot = { start: "1:00", end: "4:22" };
const breakSlot = { start: "4:22", end: "4:37", duration: "15 دقيقة" };
const secondSlot = { start: "4:37", end: "8:00" };

const dailyContainer = document.getElementById("daily-timetable");

dailyTimetable.forEach(dayInfo => {
  const card = document.createElement("div");
  card.className = "daily-card";
  
  const dayTitle = document.createElement("div");
  dayTitle.className = "day-title";
  dayTitle.textContent = dayInfo.day;
  card.appendChild(dayTitle);
  
  // الفترة الأولى
  const slot1 = document.createElement("div");
  slot1.className = "slot";
  const subj1 = document.createElement("div");
  subj1.className = "subject-name";
  subj1.textContent = dayInfo.subjects[0];
  const time1 = document.createElement("div");
  time1.className = "time-range";
  time1.textContent = `${firstSlot.start} - ${firstSlot.end}`;
  slot1.appendChild(subj1);
  slot1.appendChild(time1);
  card.appendChild(slot1);
  
  // فترة الاستراحة
  const breakDiv = document.createElement("div");
  breakDiv.className = "break";
  breakDiv.textContent = `بريك ${breakSlot.duration} (${breakSlot.start} - ${breakSlot.end})`;
  card.appendChild(breakDiv);
  
  // الفترة الثانية
  const slot2 = document.createElement("div");
  slot2.className = "slot";
  const subj2 = document.createElement("div");
  subj2.className = "subject-name";
  subj2.textContent = dayInfo.subjects[1];
  const time2 = document.createElement("div");
  time2.className = "time-range";
  time2.textContent = `${secondSlot.start} - ${secondSlot.end}`;
  slot2.appendChild(subj2);
  slot2.appendChild(time2);
  card.appendChild(slot2);
  
  dailyContainer.appendChild(card);
});

/* ====================================
   إنشاء الجدول الأسبوعي (12 أسبوع)
==================================== */
const subjects = [
  { name: "اللغة العربية", teacher: "حمثلاح" },
  { name: "اللغة الإنجليزية", teacher: "عبد الحميد حامد" },
  { name: "الرياضيات", teacher: "احمد عصام" },
  { name: "الفيزياء", teacher: "محمود مجدي" },
  { name: "الكيمياء", teacher: "خالد صقر" }
];

const tasks = [
  "محاضرات الأسبوع",
  "مذاكرة وتطبيق",
  "عمل الواجب",
  "تسليم الواجب",
  "حل الامتحان"
];

const weeksContainer = document.getElementById("weeks-container");

for (let week = 1; week <= 35; week++) {
  const weekSection = document.createElement("section");
  weekSection.className = "week";
  
  const weekTitle = document.createElement("div");
  weekTitle.className = "week-title";
  weekTitle.textContent = `📅 الأسبوع ${week}`;
  weekSection.appendChild(weekTitle);
  
  // إنشاء العنصر الذي سيظهر عليه DONE إذا اكتملت جميع المهام
  const doneLabel = document.createElement("div");
  doneLabel.className = "week-done";
  doneLabel.setAttribute("data-week", week);
  weekSection.appendChild(doneLabel);
  
  subjects.forEach((subject, subjIndex) => {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject";
    
    const subjectTitle = document.createElement("div");
    subjectTitle.className = "subject-title";
    subjectTitle.textContent = `🔹 ${subjIndex + 1}- ${subject.name} ⬅️ ${subject.teacher}`;
    subjectDiv.appendChild(subjectTitle);
    
    // إنشاء حاوية المهام: ترتيب أفقي دون لف
    const tasksContainer = document.createElement("div");
    tasksContainer.className = "tasks-container";
    
    tasks.forEach((task, taskIndex) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.setAttribute("data-index", taskIndex + 1);
      
      // حساب مفتاح فريد لكل دائرة
      const key = `week-${week}-subject-${subjIndex}-task-${taskIndex}`;
      
      // إنشاء عنصر الدائرة
      const circle = document.createElement("span");
      circle.className = "circle";
      circle.setAttribute("data-key", key);
      circle.onclick = function() { 
        toggleMark(this);
        updateWeekDone(week);
      };
      
      // استرجاع الحالة المحفوظة إن وُجدت
      const savedState = localStorage.getItem(key) || "";
      circle.textContent = savedState;
      updateCircleStyle(circle, savedState);
      
      // إنشاء العنصر النصي للمهمة
      const taskText = document.createElement("span");
      taskText.textContent = `${task}: `;
      
      taskDiv.appendChild(taskText);
      taskDiv.appendChild(circle);
      
      tasksContainer.appendChild(taskDiv);
    });
    
    subjectDiv.appendChild(tasksContainer);
    weekSection.appendChild(subjectDiv);
  });
  
  weeksContainer.appendChild(weekSection);
  // تحديث حالة DONE عند تحميل كل أسبوع
  updateWeekDone(week);
}

/* ====================================
   دالة لتحديث نمط الدائرة بناءً على حالتها
==================================== */
function updateCircleStyle(elem, state) {
  if (state === "✔") {
    elem.style.color = "#fff";
    elem.style.backgroundColor = "green";
    elem.style.borderColor = "green";
  } else if (state === "X") {
    elem.style.color = "#fff";
    elem.style.backgroundColor = "red";
    elem.style.borderColor = "red";
  } else {
    elem.style.backgroundColor = "transparent";
    elem.style.color = "#000";
    elem.style.borderColor = "#5563DE";
  }
}

/* ====================================
   دالة لتبديل حالة الدائرة عند النقر عليها
   وتحديث التخزين المحلي للحالة
==================================== */
function toggleMark(elem) {
  const key = elem.getAttribute("data-key");
  let newState;
  if (elem.textContent === "") {
    newState = "✔";
  } else if (elem.textContent === "✔") {
    newState = "X";
  } else {
    newState = "";
  }
  elem.textContent = newState;
  updateCircleStyle(elem, newState);
  localStorage.setItem(key, newState);
}

/* ====================================
   دالة لتحديث حالة الأسبوع: 
   إذا كانت كل الدوائر في جميع المواد والمهام لـ (week) تحمل "✔"
   يتم عرض DONE باللون الأخضر
==================================== */
function updateWeekDone(weekNumber) {
  let allDone = true;
  for (let subjIndex = 0; subjIndex < subjects.length; subjIndex++) {
    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
      const key = `week-${weekNumber}-subject-${subjIndex}-task-${taskIndex}`;
      if (localStorage.getItem(key) !== "✔") {
        allDone = false;
        break;
      }
    }
    if (!allDone) break;
  }
  const doneLabel = document.querySelector(`.week-done[data-week="${weekNumber}"]`);
  if (allDone) {
    doneLabel.textContent = "✔✔DONE";
    doneLabel.style.display = "block";
  } else {
    doneLabel.textContent = "";
    doneLabel.style.display = "none";
  }
}





// نجيب الكتب المخزنة من localStorage
let books = JSON.parse(localStorage.getItem("books")) || [];

// دالة عرض الكتب
function renderBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";
  books.forEach((book, index) => {
    list.innerHTML += `
      <div class="book">
        <img src="${book.image || 'https://via.placeholder.com/120x160?text=No+Image'}" alt="book">
        <h3>${book.name}</h3>
        <p>الحالة: ${book.status}</p>
        <div class="status">
          <button class="read" onclick="updateStatus(${index}, 'قرأتُه')">✔️ قرأت</button>
          <button class="want" onclick="updateStatus(${index}, 'عايزه أقرأه')">📖 أقرأه</button>
          <button class="delete" onclick="deleteBook(${index})">🗑️ حذف</button>
        </div>
      </div>
    `;
  });
}

// دالة إضافة كتاب جديد
function addBook() {
  const name = document.getElementById("bookName").value;
  const image = document.getElementById("bookImage").value;

  if (name.trim() === "") return alert("⚠️ اكتبي اسم الكتاب الأول يبت ي روما!");

  books.push({ name, image, status: "لسه" });
  localStorage.setItem("books", JSON.stringify(books));

  // تفريغ الفورم
  document.getElementById("bookName").value = "";
  document.getElementById("bookImage").value = "";

  renderBooks();
}

// دالة تحديث حالة الكتاب
function updateStatus(index, status) {
  books[index].status = status;
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

// دالة حذف الكتاب
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

// أول ما الصفحة تفتح
renderBooks();




document.getElementById("bookFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // نحط الصورة المحوّلة Base64 في input بتاع لينك الصورة
      document.getElementById("bookImage").value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});




function showLove() {
  // كلمة بحبك
  const message = document.createElement("div");
  message.classList.add("love-message");
  message.textContent = "بحبك ❤️";
  document.body.appendChild(message);

  // زيادة عدد القلوب لتغطية الصفحة كلها
  const numberOfHearts = 100; // عدد أكبر
  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";

    // موقع عشوائي على الصفحة
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    heart.style.left = x + "px";
    heart.style.top = y + "px";

    // حجم عشوائي
    heart.style.fontSize = (Math.random() * 25 + 15) + "px";

    // حركة عشوائية
    heart.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.random()*100-50}px, ${Math.random()*100-50}px) rotate(180deg)`, opacity: 0.8 },
      { transform: `translate(${Math.random()*200-100}px, ${Math.random()*200-100}px) rotate(360deg)`, opacity: 0 }
    ], {
      duration: 5000,
      iterations: 1,
      easing: 'ease-out'
    });

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }

  // إزالة كلمة بحبك بعد 5 ثواني
  setTimeout(() => {
    message.remove();
  }, 5000);
}

