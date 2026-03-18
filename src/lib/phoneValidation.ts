/**
 * Validates that a phone number contains exactly 10 digits.
 * Strips non-digit characters before checking.
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10;
}

export function getPhoneError(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required';
  if (!isValidPhone(phone)) return 'Phone number must be exactly 10 digits';
  return null;
}
