// Tokens de acento compartidos (primary / secondary / tertiary).
// Sistema "Ink + Bone + Ember": primary es el único acento vívido (ember),
// secondary/tertiary son neutros cálidos apagados para no competir.
export type Accent = 'primary' | 'secondary' | 'tertiary';

export const accentText: Record<Accent, string> = {
  primary: 'text-orange-700 dark:text-primary',
  secondary: 'text-stone-600 dark:text-secondary',
  tertiary: 'text-amber-800 dark:text-tertiary',
};

export const accentDot: Record<Accent, string> = {
  primary: 'bg-orange-600 dark:bg-primary',
  secondary: 'bg-stone-400 dark:bg-secondary',
  tertiary: 'bg-amber-700/70 dark:bg-tertiary',
};

export const accentTag: Record<Accent, string> = {
  primary:
    'border-orange-700/25 bg-orange-700/10 text-orange-800 dark:border-primary/20 dark:bg-primary/10 dark:text-primary',
  secondary:
    'border-stone-400/40 bg-stone-500/10 text-stone-600 dark:border-secondary/20 dark:bg-secondary/10 dark:text-secondary',
  tertiary:
    'border-amber-800/25 bg-amber-800/10 text-amber-800 dark:border-tertiary/20 dark:bg-tertiary/10 dark:text-tertiary',
};

export const accentBox: Record<Accent, string> = {
  primary:
    'border-orange-700/25 bg-orange-700/10 text-orange-700 dark:border-primary/30 dark:bg-primary-container/20 dark:text-primary',
  secondary:
    'border-stone-400/40 bg-stone-500/10 text-stone-600 dark:border-secondary/30 dark:bg-secondary-container/20 dark:text-secondary',
  tertiary:
    'border-amber-800/25 bg-amber-800/10 text-amber-800 dark:border-tertiary/30 dark:bg-tertiary-container/20 dark:text-tertiary',
};

export const accentFoot: Record<Accent, string> = {
  primary: 'text-orange-800 dark:text-primary',
  secondary: 'text-stone-600 dark:text-secondary',
  tertiary: 'text-amber-800 dark:text-tertiary',
};
