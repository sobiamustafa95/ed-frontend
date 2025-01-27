import React, { Dispatch, SetStateAction, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface Props {
  placeholder?: string;
  searchIcon?: React.ReactNode;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  button?: React.ReactNode;
  separator?: boolean;
  containerClassName?: string;
  inputFieldClassName?: string;
}

const SearchBar: React.FC<Props> = ({
  placeholder = 'Search...',
  searchIcon = <FiSearch className='mr-1 text-quickSilver flex-shrink-0' />,
  searchText,
  setSearchText,
  button,
  separator = false,
  containerClassName,
  inputFieldClassName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'bg-white border-greyWhite border flex justify-center items-center md:px-2 md:py-0 py-0 overflow-hidden rounded-lg',
        containerClassName,
      )}
    >
      {searchIcon}
      <div className='w-full relative ml-1 h-12 flex justify-start items-center'>
        <Input
          ref={inputRef}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={cn(
            'bg-white border-none text-sm font-semibold p-0',
            inputFieldClassName,
          )}
          placeholder={placeholder}
        />
      </div>
      {searchText ? (
        <Button
          onClick={handleClear}
          size='icon'
          variant='link'
          aria-label='Clear search'
        >
          <FiX className='text-quickSilver size-4' />
        </Button>
      ) : null}
      {separator && <Separator orientation='vertical' className='h-8 m-2' />}
      {button}
    </div>
  );
};

export default SearchBar;
