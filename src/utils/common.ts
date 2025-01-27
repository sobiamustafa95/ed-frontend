import { RegisterOptions } from 'react-hook-form';

import { AttachmentType, EnumType, IAttachment, INameable } from '@/@types';
import { ISetNewPasswordFields } from '@/@types/auth';
import { URGENCY_LEVEL } from '@/constants';
import { strings } from '@/locales';

export const EmailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
export const PhoneRegex = /^\+?[1-9]\d{1,12}$/;
export const OnlyNumericStrings = /^(?!\d+$)[\s\S]+$/;

export const formatEmailAddress = (email: string) => {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return '';
  const maskedLocalPart = `${localPart.charAt(0)}**`;
  const [domainName, topLevelDomain] = domain.split('.');
  if (!domainName || !topLevelDomain) return '';
  const maskedDomain = `@***${domainName.slice(-2)}.${topLevelDomain}`;
  return maskedLocalPart + maskedDomain;
};

export const generateHexCode = (name: string) => {
  const asciiSum = name
    ?.split('')
    ?.filter((char) => char !== ' ') // Ignore spaces
    ?.reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const adjustColor = (value: number) => {
    return ((value % 256) + 256) % 256;
  };

  const red = adjustColor(asciiSum || 0);
  const green = adjustColor((asciiSum || 0) * 2);
  const blue = adjustColor((asciiSum || 0) * 3);

  const hexCode = [red, green, blue]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');

  return `#${hexCode.toUpperCase()}`;
};

export const GetFormattedName = <T extends INameable>(data?: T): string => {
  if (!data) return '';
  const { firstName, lastName } = data;
  return `${firstName} ${lastName}`.trim();
};

export const snakeToTitleCase = (input?: string) => {
  if (!input) return;
  return input.replace(/[_-]/g, ' ');
};

export const generateInitials = (name: string) => {
  const nameArray = name.split(' ');
  const initials = nameArray.map((part) => part.charAt(0)).join('');
  return initials.toUpperCase();
};

const calculateLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0]! * 0.2126 + a[1]! * 0.7152 + a[2]! * 0.0722;
};

// Function to get the text color (black or white) based on the background color
export const getTextColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  const luminance = calculateLuminance(r, g, b);

  // Use white text for dark backgrounds, black text for light backgrounds
  return luminance < 0.5 ? '#FFFFFF' : '#000000';
};

// Custom validation function
export const validatePassword = (value: string) => {
  if (!/[a-z]/.test(value)) return strings.errors.password.lowercase;
  if (!/[A-Z]/.test(value)) return strings.errors.password.uppercase;
  if (!/\d/.test(value)) return strings.errors.password.number;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
    return strings.errors.password.specialChar;
  return true;
};

export const validateNewPasswordFields = (newPassword?: string) => {
  return {
    newPasswordRules: {
      required: strings.errors.password.required,
      validate: (value: string) => {
        if (value.length < 8) {
          return strings.errors.password.minLength;
        }
        return validatePassword(value);
      },
    } as RegisterOptions<ISetNewPasswordFields, 'password'>,

    confirmNewPasswordRules: {
      required: strings.errors.confirmPassword.required,
      validate: (value: string) => {
        if (newPassword && !value) {
          return strings.errors.confirmPassword.required;
        }
        if (newPassword !== value) {
          return strings.errors.confirmPassword.match;
        }
        return true;
      },
    } as RegisterOptions<ISetNewPasswordFields, 'reEnterPassword'>,
  };
};

export const EnumToArray = <T extends EnumType<T>>(enumObj: T): string[] => {
  return Object.values(enumObj);
};

export const PAGE_SIZE_OPTIONS = Array.from({ length: 6 }, (_, i) =>
  (i + 5).toString(),
);
export const mimeTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.csv': 'text/csv',
};

export const getMimeTypes = (extensions: string[] | string): string[] => {
  if (Array.isArray(extensions)) {
    return extensions.map((ext) => mimeTypes[ext] || '');
  }
  return [mimeTypes[extensions] || ''];
};

export const createAttachments = (files: File[]): IAttachment[] => {
  return files.map((file) => ({
    id: URL.createObjectURL(file),
    src: URL.createObjectURL(file),
    url: URL.createObjectURL(file),
    type: file.type as AttachmentType,
    name: file?.name || '',
    sizeInBye: file?.size || 0,
  }));
};

// Split the email at the '@' symbol and take the first part
export function getUsernameFromEmail(email: string): string {
  if (!email) {
    return '';
  }
  const [username] = email.split('@');
  return username || '';
}

export const matchPath = (currentPath: string, itemPath: string) => {
  const normalizePath = (path: string) => path.replace(/\/$/, '');
  const normalizedCurrentPath = normalizePath(currentPath);
  const normalizedItemPath = normalizePath(itemPath);
  return normalizedCurrentPath.startsWith(normalizedItemPath);
};

// For eleminating empty query params in get API
export const buildQueryParams = <T>(
  params: Record<string, T | undefined | null>,
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      (typeof value !== 'number' || (typeof value === 'number' && value > 0))
    ) {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
};

export const getUrgencyClass = (level: string): string => {
  switch (level) {
    case URGENCY_LEVEL.LOW:
      return 'text-star';
    case URGENCY_LEVEL.MEDIUM:
      return 'text-triton';
    case URGENCY_LEVEL.HIGH:
      return 'text-orangeCrush';
    case URGENCY_LEVEL.CRITICAL:
      return 'text-tomatoRed';
    case URGENCY_LEVEL.IMMEDIATE:
      return 'text-primary';
    default:
      return 'text-SteelGray';
  }
};
