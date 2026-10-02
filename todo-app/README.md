# 📋 Aplicación de Lista de Tareas (To-Do List)

Una aplicación web moderna y responsiva para gestionar tu lista de tareas con almacenamiento local.

## ✨ Características

### 📌 Gestión de Tareas
- ✅ Crear nuevas tareas
- ✅ Marcar tareas como completadas
- ✅ Eliminar tareas individuales
- ✅ Limpiar todas las tareas completadas

### 🏷️ Categorización
- **Trabajo** - Tareas relacionadas con el trabajo
- **Personal** - Asuntos personales
- **Hogar** - Tareas del hogar
- **Salud** - Salud y bienestar
- **Otro** - Otras categorías

### 🔍 Filtrado Avanzado
- Filtrar por estado: Todas, Pendientes, Completadas
- Filtrar por categoría: Selecciona una categoría específica
- Combinación de ambos filtros

### 📊 Estadísticas
- Total de tareas
- Tareas completadas
- Tareas pendientes
- Barra de progreso visual

### 💾 Almacenamiento Local
- Todas las tareas se guardan automáticamente en localStorage
- Las tareas persisten entre sesiones
- No requiere conexión a internet

### 📤 Importar / Exportar
- **Exportar** tareas a archivo JSON
- **Importar** tareas desde archivo JSON
- Facilita el respaldo y transferencia de datos

### 🎨 Diseño
- Interfaz oscura y moderna
- Totalmente responsiva (móvil, tablet, desktop)
- Animaciones suaves
- Iconos intuitivos

## 🚀 Uso

### Instalación

1. Descarga los archivos o clona el repositorio
2. Abre `index.html` en tu navegador

### Cómo usar

#### Agregar una tarea
1. Escribe tu tarea en el campo de entrada
2. Selecciona una categoría
3. Haz clic en "Añadir" o presiona Enter

#### Completar una tarea
- Marca la casilla de verificación junto a la tarea

#### Eliminar una tarea
- Haz clic en el botón de papelera (🗑️) al lado de la tarea

#### Filtrar tareas
- Usa los botones "Todas", "Pendientes", "Completadas"
- Selecciona una categoría en el filtro de categorías

#### Exportar tareas
1. Haz clic en "Exportar JSON"
2. El archivo se descargará con formato `tareas_FECHA.json`

#### Importar tareas
1. Haz clic en "Importar JSON"
2. Selecciona un archivo JSON de tareas
3. Las tareas se cargarán en la lista

#### Limpiar completadas
- Haz clic en "Limpiar completadas" para eliminar todas las tareas completadas

## 📁 Estructura de Archivos

```
todo-app/
├── index.html       # Estructura HTML
├── styles.css       # Estilos y diseño
├── script.js        # Lógica JavaScript
└── README.md        # Este archivo
```

## 🔍 Estructura de Datos

Cada tarea se almacena con la siguiente estructura:

```json
{
  "id": 1234567890,
  "text": "Descripción de la tarea",
  "category": "trabajo",
  "completed": false,
  "createdAt": "2/10/2026 14:30:45"
}
```

## 💾 LocalStorage

Las tareas se almacenan en la clave `todoItems` del localStorage del navegador:

```javascript
localStorage.getItem('todoItems'); // Obtener tareas
localStorage.setItem('todoItems', JSON.stringify(tasks)); // Guardar tareas
```

## 🎯 Ejemplo de uso avanzado

### Exportar y hacer respaldo
```bash
1. Abre la aplicación
2. Haz clic en "Exportar JSON"
3. Guarda el archivo en un lugar seguro
```

### Restaurar desde respaldo
```bash
1. Abre la aplicación
2. Haz clic en "Importar JSON"
3. Selecciona tu archivo guardado
```

## 🛠️ Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript vanilla** - Lógica y funcionalidad
- **LocalStorage API** - Almacenamiento persistente

## 📱 Compatibilidad

- ✅ Chrome (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Navegadores móviles (iOS Safari, Chrome Mobile)

## 🚀 Mejoras futuras

- [ ] Recordatorios por notificación
- [ ] Sincronización en la nube
- [ ] Tareas recurrentes
- [ ] Etiquetas personalizadas
- [ ] Temas de color
- [ ] Modo oscuro/claro
- [ ] Colaboración en tiempo real
- [ ] Integración con calendario

## 📝 Notas

- Los datos se guardan localmente en tu navegador
- Limpiar el almacenamiento local del navegador eliminará todas las tareas
- Para hacer backup, usa la función "Exportar JSON"
- Puedes importar tareas desde múltiples archivos (se añadirán a las existentes)

## 👨‍💻 Autor

Creado por Demian5943

## 📄 Licencia

Libre para usar y modificar
