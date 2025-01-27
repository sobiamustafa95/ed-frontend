/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { INameable } from '@/@types';
import { IEditUser } from '@/@types/auth';
import FileDropContainer from '@/components/FileDropContainer';
import FormField from '@/components/FormField';
import StateIndicator from '@/components/StateIndicator';
import { Button } from '@/components/ui/button';
import { ProfileFormFields } from '@/constants/profile';
import { useGenericMutation } from '@/hooks/useMutationData';
import { useGenericQuery } from '@/hooks/useQueryData';
import { strings } from '@/locales';
import { useAuth } from '@/provider/AuthProvider';
import { fetchProfile, updateProfile } from '@/services/profile';
import { GetFormattedName, getUsernameFromEmail } from '@/utils/common';

const ProfileCard: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<IEditUser | null>(null);
  const [isAvatarDirty, setIsAvatarDirty] = useState(false); // Track avatar changes

  const { user, setUser } = useAuth();
  const staticText = strings.editPersonalInfo;
  const errorMessage = strings.errors.commonError;

  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    watch,
    control,
  } = useForm<IEditUser>({
    defaultValues: currentProfile || undefined,
    mode: 'onChange',
  });

  const uploadedFile = watch('avatar');

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
    if (!isEditing && currentProfile) {
      reset(currentProfile);
    }
  };

  const { data, error, refetch } = useGenericQuery(
    ['userProfile', user?.id],
    () => fetchProfile(user?.id || ''),
    {
      enabled: !!user?.id,
    },
  );

  const updateProfileMutation = useGenericMutation<
    { payload: IEditUser; setPercent?: (percent: number) => void },
    IEditUser | boolean
  >(updateProfile, {
    onSuccess: (response) => {
      console.log('Profile update success:', response);
      if (typeof response === 'object') {
        refetch();
        setCurrentProfile(response);
        toast.success(staticText.success);
        setUser(response);
        setIsEditing(false);
      }
    },
    onError: () => {
      toast.error(errorMessage.required);
    },
  });
  const onSubmit = (data: IEditUser) => {
    updateProfileMutation.mutate({
      payload: { ...data, avatar: uploadedFile },
    });
  };

  useEffect(() => {
    if (data && typeof data === 'object') {
      setCurrentProfile(data as IEditUser);
    }
  }, [data]);

  useEffect(() => {
    if (currentProfile) {
      reset(currentProfile);
    }
  }, [currentProfile, reset]);

  useEffect(() => {
    if (uploadedFile && isEditing) {
      setIsAvatarDirty(true); // Mark avatar as dirty when updated
    }
  }, [uploadedFile, isEditing]);

  if (error) return <StateIndicator state='Error' />;

  const handleCancel = () => {
    setIsEditing(false);
    setIsAvatarDirty(false);
    reset(currentProfile || undefined);
  };

  const renderStaticField = (label: string, value: string | undefined) => (
    <div>
      <p className='text-sm font-semibold text-gray-600'>{label}</p>
      <p className='text-sm text-gray-800'>{value || '-'}</p>
    </div>
  );

  const isSaveDisabled =
    Object.keys(dirtyFields).length === 0 && !isAvatarDirty;

  return (
    <div className='max-w-xl rounded-lg border border-gray-200 bg-white p-6 pt-0 shadow-md'>
      <div className='flex flex-col gap-2'>
        {/* Profile Avatar Section */}
        <div className='flex items-center'>
          <Controller
            name='avatar'
            control={control}
            render={({ field: { onChange } }) => (
              <FileDropContainer
                setFile={(file) => {
                  onChange(file);
                  setIsAvatarDirty(true); // Mark avatar as dirty on change
                }}
                fileName={(uploadedFile as File)?.name || staticText.file}
                dropzoneClassName='w-80 h-28 p-2'
                acceptedFileFormat={['.png', '.jpeg']}
              />
            )}
          />
        </div>
        {/* Static Details */}
        <div className='grid grid-cols-4 gap-2'>
          {renderStaticField(
            staticText.userName,
            currentProfile?.name
              ? GetFormattedName(currentProfile as INameable)
              : getUsernameFromEmail(user?.email || ''),
          )}
          {renderStaticField(
            staticText.phoneLabel,
            currentProfile?.phoneNumber
              ? currentProfile.phoneNumber
              : user?.phoneNumber,
          )}
        </div>
      </div>
      {/* Form Section */}
      <div className=''>
        {ProfileFormFields.map(({ field, label, placeholder, rules }) => (
          <div className='w-full md:w-auto' key={field}>
            <Controller
              name={field as keyof IEditUser}
              control={control}
              rules={rules as RegisterOptions<IEditUser, keyof IEditUser>}
              render={({ field: { onChange, value } }) => (
                <FormField
                  title={label}
                  placeholder={placeholder}
                  name={field}
                  value={value?.toString() || ''}
                  onChange={onChange}
                  errors={errors}
                  labelClassName='font-semibold'
                />
              )}
            />
          </div>
        ))}
        {/* Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 pt-2'>
          <Button
            variant='outline'
            className='text-primary'
            onClick={handleCancel}
          >
            {staticText.cancel}
          </Button>
          <Button
            onClick={isEditing ? handleSubmit(onSubmit) : handleEditToggle}
            disabled={isSaveDisabled}
            aria-disabled={isSaveDisabled}
          >
            {staticText.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
