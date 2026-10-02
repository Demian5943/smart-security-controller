// ============================================
// TODO LIST APPLICATION - Local Storage
// ============================================

const STORAGE_KEY = 'todoItems';

// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryFilter = document.getElementById('categoryFilter');
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const progressFill = document.getElementById('progressFill');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');

// Estado de la aplicación
let tasks = [];
let currentFilter = 'all';
let currentCategoryFilter = '';

// ============================================
// FUNCIONES DE ALMACENAMIENTO LOCAL
// ============================================

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  tasks = stored ? JSON.parse(stored) : [];
}

// ============================================
// FUNCIONES DE TAREAS
// ============================================

function addTask() {
  const text = taskInput.value.trim();
  const category = categorySelect.value;

  if (!text) {
    taskInput.focus();
    return;
  }

  const task = {
    id: Date.now(),
    text,
    category,
    completed: false,
    createdAt: new Date().toLocaleString('es-ES')
  };

  tasks.unshift(task);
  saveTasks();
  taskInput.value = '';
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

function clearCompleted() {
  if (confirm('¿Eliminar todas las tareas completadas?')) {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    render();
  }
}

// ============================================
// FUNCIONES DE FILTRADO
// ============================================

function getFilteredTasks() {
  let filtered = tasks;

  // Filtro de estado
  if (currentFilter === 'active') {
    filtered = filtered.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = filtered.filter(t => t.completed);
  }

  // Filtro de categoría
  if (currentCategoryFilter) {
    filtered = filtered.filter(t => t.category === currentCategoryFilter);
  }

  return filtered;
}

// ============================================
// FUNCIONES DE ESTADÍSTICAS
// ============================================

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
  progressFill.style.width = percentage + '%';
}

// ============================================
// EXPORTAR / IMPORTAR
// ============================================

function exportToJSON() {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tareas_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importFromJSON(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        render();
        alert('Tareas importadas correctamente');
      } else {
        alert('Formato de archivo inválido');
      }
    } catch (err) {
      alert('Error al importar: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// ============================================
// RENDERIZADO
// ============================================

function render() {
  const filtered = getFilteredTasks();

  // Limpiar lista
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.add('show');
  } else {
    emptyState.classList.remove('show');
    filtered.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <input
          type="checkbox"
          class="checkbox"
          ${task.completed ? 'checked' : ''}
          onchange="toggleTask(${task.id})"
        />
        <div class="task-content">
          <span class="task-text">${escapeHtml(task.text)}</span>
          <div class="task-meta">
            <span class="task-category ${task.category}">${task.category}</span>
            <span class="task-date">${task.createdAt}</span>
          </div>
        </div>
        <div class="task-actions">
          <button class="action-btn" onclick="deleteTask(${task.id})" title="Eliminar">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  updateStats();
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// EVENT LISTENERS
// ============================================

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    render();
  });
});

categoryFilter.addEventListener('change', (e) => {
  currentCategoryFilter = e.target.value;
  render();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

exportBtn.addEventListener('click', exportToJSON);

importBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) {
    importFromJSON(e.target.files[0]);
    fileInput.value = '';
  }
});

// ============================================
// INICIALIZACIÓN
// ============================================

window.addEventListener('load', () => {
  loadTasks();
  render();
  taskInput.focus();
});
