import toast from 'react-hot-toast';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (
  seconds: number,
  staticText: { [key: string]: string },
): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs} ${staticText[mins ? 'minute' : 'seconds']}`;
};

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
};

export function sanitizeValue(value: unknown): string | number | undefined {
  return typeof value === 'string' || typeof value === 'number' ? value : '';
}
