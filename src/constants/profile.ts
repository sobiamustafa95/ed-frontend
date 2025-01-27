import { strings } from '@/locales';
import { PhoneRegex } from '@/utils/common';

const staticText = strings.editPersonalInfo;
const errorMessage = strings.errors;

export const ProfileFormFields = [
  {
    field: 'fullName',
    label: staticText.userName,
    placeholder: staticText.usernamePlaceholder,
    rules: { required: errorMessage.lastName.required },
  },
  // {
  //   field: 'email',
  //   label: staticText.emailLabel,
  //   placeholder: staticText.emailPlaceholder,
  //   disabled: true,
  // },
  {
    field: 'phoneNumber',
    label: staticText.phoneLabel,
    placeholder: staticText.phonePlaceholder,
    rules: {
      pattern: {
        value: PhoneRegex,
        message: errorMessage.invalidPhoneNumber.required,
      },
    },
  },
];

export const LANGUAGE_OPTIONS = [{ value: 'en', label: 'English', code: 'US' }];
