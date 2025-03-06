# EcoFruit Store - Prueba Técnica Frontend

Este proyecto es una aplicación de e-commerce desarrollada como parte de la Prueba Técnica para el cargo Senior Frontend Developer. La aplicación permite a los usuarios navegar por un catálogo de productos (frutas), agregarlos al carrito, realizar compras y generar facturas. Además, cuenta con un panel de administración para visualizar todas las compras realizadas.

## Tecnologías utilizadas

- React 19 con TypeScript
- Vite como bundler
- Zustand para manejo de estado global
- Material UI para componentes de interfaz
- React Router v7 para navegación
- React Hook Form para manejo de formularios
- Jest y React Testing Library para pruebas
- Storybook para documentación de componentes
- Turborepo para gestión del monorepo
- Lefthook para git hooks
- ESLint y TypeScript para calidad de código

## 📂 Estructura del proyecto

El código está organizado como un monorepo con Turborepo para manejar dependencias y compartir configuración entre paquetes. La estructura es la siguiente:

```bash
smart-talent/
├── apps/
│   └── web/              # Aplicación principal
│       ├── src/
│       │   ├── components/   # Componentes de la aplicación
│       │   ├── hooks/        # Custom hooks
│       │   ├── pages/        # Paginas
│       │   ├── store/        # Estado global con Zustand
│       │   ├── types/        # Tipos compartidos
│       │   └── router/       # Configuración de rutas
├── packages/
│   ├── ui-library/       # Biblioteca de componentes UI
│   │   ├── src/
│   │   │   └── components/   # Componentes reutilizables
│   │   └── stories/          # Documentación en Storybook
│   └── eslint-config/    # Configuración de ESLint compartida
└── turbo.json            # Configuración de Turborepo
```

## Instalación y ejecución

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/dalejandrorincon/smart-talent.git
cd smart-talent

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir el proyecto
npm run build

# Ejecutar pruebas
npm run test

# Ejecutar linting
npm run lint

# Ejecutar Storybook
cd packages/ui-library
npm run storybook
```

# Tienda de Frutas 🛒🍏

## Funcionalidades principales

### Cliente

- 📌 **Navegación** por catálogo de productos (frutas).
- 🔍 **Filtrado** por categorías.
- 🛍 **Agregar/quitar** productos del carrito.
- ✅ **Realizar compra** con validación de país (solo países en América).
- 🧾 **Generación de factura** almacenada en `localStorage`.

### Administrador

- 🔑 **Acceso al panel de administración** (usuario con "admin" en el email).
- 📂 **Visualización de facturas** generadas.
- 📄 **Detalles completos** de cada compra.
- 🖨 **Opción para imprimir** facturas.

---

## 🛠 Decisiones técnicas

### 🚀 Monorepo con Turborepo

Utilicé **Turborepo** para estructurar el proyecto como un monorepo, facilitando la reutilización de componentes, la centralización de configuraciones y la gestión eficiente de dependencias.

### 🔄 Manejo de estado con Zustand

Utilicé **Zustand** por su API sencilla y eficiente. Permite gestionar el estado global sin dependencias innecesarias y admite persistencia con **persist** para conservar datos entre sesiones.

### 🎨 Biblioteca UI

Se desarrolló una **biblioteca de componentes** para:

- 📌 **Centralizar componentes reutilizables**.
- 🚀 **Permitir evolución independiente** de componentes.
- 📖 **Documentación con Storybook**.
- 🎨 **Consistencia visual** en toda la aplicación.

---

## 🧪 Testing

Se implementaron **pruebas automatizadas** con Jest y React Testing Library:

- ✅ **Pruebas de componentes en aislamiento**.
- 🔄 **Mocking de dependencias** (hooks, store).
- 🖱 **Validación de interacciones de usuario**.
- 🌍 **Verificación de reglas de negocio** (validación de países).

---
