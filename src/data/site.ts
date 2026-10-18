// ── Contenido del sitio: única fuente de verdad ─────────────────────────────

export const site = {
  name: 'Helger Santiago',
  firstName: 'Helger',
  role: 'Software Developer',
  intro:
    'Construyo aplicaciones web, de escritorio y sistemas conectados a hardware. Hoy trabajo como desarrollador y acepto proyectos freelance seleccionados.',
  location: 'Cúcuta, Colombia',
  timezone: 'GMT-5',
  // PENDIENTE: confirmar dominio final (debe coincidir con `site` en astro.config.mjs)
  url: 'https://helger.dev',
  ogImage: '/og-image.svg',
  github: 'https://github.com/SePuLvEdA22',
  githubHandle: 'SePuLvEdA22',
  linkedin: '', // PENDIENTE: ej. https://www.linkedin.com/in/tu-usuario. Vacío = se oculta.
  email: 'hj.santiago.sepulveda@gmail.com',
  cvUrl: '', // PENDIENTE: /cv-helger-santiago.pdf en /public. Vacío = se oculta.
  availability: 'Abierto a proyectos freelance',
};

export type Project = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  year?: string;
  codeUrl: string;
  demoUrl?: string;
  image?: string; // captura 1280x800 en /public/projects/
  status?: string;
};

export const projects: Project[] = [
  {
    title: 'BodyFitGym',
    summary: 'Control de acceso y gestión integral para gimnasios.',
    description:
      'App de escritorio con Electron + React: membresías, pagos recurrentes, SQLite local, auto-update y monitoreo con Sentry. Se comunica por serial con Arduino para operar torniquetes y lectores biométricos en tiempo real.',
    tags: ['Electron', 'React', 'TypeScript', 'SQLite', 'Arduino'],
    codeUrl: 'https://github.com/SePuLvEdA22/software_gym',
    status: 'En producción con hardware real',
  },
  {
    title: 'Serene Boutique',
    summary: 'E-commerce fullstack con dashboard.',
    description:
      'Next.js + React 19 con catálogo, carrito, autenticación (jose + bcrypt), Postgres en Neon, uploads en Vercel Blob, métricas con Recharts y tests con Vitest.',
    tags: ['Next.js', 'TypeScript', 'Postgres', 'Vitest'],
    codeUrl: 'https://github.com/SePuLvEdA22/serene-boutique',
    demoUrl: 'https://serene-boutique.vercel.app',
    image: '/projects/serene-boutique.jpg',
  },
  {
    title: 'RH Eventos',
    summary: 'Landing para una empresa de eventos.',
    description:
      'Galería interactiva, testimonios y formulario de contacto. React, Vite y Tailwind, optimizada para móvil.',
    tags: ['React', 'Vite', 'Tailwind'],
    codeUrl: 'https://github.com/SePuLvEdA22/rh-events',
    demoUrl: 'https://rheventos.vercel.app/',
    image: '/projects/rh-eventos.jpg',
  },
  {
    title: 'Control Gastos',
    summary: 'App móvil de finanzas personales.',
    description:
      'Expo Router y React Native con persistencia local, Secure Store, autenticación biométrica y estado con Zustand.',
    tags: ['React Native', 'Expo', 'Zustand'],
    codeUrl: 'https://github.com/SePuLvEdA22/control_gastos',
  },
  {
    title: 'Portfolio XP',
    summary: 'Portafolio con estética de Windows XP.',
    description:
      'Escritorio con ventanas arrastrables, barra de tareas y menú inicio funcionales. React 19 y Vite.',
    tags: ['React', 'Vite', 'CSS'],
    codeUrl: 'https://github.com/SePuLvEdA22/portfolio',
    demoUrl: 'https://portafolioxp.vercel.app/',
    image: '/projects/portfolio-xp.jpg',
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'SQL'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Astro', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Postgres', 'SQLite'] },
  { group: 'Escritorio y móvil', items: ['Electron', 'React Native', 'Expo'] },
  { group: 'Infra', items: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'] },
  { group: 'Hardware', items: ['Arduino', 'Comunicación serial', 'Biometría'] },
];

export type Service = { title: string; text: string };

export const services: Service[] = [
  { title: 'Sitios y landing pages', text: 'Rápidos, con SEO técnico y desplegados en tu cuenta.' },
  { title: 'Apps de escritorio', text: 'Software instalable con base de datos local y actualizaciones automáticas.' },
  { title: 'E-commerce y dashboards', text: 'Catálogo, carrito, autenticación y paneles con métricas.' },
  { title: 'Hardware e IoT', text: 'Software que controla torniquetes, lectores y sensores en tiempo real.' },
];

export const processSteps: string[] = [
  'Llamada corta para entender el problema. Recibes alcance, precio cerrado y plazo.',
  'Validamos estructura y diseño antes de escribir código.',
  'Construyo por hitos con demos semanales.',
  'Entrego desplegado, con el código en tu repositorio.',
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  { question: '¿Cuánto cuesta un proyecto?', answer: 'Depende del alcance. Cuéntame qué necesitas y te envío una propuesta con precio cerrado y plazo, sin compromiso.' },
  { question: '¿En cuánto tiempo lo tienes listo?', answer: 'Una landing toma de 1 a 3 semanas; una app a medida se divide en hitos con demos semanales. El plazo exacto va en la propuesta.' },
  { question: '¿El código queda en mis manos?', answer: 'Sí. Todo queda en tu repositorio, desplegado en tus cuentas y documentado.' },
  { question: '¿Ofreces mantenimiento?', answer: 'Sí. Después de la entrega puedes contratar mejoras por horas o por mes.' },
];
