import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/Typography';
import { FAQTopicIds } from '@/constants';
import { strings } from '@/locales';
import { ROUTES } from '@/routes';

// import CustomerCareChat from './CustomerCareChat';

const HelpCenter = () => {
  const staticText = strings.helpCenter;
  const navigate = useNavigate();

  const faqTopics = [
    {
      text: staticText.faqTopics.accountManagement,
      id: FAQTopicIds.ACCOUNT_MANAGEMENT,
    },
    {
      text: staticText.faqTopics.requestingARepairService,
      id: FAQTopicIds.REQUESTING_A_REPAIR_SERVICE,
    },
    {
      text: staticText.faqTopics.realTimeTracking,
      id: FAQTopicIds.REAL_TIME_TRACKING,
    },
    { text: staticText.faqTopics.notifications, id: FAQTopicIds.NOTIFICATIONS },
    {
      text: staticText.faqTopics.invoicingAndPayment,
      id: FAQTopicIds.INVOICING_AND_PAYMENT,
    },
    {
      text: staticText.faqTopics.reviewAndRating,
      id: FAQTopicIds.REVIEW_AND_RATING,
    },
    {
      text: staticText.faqTopics.technicalSupport,
      id: FAQTopicIds.TECHNICAL_SUPPORT,
    },
  ];

  const handleClick = (id: string) => {
    navigate(`${ROUTES.FAQ_TOPICS.replace(':id', id)}`);
  };

  return (
    <div className='relative h-full flex flex-col gap-2'>
      <div className='flex justify-between'>
        <Typography variant='heading'>{staticText.faqs}</Typography>
      </div>
      <div>
        {faqTopics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleClick(topic.id)}
            className='flex justify-between items-center mx-5 px-2 py-5 cursor-pointer hover:bg-gray-100 transition rounded-md'
          >
            <Typography variant='p' className='font-semibold'>
              {topic.text}
            </Typography>
            <BsArrowRight size={25} className='text-primary' />
          </div>
        ))}
      </div>
      {/* <CustomerCareChat /> */}
    </div>
  );
};

export default HelpCenter;
