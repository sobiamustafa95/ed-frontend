import React, { useEffect, useRef, useState } from 'react';

import AddImage from '@/assets/svgs/AddImage';
import SendIcon from '@/assets/svgs/SendIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { strings } from '@/locales';

import AttachmentPreview from './AttachmentPreview';

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB in bytes

interface MessageInputProps {
  onSendMessage: (message: string, attachments: File[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const { chatScreen: staticText } = strings;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  // Reset message & attachments after sending
  const resetSendingState = () => {
    setMessage('');
    setAttachments([]);
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const inputFilesArray = Array.from(e.target.files);

      // Filter out files exceeding 5MB limit
      const newFiles = inputFilesArray.filter(
        (file) => file.size <= FILE_SIZE_LIMIT,
      );

      if (inputFilesArray.length !== newFiles.length) {
        // eslint-disable-next-line no-alert
        alert('Some files exceed the size limit of 5MB.');
      }

      setAttachments([...attachments, ...newFiles]);
    }
    e.target.value = '';
  };

  // Handle sending message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !attachments.length) return;
    onSendMessage(message.trim(), attachments);
    resetSendingState();
  };

  // Send message when Enter key is pressed
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  };

  // Adjust input height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form
      onSubmit={handleSend}
      className='flex w-full justify-center items-center gap-2'
    >
      <div className={cn('flex items-end')}>
        <Input
          id='fileInput'
          type='file'
          onChange={handleFileChange}
          multiple
          accept='image/*,.docx,.pdf'
          className='hidden'
        />
        <label
          htmlFor='fileInput'
          className='bg-primary flex w-8 h-8 hover:opacity-40 text-black rounded-full px-2 py-2 justify-center items-center cursor-pointer'
        >
          <AddImage className='w-6 h-6' fill='white' />
        </label>
      </div>

      <div className='flex flex-col w-full'>
        <Separator />
        <div className='flex w-full justify-between items-end min-h-14 max-h-40'>
          <div className='flex flex-col w-full'>
            <Textarea
              name='chatMessage'
              rows={1}
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={staticText.typeYourMessage}
              onKeyDown={handleKeyPress}
              className='bg-white flex w-full resize-none border border-lightGrey rounded-2xl placeholder:text-quickSilver text-sm font-medium text-primaryBlack overflow-y-scroll scrollbarHidden min-h-5 max-h-32'
            />
          </div>
          {attachments.length > 0 && (
            <div className='flex items-center overflow-x-scroll scrollbarHidden h-20 gap-3 pl-3'>
              {attachments.map((attachment, index) => (
                <AttachmentPreview
                  key={`attachment-${index}`}
                  attachment={attachment}
                  onRemoveAttachment={() =>
                    setAttachments(attachments.filter((_, i) => i !== index))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Button
        type='submit'
        disabled={!message.trim().length && !attachments.length}
        className={cn(
          'bg-primary text-white rounded-full flex items-center justify-center size-5 sm:size-9',
          {
            'mb-8 sm:mb-2': attachments.length,
          },
        )}
      >
        <SendIcon className='w-6 h-6' fill='white' />
      </Button>
    </form>
  );
};

export default MessageInput;
