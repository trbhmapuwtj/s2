// Инициализация данных в localStorage
function initializeData() {
    if (!localStorage.getItem('culinaryData')) {
        const initialData = {
            recipes: [
                {
                    id: 1,
                    title: "Итальянская паста карбонара",
                    category: "main",
                    difficulty: "medium",
                    ingredients: ["спагетти", "бекон", "яйца", "пармезан", "чеснок", "перец"],
                    instructions: "1. Варите пасту...",
                    cookingTime: "30 мин",
                    servings: 2,
                    image: "image/Espaguetis_carbonara.jpg",
                    masterId: 1
                },
                {
                    id: 2,
                    title: "Тирамису",
                    category: "dessert",
                    difficulty: "hard",
                    ingredients: ["маскарпоне", "яйца", "сахар", "кофе", "печенье савоярди", "какао"],
                    instructions: "1. Взбейте яйца с сахаром...",
                    cookingTime: "45 мин",
                    servings: 6,
                    image: "image/tiramisu-v-domashnih-uslovijah.jpg",
                    masterId: 2
                },
                {
                    id: 3,
                    title: "Омлет с овощами",
                    category: "breakfast",
                    difficulty: "easy",
                    ingredients: ["яйца", "молоко", "помидоры", "перец", "лук", "соль"],
                    instructions: "1. Взбейте яйца с молоком...",
                    cookingTime: "15 мин",
                    servings: 1,
                    image: "image/omlet-klassicheskii-s-molokom-na-skovorode_1643909670_6_max.jpg",
                    masterId: 3
                }
            ],
            masters: [
                {
                    id: 1,
                    name: "Сергей Орлов",
                    specialty: "Итальянская кухня",
                    bio: "Шеф-повар с 20-летним опытом, специалист по итальянской кухне.",
                    image: "image/260c223df6fe8d78b597105babd906a9.jpg"
                },
                {
                    id: 2,
                    name: "Мария Петрова",
                    specialty: "Десерты",
                    bio: "Кондитер, автор книги 'Сладкие искушения'.",
                    image: "image/unnamed.jpg"
                },
                {
                    id: 3,
                    name: "Иван Сидоров",
                    specialty: "Здоровое питание",
                    bio: "Эксперт по быстрым и полезным завтракам.",
                    image: "image/fa35dae70234e1145df8d6a31e6f3bdd.jpg"
                }
            ],
            classes: [
                {
                    id: 1,
                    title: "Итальянская кухня: от простого к сложному",
                    masterId: 1,
                    date: "2025-05-10",
                    time: "19:00",
                    duration: "2 часа",
                    price: 1500,
                    maxParticipants: 15
                },
                {
                    id: 2,
                    title: "Искусство приготовления десертов",
                    masterId: 2,
                    date: "2025-05-15",
                    time: "18:00",
                    duration: "3 часа",
                    price: 2000,
                    maxParticipants: 10
                },
                {
                    id: 3,
                    title: "Полезные завтраки на каждый день",
                    masterId: 3,
                    date: "2023-12-10",
                    time: "10:00",
                    duration: "1.5 часа",
                    price: 1000,
                    maxParticipants: 20
                }
            ]
        };
        localStorage.setItem('culinaryData', JSON.stringify(initialData));
    }

    if (!localStorage.getItem('currentUser')) {
        const initialUser = {
            name: "Новикова Мария",
            email: "novikova_maria@gmail.com",
            joinedClasses: [],
            savedRecipes: []
        };
        localStorage.setItem('currentUser', JSON.stringify(initialUser));
    }
}

