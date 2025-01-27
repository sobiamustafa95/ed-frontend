import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { IoAddCircleSharp } from 'react-icons/io5';

import { IAttachment } from '@/@types';
import { ISignUpFields } from '@/@types/auth';
import Attachments from '@/components/Attachment';
import FormField from '@/components/FormField';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

interface IAttachmentProp {
  name: string;
  attachments: IAttachment[];
}

interface IDetailsFormSectionProps {
  title: string;
  fieldName: string;
  itemList: IAttachmentProp[];
  control: Control<ISignUpFields>;
  errors: FieldErrors;
  onAdd: () => void;
  onRemove: (index: number) => void;
  rules: string;
  controllerName: 'certificate' | 'experience';
}

const DetailsFormSection: FC<IDetailsFormSectionProps> = ({
  title,
  fieldName,
  itemList,
  control,
  errors,
  onAdd,
  onRemove,
  rules,
  controllerName,
}) => {
  return (
    <div>
      <Typography variant='p' className='font-semibold'>
        {title}
      </Typography>
      {itemList.map((item, index) => (
        <div
          key={`${index}_${item.name}`}
          className={cn(
            'relative mt-4 flex items-start',
            index > 0 && 'border-t border-SteelGray',
          )}
        >
          <div className='flex-grow'>
            <Controller
              control={control}
              name={`${controllerName}.${index}.name`}
              rules={{ required: rules }}
              render={({ field: { onChange, value } }) => (
                <FormField
                  title={fieldName}
                  name={`${controllerName}.${index}.name`}
                  value={value}
                  labelClassName='mb-2 font-semibold'
                  placeholder={strings.technicianDetails.placeholder}
                  onChange={onChange}
                  maxLength={12}
                  errors={errors}
                />
              )}
            />
            <Controller
              control={control}
              name={`${controllerName}.${index}.attachments`}
              render={({ field: { onChange } }) => (
                <Attachments
                  maxAttachments={5}
                  labelClassName='mb-2 font-semibold'
                  onAttachmentsChange={(newAttachments) =>
                    onChange(newAttachments)
                  }
                />
              )}
            />
            {index > 0 && (
              <div className='mt-3'>
                <button
                  type='button'
                  className='absolute ml-4 text-SteelGray mt-4 top-0 right-0'
                  onClick={() => onRemove(index)}
                  aria-label='Remove Field'
                >
                  <FiX size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
      <Button variant='link' className='mt-2 px-0 text-primary' onClick={onAdd}>
        <IoAddCircleSharp />
        {title === 'Certificate'
          ? strings.technicianDetails.addMoreCertificate
          : strings.technicianDetails.addMoreExperience}
      </Button>
    </div>
  );
};

export default DetailsFormSection;
