import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IAttachment } from '@/@types';
import { ISignUpFields } from '@/@types/auth';
import StatusModal from '@/components/StatusModal';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MUTATION_STATUS, SKILL_SET } from '@/constants';
import { strings } from '@/locales';
import { PUBLIC_ROUTES } from '@/routes';

import DetailsFormSection from '../components/DetailsFormSection';
import AuthHeadingsAndDesc from '../components/HeadingAndDesc';

const TechnicianDetails = () => {
  const staticText = strings.technicianDetails;
  const errorMessage = strings.errors.technicianDetailsError;
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFields>({
    mode: 'all',
    defaultValues: {
      role: undefined,
      email: '',
      phoneNumber: '',
      password: '',
      skillSet: '',
      certificate: [{ name: '', attachments: [] }],
      experience: [{ name: '', attachments: [] }],
    },
  });

  const [certifications, setCertifications] = useState([
    { name: '', attachments: [] as IAttachment[] },
  ]);
  const [experiences, setExperiences] = useState([
    { name: '', attachments: [] as IAttachment[] },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCertification = () =>
    setCertifications([
      ...certifications,
      { name: '', attachments: [] as IAttachment[] },
    ]);

  const addExperience = () =>
    setExperiences([
      ...experiences,
      { name: '', attachments: [] as IAttachment[] },
    ]);

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleSignUp = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <AuthHeadingsAndDesc title={staticText.title} desc={staticText.desc} />
      <div className='grid grid-flow-row gap-6 w-full max-w-6xl border-SteelGray mx-auto p-6 bg-white rounded-lg shadow'>
        <div>
          <Typography variant='p' className='font-semibold'>
            {staticText.skillSet}
          </Typography>
          <div className='flex gap-12 mt-3'>
            {Object.values(SKILL_SET).map((skill) => (
              <div key={skill} className='flex items-center gap-2'>
                <Checkbox id={skill.toLowerCase()} />
                <label htmlFor={skill.toLowerCase()} className='text-sm'>
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10'>
          <DetailsFormSection
            title={staticText.certificate}
            fieldName={staticText.certificationName}
            itemList={certifications}
            control={control}
            errors={errors}
            onAdd={addCertification}
            onRemove={removeCertification}
            rules={errorMessage.certificateError}
            controllerName='certificate'
          />

          <DetailsFormSection
            title={staticText.experience}
            fieldName={staticText.experienceName}
            itemList={experiences}
            control={control}
            errors={errors}
            onAdd={addExperience}
            onRemove={removeExperience}
            rules={errorMessage.experienceError}
            controllerName='experience'
          />
        </div>
        <div className='flex justify-end'>
          <Button
            className='w-full text-base md:w-auto px-12 h-10 bg-primary text-white'
            onClick={handleSubmit(handleSignUp)}
          >
            {staticText.submitBtn}
          </Button>
        </div>
      </div>
      <StatusModal
        isOpen={isModalOpen}
        heading={staticText.pendingApproval}
        description={staticText.pendingApprovalDesc}
        secondaryButtonText={staticText.buttonText}
        onSecondaryAction={() => navigate(PUBLIC_ROUTES.LOGIN)}
        status={MUTATION_STATUS.FAILED}
        customClass='max-w-md'
      />
    </>
  );
};

export default TechnicianDetails;