// Получение данных
function getCulinaryData() {
    return JSON.parse(localStorage.getItem('culinaryData'));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Обновление данных
function updateUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Функции для работы с рецептами
function saveRecipe(recipeId) {
    const user = getCurrentUser();
    if (!user.savedRecipes.includes(recipeId)) {
        user.savedRecipes.push(recipeId);
        updateUser(user);
        return true;
    }
    return false;
}

function unsaveRecipe(recipeId) {
    const user = getCurrentUser();
    const index = user.savedRecipes.indexOf(recipeId);
    if (index !== -1) {
        user.savedRecipes.splice(index, 1);
        updateUser(user);
        return true;
    }
    return false;
}

// Функции для работы с мастер-классами
function signUpForClass(classId) {
    const user = getCurrentUser();
    if (!user.joinedClasses.includes(classId)) {
        user.joinedClasses.push(classId);
        updateUser(user);
        return true;
    }
    return false;
}

function cancelClass(classId) {
    const user = getCurrentUser();
    const index = user.joinedClasses.indexOf(classId);
    if (index !== -1) {
        user.joinedClasses.splice(index, 1);
        updateUser(user);
        return true;
    }
    return false;
}

// Отображение данных
function displayRecipes(recipes, containerId, showSaveButton = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const user = getCurrentUser();
    const data = getCulinaryData();
    
    recipes.forEach(recipe => {
        const isSaved = user.savedRecipes.includes(recipe.id);
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe-card';
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p class="meta">${recipe.cookingTime} • ${recipe.servings} порции</p>
            <p class="difficulty ${recipe.difficulty}">${getDifficultyText(recipe.difficulty)}</p>
            <a href="#" class="btn" onclick="showRecipeDetails(${recipe.id}); return false;">Подробнее</a>
            ${showSaveButton ? 
                `<button class="save-btn ${isSaved ? 'saved' : ''}" 
                 onclick="toggleSaveRecipe(${recipe.id}, this); return false;">
                    ${isSaved ? '✓ Сохранено' : '+ Сохранить'}
                </button>` : ''}
        `;
        container.appendChild(recipeElement);
    });
}

function displayClasses(classes, containerId, showCancelButton = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const data = getCulinaryData();
    
    if (classes.length === 0) {
        container.innerHTML = '<p class="empty-message">Нет мастер-классов для отображения</p>';
        return;
    }
    
    classes.forEach(cls => {
        const master = data.masters.find(m => m.id === cls.masterId);
        const classElement = document.createElement('div');
        classElement.className = 'class-card';
        classElement.innerHTML = `
            <h3>${cls.title}</h3>
            <p class="master">Ведущий: ${master ? master.name : 'Неизвестен'}</p>
            <p class="date">${cls.date} в ${cls.time} (${cls.duration})</p>
            <p class="price">${cls.price} руб.</p>
            <a href="#" class="btn" onclick="showClassDetails(${cls.id}); return false;">Подробнее</a>
            ${showCancelButton ? 
                `<button class="cancel-btn" onclick="cancelClass(${cls.id}); updateProfileClasses(); return false;">
                    Отменить запись
                </button>` : ''}
        `;
        container.appendChild(classElement);
    });
}

// Вспомогательные функции
function getDifficultyText(difficulty) {
    const difficulties = {
        easy: "Легко",
        medium: "Средне",
        hard: "Сложно"
    };
    return difficulties[difficulty] || difficulty;
}

function toggleSaveRecipe(recipeId, button) {
    const user = getCurrentUser();
    const isSaved = user.savedRecipes.includes(recipeId);
    
    if (isSaved) {
        unsaveRecipe(recipeId);
        button.classList.remove('saved');
        button.textContent = '+ Сохранить';
    } else {
        saveRecipe(recipeId);
        button.classList.add('saved');
        button.textContent = '✓ Сохранено';
    }
    
    if (document.getElementById('saved-recipes')) {
        const savedRecipes = getCulinaryData().recipes.filter(r => user.savedRecipes.includes(r.id));
        displayRecipes(savedRecipes, 'saved-recipes', false);
    }
}

function updateProfileClasses() {
    if (document.getElementById('user-classes')) {
        const user = getCurrentUser();
        const userClasses = getCulinaryData().classes.filter(c => user.joinedClasses.includes(c.id));
        displayClasses(userClasses, 'user-classes', true);
    }
}

// Функция для показа деталей рецепта
function showRecipeDetails(recipeId) {
    const data = getCulinaryData();
    const recipe = data.recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            
            <div class="recipe-details">
                <div class="ingredients">
                    <h3>Ингредиенты:</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <button class="btn" onclick="generateShoppingList(${recipe.id})">Список покупок</button>
                </div>
                
                <div class="instructions">
                    <h3>Инструкция:</h3>
                    <p>${recipe.instructions}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Функция для генерации списка покупок
function generateShoppingList(recipeId) {
    const data = getCulinaryData();
    const recipe = data.recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    alert(`Список покупок для "${recipe.title}":\n\n- ${recipe.ingredients.join('\n- ')}`);
}

// Функция для показа мастер-классов конкретного мастера
function showMasterClasses(masterId) {
    const data = getCulinaryData();
    const master = data.masters.find(m => m.id === masterId);
    if (!master) return;
    
    const masterClasses = data.classes.filter(c => c.masterId === masterId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Мастер-классы от ${master.name}</h2>
            
            <div id="master-classes-list">
                ${masterClasses.length > 0 ? 
                    masterClasses.map(cls => `
                        <div class="class-card">
                            <h3>${cls.title}</h3>
                            <p class="date">${cls.date} в ${cls.time} (${cls.duration})</p>
                            <p class="price">${cls.price} руб.</p>
                            <a href="#" class="btn" onclick="showClassDetails(${cls.id}); return false;">Подробнее</a>
                        </div>
                    `).join('') : 
                    '<p>У этого мастера пока нет запланированных мастер-классов.</p>'}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Функция для показа деталей мастер-класса
function showClassDetails(classId) {
    const data = getCulinaryData();
    const cls = data.classes.find(c => c.id === classId);
    if (!cls) return;
    
    const master = data.masters.find(m => m.id === cls.masterId);
    const user = getCurrentUser();
    const isJoined = user.joinedClasses.includes(classId);
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>${cls.title}</h2>
            
            <div class="class-details">
                <div class="master-info">
                    <img src="${master ? master.image : 'https://via.placeholder.com/100?text=Master'}" alt="${master ? master.name : 'Master'}">
                    <h3>${master ? master.name : 'Неизвестен'}</h3>
                    <p>${master ? master.specialty : ''}</p>
                </div>
                
                <div class="class-info">
                    <p><strong>Дата:</strong> ${cls.date}</p>
                    <p><strong>Время:</strong> ${cls.time}</p>
                    <p><strong>Длительность:</strong> ${cls.duration}</p>
                    <p><strong>Цена:</strong> ${cls.price} руб.</p>
                    <p><strong>Мест осталось:</strong> ${cls.maxParticipants}</p>
                    
                    <button class="btn ${isJoined ? 'joined' : ''}" 
                            onclick="${isJoined ? `cancelClass(${cls.id})` : `signUpForClass(${cls.id})`}; 
                                    this.parentElement.parentElement.parentElement.parentElement.remove();
                                    ${isJoined ? `updateProfileClasses()` : `showClassDetails(${cls.id})`};
                                    return false;">
                        ${isJoined ? 'Отменить запись' : 'Записаться'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Функция для фильтрации рецептов
function filterRecipes() {
    const category = document.getElementById('category-filter').value;
    const difficulty = document.getElementById('difficulty-filter').value;
    
    const data = getCulinaryData();
    let filtered = [...data.recipes];
    
    if (category !== 'all') {
        filtered = filtered.filter(r => r.category === category);
    }
    
    if (difficulty !== 'all') {
        filtered = filtered.filter(r => r.difficulty === difficulty);
    }
    
    displayRecipes(filtered, 'all-recipes');
}

// Функция для фильтрации мастер-классов
function filterClasses() {
    const dateFilter = document.getElementById('date-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const cuisineFilter = document.getElementById('cuisine-filter').value;
    
    const data = getCulinaryData();
    let filtered = [...data.classes];
    
    // Фильтрация по дате (имитация)
    if (dateFilter === 'this-week') {
        filtered = filtered.filter(c => Math.random() > 0.5);
    } else if (dateFilter === 'this-month') {
        filtered = filtered.filter(c => Math.random() > 0.3);
    }
    
    // Фильтрация по цене
    if (priceFilter === '0-1000') {
        filtered = filtered.filter(c => c.price <= 1000);
    } else if (priceFilter === '1000-2000') {
        filtered = filtered.filter(c => c.price > 1000 && c.price <= 2000);
    } else if (priceFilter === '2000+') {
        filtered = filtered.filter(c => c.price > 2000);
    }
    
    // Фильтрация по кухне (имитация)
    if (cuisineFilter !== 'all') {
        filtered = filtered.filter(c => {
            const master = data.masters.find(m => m.id === c.masterId);
            return master && master.specialty.toLowerCase().includes(cuisineFilter);
        });
    }
    
    displayClasses(filtered, 'classes-list');
}

// Функция для генерации рекомендаций
function generateRecommendations() {
    if (!document.getElementById('recommended-recipes')) return;
    
    const data = getCulinaryData();
    const user = getCurrentUser();
    let recommended = [];
    
    if (user.savedRecipes.length > 0) {
        const savedCategory = data.recipes.find(r => r.id === user.savedRecipes[0]).category;
        recommended = data.recipes
            .filter(r => r.category === savedCategory && !user.savedRecipes.includes(r.id))
            .slice(0, 3);
    }
    
    if (recommended.length < 3) {
        const randomRecipes = data.recipes
            .filter(r => !user.savedRecipes.includes(r.id) && !recommended.includes(r))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3 - recommended.length);
        
        recommended = [...recommended, ...randomRecipes];
    }
    
    displayRecipes(recommended, 'recommended-recipes');
}

// Функция для редактирования профиля
function editProfile() {
    const user = getCurrentUser();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Редактирование профиля</h2>
            
            <form id="profile-form">
                <div class="form-group">
                    <label for="edit-name">Имя:</label>
                    <input type="text" id="edit-name" value="${user.name}" required>
                </div>
                
                <div class="form-group">
                    <label for="edit-email">Email:</label>
                    <input type="email" id="edit-email" value="${user.email}" required>
                </div>
                
                <div class="form-group">
                    <label for="edit-password">Новый пароль:</label>
                    <input type="password" id="edit-password" placeholder="Оставьте пустым, если не хотите менять">
                </div>
                
                <button type="submit" class="btn">Сохранить изменения</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const user = getCurrentUser();
        user.name = document.getElementById('edit-name').value;
        user.email = document.getElementById('edit-email').value;
        updateUser(user);
        
        alert('Изменения сохранены');
        modal.remove();
        
        if (document.getElementById('user-name')) {
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    const data = getCulinaryData();
    const user = getCurrentUser();
    
    // Главная страница
    if (document.getElementById('featured-recipes')) {
        displayRecipes(data.recipes.slice(0, 3), 'featured-recipes');
        displayClasses(data.classes.slice(0, 3), 'upcoming-classes');
    }
    
    // Страница рецептов
    if (document.getElementById('all-recipes')) {
        displayRecipes(data.recipes, 'all-recipes');
        document.getElementById('category-filter')?.addEventListener('change', filterRecipes);
        document.getElementById('difficulty-filter')?.addEventListener('change', filterRecipes);
    }
    
    // Страница мастеров
    if (document.getElementById('masters-list')) {
        const container = document.getElementById('masters-list');
        data.masters.forEach(master => {
            const masterElement = document.createElement('div');
            masterElement.className = 'master-card';
            masterElement.innerHTML = `
                <img src="${master.image}" alt="${master.name}">
                <h3>${master.name}</h3>
                <p class="specialty">${master.specialty}</p>
                <p class="bio">${master.bio}</p>
                <a href="#" class="btn" onclick="showMasterClasses(${master.id}); return false;">Мастер-классы</a>
            `;
            container.appendChild(masterElement);
        });
    }
    
    // Страница расписания
    if (document.getElementById('classes-list')) {
        displayClasses(data.classes, 'classes-list');
        document.getElementById('date-filter')?.addEventListener('change', filterClasses);
        document.getElementById('price-filter')?.addEventListener('change', filterClasses);
        document.getElementById('cuisine-filter')?.addEventListener('change', filterClasses);
    }
    
    // Страница профиля
    if (document.getElementById('user-profile')) {
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').textContent = user.email;
        
        // Сохраненные рецепты
        const savedRecipes = data.recipes.filter(r => user.savedRecipes.includes(r.id));
        if (savedRecipes.length > 0) {
            displayRecipes(savedRecipes, 'saved-recipes', false);
        } else {
            document.getElementById('saved-recipes').innerHTML = '<p class="empty-message">У вас пока нет сохраненных рецептов.</p>';
        }
        
        // Записанные мастер-классы
        const userClasses = data.classes.filter(c => user.joinedClasses.includes(c.id));
        displayClasses(userClasses, 'user-classes', true);
        
        // Рекомендации
        generateRecommendations();
    }
});

// Константы для чат-бота
const DEEPINFRA_API_KEY = "BXLBsZkO2GdXKmE0fUJfPjhRFZ6eSPI0";

// Элементы чата
const chatContainer = document.getElementById('chat-container');
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendMessageBtn = document.getElementById('sendMessage');

// Открытие/закрытие чата
openChatBtn.addEventListener('click', () => {
    chatContainer.classList.remove('hidden');
    openChatBtn.classList.add('hidden');
});

closeChatBtn.addEventListener('click', () => {
    chatContainer.classList.add('hidden');
    openChatBtn.classList.remove('hidden');
});

// Отправка сообщения
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Добавляем сообщение пользователя
    addMessage(message, 'user');
    userInput.value = '';

    try {
        const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPINFRA_API_KEY}`
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
                messages: [
                    {
                        role: "system",
                        content: "Ты профессиональный шеф-повар. Давай четкие рецепты, полезные кулинарные советы и рекомендации по приготовлению блюд. Отвечай на русском языке."
                    },
                    {
                        role: "user", 
                        content: message
                    }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        addMessage(botReply, 'bot');
    } catch (error) {
        console.error('Ошибка:', error);
        addMessage(`Извините, произошла ошибка: ${error.message}`, 'bot');
    }
}

// Добавление сообщения в чат
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${sender}-message`);
    messageElement.innerHTML = `<p>${sender === 'user' ? 'Вы' : 'Помощник'}: ${text}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Обработчики событий
sendMessageBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Приветственное сообщение
window.addEventListener('load', () => {
    setTimeout(() => {
        addMessage("Привет! Я ваш помощник по рецептам. Спросите меня об интересующих вас вопросах.", 'bot');
    }, 1000);
});