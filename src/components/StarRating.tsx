import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

import { STAR_TYPE } from '@/constants';

interface StarRatingProps {
  initialRating?: number;
  staticRating?: number;
  isInteractive?: boolean;
  onRatingChange?: (newRating: number) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  staticRating,
  isInteractive = false,
  onRatingChange,
  totalStars = 5,
}) => {
  const [currentRating, setCurrentRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const getStarType = (
    index: number,
  ): STAR_TYPE.FULL | STAR_TYPE.HALF | STAR_TYPE.EMPTY => {
    const rating = isInteractive
      ? hoverRating || currentRating
      : staticRating || 0;

    if (index + 1 <= rating) return STAR_TYPE.FULL;
    if (index + 0.5 <= rating) return STAR_TYPE.HALF;
    return STAR_TYPE.EMPTY;
  };

  const handleClick = (ratingValue: number) => {
    if (!isInteractive) return;
    setCurrentRating(ratingValue);
    if (onRatingChange) onRatingChange(ratingValue);
  };

  return (
    <div className='flex items-center'>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const starType = getStarType(index);

        return (
          <label key={ratingValue} className='cursor-pointer'>
            {isInteractive && (
              <input
                type='radio'
                name='rating'
                value={ratingValue}
                className='hidden'
                onClick={() => handleClick(ratingValue)}
              />
            )}
            {starType === STAR_TYPE.FULL && (
              <FaStar
                className='text-star'
                size={15}
                onMouseEnter={() =>
                  isInteractive && setHoverRating(ratingValue)
                }
                onMouseLeave={() => isInteractive && setHoverRating(null)}
              />
            )}
            {starType === STAR_TYPE.HALF && (
              <FaStarHalfAlt
                className='text-star'
                size={15}
                onMouseEnter={() =>
                  isInteractive && setHoverRating(ratingValue)
                }
                onMouseLeave={() => isInteractive && setHoverRating(null)}
              />
            )}
            {starType === STAR_TYPE.EMPTY && (
              <FaStar
                className='text-lightGrey'
                size={15}
                onMouseEnter={() =>
                  isInteractive && setHoverRating(ratingValue)
                }
                onMouseLeave={() => isInteractive && setHoverRating(null)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
