import React, { useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import { useForm } from 'react-hook-form';
import { IoLanguageSharp } from 'react-icons/io5';

import ReactDropdown from '@/components/ReactDropdown';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { LANGUAGE_OPTIONS } from '@/constants/profile';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

interface IPreferences {
  language: string;
  enableNotifications: boolean;
}

const Preferences = () => {
  const [preferences, setPreferences] = useState<IPreferences | null>(null);

  const staticText = strings.preferences;
  const {
    handleSubmit,
    formState: { dirtyFields },
    reset,
    setValue,
    watch,
  } = useForm<IPreferences>({
    defaultValues: preferences || {
      language: 'en',
      enableNotifications: false,
    },
    mode: 'onChange',
  });

  const handleCancel = () => {
    reset(preferences || { language: 'en', enableNotifications: false });
  };

  const onSubmit = (data: IPreferences) => {
    setPreferences(data);
  };

  const handleLanguageChange = (value: string | { value: string }) => {
    const languageValue = typeof value === 'string' ? value : value.value;
    setValue('language', languageValue);
  };

  return (
    <div className='ml-6 mt-4 max-w-xl'>
      <Typography variant='subheading'>{staticText.title}</Typography>

      <Card className='mt-4 pt-6'>
        <CardContent className='flex flex-col gap-4'>
          {/* Notification Settings */}
          <div>
            <Typography variant='md' className='font-semibold'>
              {staticText.notificationSettings}
            </Typography>
            <div className='flex items-center justify-between mt-2'>
              <Typography variant='sm'>
                {staticText.enableNotifications}
              </Typography>
              <Switch
                id='enableNotifications'
                checked={watch('enableNotifications')}
                onCheckedChange={(checked) =>
                  setValue('enableNotifications', checked)
                }
              />
            </div>
          </div>

          {/* Language Selection with Flag Icons */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <IoLanguageSharp className='w-5 h-5' />
              <Typography variant='sm' className='font-semibold'>
                {staticText.language}
              </Typography>
            </div>
            <div className='flex items-center gap-2 mt-2'>
              <ReactDropdown
                name='language'
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                value={watch('language')}
                options={LANGUAGE_OPTIONS}
                onChange={handleLanguageChange}
                className={cn('border-none w-auto')}
                controlClassName='custom-dropdown-control'
                placeholder={
                  <div className='flex items-center gap-2'>
                    <FlagIcon code='US' size={20} />
                    {
                      LANGUAGE_OPTIONS.find(
                        (option) => option.value === watch('language'),
                      )?.label
                    }
                  </div>
                }
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 pt-2'>
            <Button
              variant='outline'
              onClick={handleCancel}
              className='text-primary'
            >
              {staticText.cancel}
            </Button>
            <Button onClick={handleSubmit(onSubmit)} disabled={!dirtyFields}>
              {staticText.save}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;
