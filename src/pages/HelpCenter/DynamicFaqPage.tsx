import React, { useMemo, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@/components/Typography';
import { faqData } from '@/constants/dummyData';
import { strings } from '@/locales';

// import CustomerCareChat from './CustomerCareChat';

const DynamicFAQPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const staticText = strings.helpCenter;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data = useMemo(() => {
    return faqData.flatMap((faq) => faq || []).find((faq) => faq.id === id);
  }, [id]);

  if (!data) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <Typography variant='heading'>{staticText.errorPage}</Typography>
        <Typography variant='p'>{staticText.topicNotFound}</Typography>
      </div>
    );
  }

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='relative flex flex-col h-full gap-2 w-full'>
      <div className='flex justify-start items-center gap-5 px-2'>
        <FaChevronLeft
          size={24}
          className='text-teleGrey cursor-pointer'
          onClick={() => navigate(-1)}
        />
        <Typography variant='heading'>{data.title}</Typography>
      </div>
      <div className='space-y-4'>
        {data.questions.map((q, index) => (
          <div key={index} className='my-5 transition-all'>
            <div
              onClick={() => toggleAnswer(index)}
              className='flex justify-between items-center p-2 cursor-pointer'
            >
              <div className='flex gap-4 justify-start items-center'>
                <FaCircle size={24} className='text-teleGrey' />
                <Typography variant='p'>{q.question}</Typography>
              </div>
              <span
                className={`text-xl transition-transform ${
                  activeIndex === index ? 'rotate-90' : 'rotate-0'
                }`}
              >
                <FaChevronRight size={24} className='text-teleGrey' />
              </span>
            </div>
            {activeIndex === index && (
              <div className='px-12 py-2'>
                <Typography variant='p' className='mt-3 text-SteelGray'>
                  {q.answer}
                </Typography>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* <CustomerCareChat /> */}
    </div>
  );
};

export default DynamicFAQPage;
