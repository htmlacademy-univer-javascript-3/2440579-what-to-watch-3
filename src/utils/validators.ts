import { toast } from 'react-toastify';

export function validateEmail(email: string): boolean {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!re.test(String(email).toLowerCase())) {
    toast.error('Неверный формат электронной почты');
    return false;
  }
  return true;
}

export function validatePassword(password: string): boolean {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/;
  if (!re.test(password)) {
    toast.error('Пароль должен содержать минимум одну букву и одну цифру');
    return false;
  }
  return true;
}

export function validateTextLength(text: string, minLength: number, maxLength: number): boolean {
  if (text.length < minLength || text.length > maxLength) {
    toast.error(`Текст должен содержать от ${minLength} до ${maxLength} символов`);
    return false;
  }
  return true;
}

export function validateRating(rating: number) : boolean {
  if (rating < 1) {
    toast.error('Оценка фильма не поставлена');
    return false;
  }
  return true;
}
