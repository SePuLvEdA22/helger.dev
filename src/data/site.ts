// ── Personaliza aquí tus enlaces antes de publicar ──────────────────────────
// Reemplaza los placeholders (#) por tus URLs reales.
export const site = {
  name: 'Helger Santiago',
  brand: 'DevCore',
  role: 'Software Developer',
  roleSuffix: '& Estudiante de Ingeniería',
  tagline:
    'Construyendo soluciones de software de alto impacto, aplicaciones de escritorio interactivas y arquitecturas web modernas, eficientes y escalables.',
  location: 'Cúcuta, Colombia',
  timezone: 'GMT-5',
  // PENDIENTE: confirmar dominio final de Vercel (ej. https://helger-dev.vercel.app o https://helger.dev)
  url: 'https://helger.dev',
  ogImage: '/favicon.svg', // PENDIENTE: generar og-image 1200x630 en /public y actualizar aquí
  github: 'https://github.com/SePuLvEdA22',
  githubHandle: 'github.com/SePuLvEdA22',
  linkedin: '#', // PENDIENTE: ej. https://www.linkedin.com/in/tu-usuario
  email: 'hj.santiago.sepulveda@gmail.com',
  // PENDIENTE: subir el PDF a /public/cv-helger-santiago.pdf para activar el botón
  cvUrl: '/cv-helger-santiago.pdf',
  // PENDIENTE (opcional): solo dígitos con código país, ej. '573001234567'. Vacío = se oculta.
  whatsapp: '',
  availability: 'Disponible para nuevos proyectos / Open to Work',
} as const;

export type Project = {
  featured?: boolean;
  kicker: string;
  kickerColor: 'primary' | 'secondary' | 'tertiary';
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  codeUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  badge?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    featured: true,
    kicker: 'Proyecto Destacado',
    kickerColor: 'primary',
    title: 'BodyFitGym',
    subtitle: 'Sistema de Control de Acceso & Gestión Integral de Gimnasio',
    description:
      'Aplicación de escritorio desarrollada en Electron que gestiona membresías, control de pagos recurrentes y acceso físico automatizado mediante hardware Arduino y torniquetes/sensores en tiempo real. Resuelve la sincronización local sin dependencia constante de internet.',
    tech: ['Electron', 'JavaScript', 'Arduino', 'Node.js', 'Hardware I/O', 'SQLite'],
    codeUrl: 'https://github.com/SePuLvEdA22/software_gym',
    badge: 'Producción Local'
  },
  {
    // PLACEHOLDER — reemplaza con tu proyecto real (ej. tienda online en Next.js)
    kicker: 'Web Application / SaaS',
    kickerColor: 'secondary',
    title: 'CloudTask SaaS',
    subtitle: 'Gestión de Flujos y Tareas en Tiempo Real',
    description:
      'Arquitectura fullstack con renderizado híbrido, autenticación JWT, API RESTful y microservicios containerizados para productividad colaborativa empresarial.',
    tech: ['Next.js', 'React', 'Docker', 'AWS'],
    codeUrl: 'https://github.com/SePuLvEdA22',
    demoUrl: '#contacto',
    demoLabel: 'Demo Info',
    placeholder: true
  },
  {
    // PLACEHOLDER — reemplaza con tu proyecto real
    kicker: 'Backend & Microservicios',
    kickerColor: 'tertiary',
    title: 'DevMetrics API',
    subtitle: 'Monitoreo y Telemetría en Tiempo Real',
    description:
      'Servicio backend escalable para ingesta de eventos de infraestructura y métricas con arquitectura serverless y contenedores de alta disponibilidad.',
    tech: ['Node.js', 'Docker', 'AWS Lambda', 'Redis'],
    codeUrl: 'https://github.com/SePuLvEdA22',
    demoUrl: '#contacto',
    demoLabel: 'Endpoints',
    placeholder: true
  },
  {
    // PLACEHOLDER — reemplaza con tu tienda online en Next.js cuando esté lista
    kicker: 'E-Commerce Moderno',
    kickerColor: 'primary',
    title: 'NextCommerce Store',
    subtitle: 'E-Commerce Headless de Alto Rendimiento',
    description:
      'Tienda digital moderna con Server-Side Rendering (SSR), carrito persistente sincronizado, optimización SEO avanzada y pasarela segura de cobros.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Stripe'],
    codeUrl: 'https://github.com/SePuLvEdA22',
    demoUrl: '#contacto',
    demoLabel: 'Preview',
    placeholder: true
  }
];

export type Skill = {
  name: string;
  meta: string;
  description: string;
  footer: string;
  tag: string;
  accent: 'primary' | 'secondary' | 'tertiary';
  icon: string; // nombre de icono lucide (svg inline en Skills.astro)
};

export const skills: Skill[] = [
  { name: 'JavaScript', meta: 'ES6+, Async, APIs', description: 'Programación reactiva, manipulación avanzada de promesas, Streams y motores V8.', footer: 'Lenguaje Base', tag: 'Core Master', accent: 'primary', icon: 'braces' },
  { name: 'Electron', meta: 'IPC & Hardware Bridge', description: 'Main/Renderer Process, integración de puertos serie para periféricos e interfaces desktop.', footer: 'Ecosistema Nativo', tag: 'Desktop Apps', accent: 'secondary', icon: 'monitor' },
  { name: 'Next.js', meta: 'App Router & SSR', description: 'Server Actions, Static Site Generation, optimización web y patrones modernos de renderizado.', footer: 'Framework React', tag: 'Fullstack Web', accent: 'tertiary', icon: 'layers' },
  { name: 'Node.js', meta: 'Express & Microservicios', description: 'Arquitecturas RESTful, middlewares de autenticación, sockets y controladores de eventos.', footer: 'Runtime Server', tag: 'Backend API', accent: 'primary', icon: 'terminal' },
  { name: 'Docker', meta: 'Compose & Multi-stage', description: 'Estandarización de entornos herméticos, empaquetado de microservicios y despliegue rápido.', footer: 'Contenedores', tag: 'DevOps & Env', accent: 'secondary', icon: 'container' },
  { name: 'AWS', meta: 'EC2, S3 & Lambda', description: 'Instancias Linux en la nube, almacenamiento seguro de assets y funciones serverless event-driven.', footer: 'Cloud Platform', tag: 'Cloud Infra', accent: 'tertiary', icon: 'cloud' },
  { name: 'Git & GitHub', meta: 'Branching & Actions', description: 'Control de versiones exhaustivo, GitHub Actions, Pull Requests colaborativas y releases automatizadas.', footer: 'Herramientas', tag: 'VCS & CI', accent: 'primary', icon: 'git' },
  { name: 'Arduino & IoT', meta: 'Serial Communication', description: 'Controladores de relé, lectura biométrica, torniquetes y telemetría de sensores en microchips.', footer: 'Sistemas Físicos', tag: 'Hardware I/O', accent: 'secondary', icon: 'cpu' }
];
