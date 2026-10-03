// ── Personaliza aquí tus enlaces antes de publicar ──────────────────────────
// Reemplaza los placeholders (#) por tus URLs reales.
import type { Accent } from '../utils/accent';
import type { IconName } from '../components/Icon.astro';

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
  ogImage: '/og-image.svg',
  github: 'https://github.com/SePuLvEdA22',
  githubHandle: 'github.com/SePuLvEdA22',
  linkedin: '#', // PENDIENTE: ej. https://www.linkedin.com/in/tu-usuario
  email: 'hj.santiago.sepulveda@gmail.com',
  // PENDIENTE: subir el PDF a /public/cv-helger-santiago.pdf para activar el botón
  cvUrl: '/cv-helger-santiago.pdf',
  // PENDIENTE (opcional): solo dígitos con código país, ej. '573001234567'. Vacío = se oculta.
  whatsapp: '' as string,
  availability: 'Disponible para nuevos proyectos / Open to Work',
} as const;

export type Project = {
  featured?: boolean;
  kicker: string;
  kickerColor: Accent;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  codeUrl: string;
  demoUrl?: string;
  demoLabel?: string;
  badge?: string;
  outcome?: string;
  icon: IconName;
};

export const projects: Project[] = [
  {
    featured: true,
    kicker: 'Proyecto Destacado',
    kickerColor: 'primary',
    title: 'BodyFitGym',
    subtitle: 'Sistema de Control de Acceso & Gestión Integral de Gimnasio',
    description:
      'Sistema profesional de administración y control de acceso para gimnasios: app de escritorio Electron + React con membresías, pagos recurrentes, SQLite local, auto-update con electron-updater y monitoreo Sentry. Integración con hardware de acceso físico en tiempo real.',
    tech: ['Electron', 'TypeScript', 'React', 'SQLite', 'Sentry', 'Vite'],
    codeUrl: 'https://github.com/SePuLvEdA22/software_gym',
    badge: 'Producción Local',
    outcome: 'Operando en producción local con hardware real',
    icon: 'cpu'
  },
  {
    kicker: 'Web Application',
    kickerColor: 'secondary',
    title: 'RH Eventos',
    subtitle: 'Landing Moderna de Eventos & Responsive',
    description:
      'Landing profesional para servicios de eventos con galería interactiva, testimonios y formulario de contacto. Construida con React 18, Vite 5, Tailwind CSS y Lucide, optimizada para todos los dispositivos.',
    tech: ['React', 'Vite', 'Tailwind', 'JavaScript'],
    codeUrl: 'https://github.com/SePuLvEdA22/rh-events',
    demoUrl: 'https://rheventos.vercel.app/',
    demoLabel: 'Ver Demo',
    outcome: 'Desplegada en Vercel con demo en vivo',
    icon: 'layers'
  },
  {
    kicker: 'Mobile App / Finanzas',
    kickerColor: 'tertiary',
    title: 'Control Gastos App',
    subtitle: 'Gestión de Finanzas Personales en Expo',
    description:
      'App móvil con Expo Router y React Native para registro de gastos, persistencia con Async Storage y Secure Store, autenticación local biométrica y estado global con Zustand.',
    tech: ['Expo', 'React Native', 'TypeScript', 'Zustand'],
    codeUrl: 'https://github.com/SePuLvEdA22/control_gastos',
    outcome: 'App móvil funcional construida con Expo',
    icon: 'chart'
  },
  {
    kicker: 'E-Commerce Moderno',
    kickerColor: 'primary',
    title: 'Serene Boutique',
    subtitle: 'Tienda Fullstack con Dashboard & Deploy en Vercel',
    description:
      'E-commerce Next.js 16 + React 19 con catálogo, carrito, auth con jose + bcrypt, base Neon Postgres, uploads en Vercel Blob, dashboard con Recharts y tests con Vitest.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Neon', 'Vercel Blob'],
    codeUrl: 'https://github.com/SePuLvEdA22/serene-boutique',
    demoUrl: 'https://serene-boutique.vercel.app',
    demoLabel: 'Ver Demo',
    outcome: 'Desplegada en Vercel con tests Vitest',
    icon: 'bag'
  },
  {
    kicker: 'Web Interactiva',
    kickerColor: 'secondary',
    title: 'Portfolio XP',
    subtitle: 'Portafolio interactivo estilo Windows XP',
    description:
      'Portafolio web con estética de Windows XP: escritorio con iconos clásicos, ventanas arrastrables, barra de tareas y menú inicio funcionales. Construido con React 19 y Vite.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    codeUrl: 'https://github.com/SePuLvEdA22/portfolio',
    demoUrl: 'https://portafolioxp.vercel.app/',
    demoLabel: 'Ver Demo',
    outcome: 'Desplegada en Vercel con demo en vivo',
    icon: 'monitor'
  }
];

