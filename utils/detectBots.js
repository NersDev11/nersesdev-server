export function detectBots(data) {
  const { lastName } = data;

  if (lastName && lastName.trim().length > 0) return true;

  return false;
}
