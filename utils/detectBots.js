export function detectBots(data) {
  const { hpField } = data;

  if (hpField && hpField.trim().length > 0) return true;

  return false;
}