export type Skill = {
  name: string;
  meta: string;
  description: string;
  footer: string;
  tag: string;
  accent: Accent;
  icon: IconName;
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

export type Service = {
  title: string;
  text: string;
  proof: string;
  accent: Accent;
  icon: IconName;
};

export const services: Service[] = [
  { title: 'Sitios y landing pages', text: 'Webs rápidas y optimizadas para convertir visitas en clientes, con SEO técnico y despliegue incluido.', proof: 'Ej: RH Eventos · Serene Boutique', accent: 'primary', icon: 'layers' },
  { title: 'Apps de escritorio', text: 'Software instalable para Windows con base de datos local, actualizaciones automáticas y conexión a periféricos.', proof: 'Ej: BodyFitGym', accent: 'secondary', icon: 'monitor' },
  { title: 'E-commerce y dashboards', text: 'Tiendas con catálogo, carrito y autenticación, más paneles con métricas para operar tu negocio.', proof: 'Ej: Serene Boutique', accent: 'tertiary', icon: 'bag' },
  { title: 'Hardware e IoT', text: 'Puentes entre software y mundo físico: torniquetes, biometría, sensores y control de acceso en tiempo real.', proof: 'Ej: BodyFitGym + Arduino', accent: 'primary', icon: 'cpu' }
];

export type ProcessStep = {
  title: string;
  text: string;
};

export const processSteps: ProcessStep[] = [
  { title: 'Descubrimiento', text: 'Llamada de 20 minutos para entender tu negocio. Recibes propuesta con alcance, precio cerrado y plazo.' },
  { title: 'Diseño', text: 'Estructura, textos y estilo validados contigo antes de escribir código. Sin sorpresas al final.' },
  { title: 'Construcción', text: 'Desarrollo por hitos con demos privadas. Ves el avance real cada semana y pides ajustes.' },
  { title: 'Entrega', text: 'Despliegue, accesos y código en tu repositorio, con acompañamiento inicial incluido.' }
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  { question: '¿Cuánto cuesta un proyecto?', answer: 'Depende del alcance. Cuéntame qué necesitas y te envío propuesta con precio cerrado y plazo, sin compromiso.' },
  { question: '¿En cuánto tiempo lo tienes listo?', answer: 'Una landing típica toma de 1 a 3 semanas; una app a medida se divide en hitos con demos semanales. El plazo exacto va en la propuesta.' },
  { question: '¿Trabajas de forma remota?', answer: 'Sí. Estoy en Cúcuta (GMT-5) y trabajo remoto o híbrido, con demos por videollamada y comunicación diaria.' },
  { question: '¿El código queda en mis manos?', answer: 'Sí. Todo queda en tu repositorio, desplegado en tus cuentas y documentado para que no dependas de mí.' },
  { question: '¿Ofreces mantenimiento?', answer: 'Sí. Después de la entrega puedes contratar acompañamiento y mejoras por horas o por mes.' },
  { question: '¿Cómo empezamos?', answer: 'Escríbeme por correo o GitHub contando tu idea en dos líneas. Respondo en menos de 24 horas.' }
];
