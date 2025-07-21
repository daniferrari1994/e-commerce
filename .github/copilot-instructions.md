# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Proyecto E-commerce con Next.js y TypeScript

Este es un proyecto de e-commerce moderno construido con las siguientes tecnologías:

### Stack Principal
- **Next.js 14+** con App Router y Turbopack
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos optimizados
- **ESLint** para linting

### Librerías de Estado y Datos
- **TanStack Query** para gestión de estado del servidor (cache, sincronización, etc.)
- **Zustand** para estado global de la aplicación
- **React Hook Form** con Zod para formularios optimizados y validación

### UI y Componentes
- **Radix UI** para componentes primitivos accesibles
- **Lucide React** para iconos
- **Framer Motion** para animaciones performantes
- **next-themes** para modo oscuro/claro

### Convenciones de Código
1. Usar **componentes funcionales** con hooks
2. Implementar **Server Components** cuando sea posible para mejor rendimiento
3. Usar **TypeScript estricto** - siempre tipar props e interfaces
4. Aplicar **código modular** - un componente por archivo
5. Seguir la estructura de carpetas de **Next.js App Router**

### Patrones de Rendimiento
- Lazy loading con `dynamic()` para componentes pesados
- Optimización de imágenes con `next/image`
- Memoización apropiada con `useMemo` y `useCallback`
- Code splitting automático de Next.js
- Server-side rendering cuando sea beneficioso

### Estructura de Archivos
```
src/
├── app/                 # App Router de Next.js
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (botones, inputs, etc.)
│   └── layout/         # Componentes de layout
├── lib/                # Utilidades y configuraciones
├── hooks/              # Custom hooks
├── stores/             # Stores de Zustand
└── types/              # Tipos de TypeScript
```

### Instrucciones Específicas para E-commerce
- Al crear componentes de productos, incluir optimizaciones de SEO
- Implementar lazy loading para listas de productos
- Usar Server Components para listados y Client Components para interactividad
- Optimizar imágenes de productos automáticamente
- Implementar estados de carga y error apropiados
- Seguir patrones de accesibilidad para e-commerce
