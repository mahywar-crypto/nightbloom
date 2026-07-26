import { FONT_BOLD, FONT_REGULAR, FONT_SEMIBOLD } from './fonts';

// Cold, layered palette: deep indigo/violet with periwinkle and teal accents.
// Backgrounds lean into visible color (soft gradients) rather than near-white,
// with a few tinted card surfaces mixed in alongside plain white for variety.
export const colors = {
  // Backgrounds
  bg: '#D2DAF6',
  bgAlt: '#C5CEF5',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF1FE',
  surfaceBlue: '#E3EEFC',
  surfaceViolet: '#EEE7FC',
  surfaceTeal: '#E1F1F3',

  // Brand / accents
  indigo: '#4C4FDE',
  indigoDeep: '#332C9E',
  violet: '#8B5CF6',
  violetDeep: '#6D3FC7',
  periwinkle: '#7B85F0',
  skyBlue: '#3FA0E0',
  iceBlue: '#CFE3FA',
  teal: '#3FB6C4',
  midnight: '#1B1A4B',

  // Text
  textPrimary: '#1C1F3D',
  textSecondary: '#4A4F78',
  textMuted: '#7A80A6',
  textOnDark: '#FFFFFF',

  // Semantic
  success: '#3FA98A',
  warning: '#E0A85B',
  danger: '#D9667A',
  border: '#D6D9F2',

  // Gradients (used with expo-linear-gradient), 2 or 3 stops each
  gradientCalm: ['#2E8ECC', '#7A46F0'] as const,
  gradientDeep: ['#282390', '#5C2FB5'] as const,
  gradientSoft: ['#B9CDF5', '#CBBEF3'] as const,
  gradientAurora: ['#82C0E1', '#8F6EEA', '#6547C7'] as const,
  gradientNight: ['#0E0D2C', '#282390', '#5C2FB5'] as const,
  gradientTeal: ['#2FA1AF', '#3B3ECE'] as const,
  gradientMist: ['#A9D5EE', '#C6BEF1'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const typography = {
  title: { fontSize: 28, lineHeight: 36, fontFamily: FONT_BOLD, color: colors.textPrimary },
  heading: { fontSize: 20, lineHeight: 27, fontFamily: FONT_SEMIBOLD, color: colors.textPrimary },
  body: { fontSize: 16, lineHeight: 24, fontFamily: FONT_REGULAR, color: colors.textSecondary },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontFamily: FONT_SEMIBOLD, color: colors.textPrimary },
  caption: { fontSize: 13, lineHeight: 19, fontFamily: FONT_REGULAR, color: colors.textMuted },
  button: { fontSize: 16, lineHeight: 20, fontFamily: FONT_SEMIBOLD, color: colors.textOnDark },
};

export const shadow = {
  card: {
    shadowColor: '#241F5C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
};

// Rotating tint for list cards so screens don't read as all-white.
const CARD_TINTS = [colors.surface, colors.surfaceBlue, colors.surfaceViolet] as const;
export function cardTint(index: number): string {
  return CARD_TINTS[index % CARD_TINTS.length];
}
