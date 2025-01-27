import React from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

import AddAttachment from '@/assets/svgs/AddAttachment';
import AddImage from '@/assets/svgs/AddImage';
import SendIcon from '@/assets/svgs/SendIcon';
import ProfileAvatar from '@/components/ProfileAvatar';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatAvatarLink } from '@/constants/dummyData';
import { strings } from '@/locales';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatMessage = ({
  isUser,
  message,
}: {
  isUser?: boolean;
  message: string;
}) => (
  <div
    className={`flex items-start ${
      isUser ? 'flex-row-reverse' : ''
    } space-x-2 space-x-reverse`}
  >
    <div
      className={`rounded-lg p-3 shadow w-4/5 ${
        isUser
          ? 'bg-primary text-white rounded-br-none'
          : 'bg-lightGrey text-black rounded-bl-none'
      }`}
    >
      <Typography variant='sm'>{message}</Typography>
    </div>
  </div>
);

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const staticText = strings.helpCenter.chat;
  if (!isOpen) return null;

  return (
    <div className='fixed bottom-5 right-3 w-full max-w-sm h-[500px] rounded-lg border border-gray-300 bg-white shadow-lg flex flex-col'>
      <div className='flex justify-between items-center border-b border-lightGrey px-4 py-2'>
        <div className='flex items-center justify-start gap-2'>
          <ProfileAvatar name={staticText.name} src={chatAvatarLink} />
          <div className='flex flex-col'>
            <Typography variant='p' className='font-semibold'>
              {staticText.name}
            </Typography>
            <Typography variant='sm' className='text-SteelGray'>
              {staticText.customerCare}
            </Typography>
          </div>
        </div>
        <div>
          <Button className='text-black bg-transparent hover:bg-transparent px-2'>
            <AiOutlineMinus size={25} />
          </Button>
          <Button
            onClick={onClose}
            className='text-black bg-transparent hover:bg-transparent px-2'
            aria-label='Close Chat'
          >
            <FiX size={25} />
          </Button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4 scrollbarHidden'>
        <ChatMessage message={staticText.text1} />
        <ChatMessage isUser message={staticText.text2} />
        <ChatMessage message={staticText.text3} />
        <ChatMessage isUser message={staticText.text4} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='flex gap-2 items-center p-3'
      >
        <div className='flex flex-grow h-10 justify-between items-center rounded-xl border border-lightGrey p-2 focus:ring-1 focus:ring-SteelGray focus:outline-none'>
          <Input
            type='text'
            className='border-none h-8 py-0 px-0'
            placeholder={staticText.inputPlaceholder}
          />
          <div className='flex items-center'>
            <Button
              type='button'
              aria-label='Attach File'
              className='bg-transparent hover:bg-transparent text-black rounded-lg px-2 py-0'
            >
              <AddImage className='w-8' />
            </Button>
            <Button
              type='button'
              aria-label='Upload Image'
              className='bg-transparent hover:bg-transparent text-black rounded-lg px-2 py-0'
            >
              <AddAttachment className='w-8' />
            </Button>
          </div>
        </div>
        <Button
          type='submit'
          className='bg-lightGrey text-black rounded-lg hover:bg-lightGrey p-2 w-10'
          aria-label='Send Message'
        >
          <SendIcon className='w-8' />
        </Button>
      </form>
    </div>
  );
};

export default ChatModal;
