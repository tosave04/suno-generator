/**
 * Libellés Suno pour les curseurs "Weirdness" et "Style Influence"
 * (alignés sur l'UI officielle de Suno Custom Mode 2026).
 */

export function getWeirdnessLabel(value: number): string {
  if (value <= 32) return "Safe zone";
  if (value <= 65) return "Expected results";
  if (value <= 79) return "Experimental results";
  return "Chaos mode";
}

export function getStyleInfluenceLabel(value: number): string {
  if (value <= 32) return "Loose";
  if (value <= 79) return "Moderate";
  return "Strong";
}
