const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateMessage(message) {
  const { name, sendersEmail, subject, text } = message;

  if (
    !name ||
    !name.trim() ||
    name.trim().length < 2 ||
    name.trim().length > 60
  )
    return false;

  if (
    !sendersEmail ||
    !sendersEmail.trim() ||
    !EMAIL_REGEX.test(sendersEmail.trim())
  )
    return false;

  if (
    !subject ||
    !subject.trim() ||
    subject.trim().length < 3 ||
    subject.trim().length > 100
  )
    return false;

  if (
    !text ||
    !text.trim() ||
    text.trim().length < 10 ||
    text.trim().length > 2000
  )
    return false;

  return true;
}
