// ====== Планеты (с изображениями) ======
const planets = [
  {
    name: "Меркурий",
    type: "Каменистая",
    short: "Ближайшая к Солнцу планета.",
    details: "Меркурий почти не имеет атмосферы, поэтому температура сильно меняется: жарко днём и холодно ночью.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpU2pMausFnfHLLWt_wskQW2M3T5woVTEaQ&s"
  },
  {
    name: "Венера",
    type: "Каменистая",
    short: "Самая горячая планета.",
    details: "Парниковый эффект делает Венеру очень горячей: температура около 465°C.",
    img: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/114B6/production/_118783807_d46ff476-316c-4dc6-ac82-42ef03ae0bf2.jpg.webp"
  },
  {
    name: "Земля",
    type: "Каменистая",
    short: "Наш дом и единственная известная планета с жизнью.",
    details: "Земля имеет жидкую воду, атмосферу и магнитное поле, которое защищает от солнечного ветра.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Марс",
    type: "Каменистая",
    short: "Красная планета.",
    details: "Марс холодный, с тонкой атмосферой. Учёные ищут следы воды и планируют будущие миссии.",
    img: "https://s14.stc.yc.kpcdn.net/share/i/12/10568798/wr-960.webp"
  },
  {
    name: "Юпитер",
    type: "Газовый гигант",
    short: "Самая большая планета.",
    details: "Юпитер известен Большим красным пятном — огромным штормом, который длится очень долго.",
    img: "https://spacegid.com/wp-content/uploads/2018/04/YUpiter-----gigantskaya-planeta-solnechnoy-sistemyi.jpg"
  },
  {
    name: "Сатурн",
    type: "Газовый гигант",
    short: "Планета с красивыми кольцами.",
    details: "Кольца Сатурна состоят из льда и пыли. У него много спутников, включая Титан.",
    img: "https://starwalk.space/gallery/images/saturn-planet-guide/1920x1080.jpg"
  }
];

// ====== Элементы ======
const cardsEl = document.getElementById("cards");
const searchInput = document.getElementById("searchInput");
const themeBtn = document.getElementById("themeBtn");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

const randomFactBtn = document.getElementById("randomFactBtn");
const randomFactText = document.getElementById("randomFactText");

const likeCountEl = document.getElementById("likeCount");
const cardCountEl = document.getElementById("cardCount");
const searchHintEl = document.getElementById("searchHint");

let likeCount = 0;

// ====== Рендер карточек ======
function renderCards(list) {
  cardsEl.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card__img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="card__body">
        <span class="badge">${p.type}</span>
        <h4>${p.name}</h4>
        <p class="muted">${p.short}</p>

        <div class="cardActions">
          <button class="btn" type="button" data-action="more">Подробнее</button>
          <button class="btn btn--ghost likeBtn" type="button" data-action="like" title="Поставить лайк">⭐</button>
        </div>
      </div>
    `;

    card.querySelector('[data-action="more"]').addEventListener("click", () => {
      openModal(p.name, p.details, p.img);
    });

    card.querySelector('[data-action="like"]').addEventListener("click", (e) => {
      if (e.target.dataset.liked === "1") return;
      e.target.dataset.liked = "1";
      e.target.textContent = "✅";
      likeCount++;
      likeCountEl.textContent = likeCount;
    });

    cardsEl.appendChild(card);
  });

  if (list.length === 0) {
    cardsEl.innerHTML = `<p class="muted">Ничего не найдено. Попробуй: Марс, Земля, Юпитер…</p>`;
  }
}

// ====== Поиск ======
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  searchHintEl.textContent = q ? q : "—";
  const filtered = planets.filter(p => p.name.toLowerCase().includes(q));
  renderCards(filtered);
});

// ====== Модалка ======
function openModal(title, text, img) {
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalImg.src = img;
  modalImg.alt = title;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ====== Аккордеон ======
document.querySelectorAll(".accBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});

// ====== Случайный факт ======
const facts = [
  "Свет от Солнца до Земли летит около 8 минут.",
  "В космосе почти вакуум — поэтому звук не распространяется.",
  "Юпитер самый большой в Солнечной системе.",
  "На Марсе бывают огромные пыльные бури.",
  "Сатурн мог бы “плавать” в воде: его плотность меньше плотности воды."
];

randomFactBtn.addEventListener("click", () => {
  const fact = facts[Math.floor(Math.random() * facts.length)];
  randomFactText.textContent = fact;
});

// ====== Тема (localStorage) ======
function applyTheme(mode) {
  if (mode === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  const next = isLight ? "dark" : "light";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

// ====== Старт ======
cardCountEl.textContent = planets.length;
likeCountEl.textContent = likeCount;
searchHintEl.textContent = "—";
renderCards(planets);
