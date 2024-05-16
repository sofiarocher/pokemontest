// src/components/SkeletonCard.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard: React.FC = () => {
  return (
    <div className='bg-white shadow-xl m-4 py-2 px-4 w-40 h-20 sm:w-52 sm:h-32 rounded-lg flex flex-col justify-center items-start gap-1 relative'>
      <Skeleton circle className='absolute top-2 right-3 sm:w-12 sm:h-12 w-4 h-4' />
      <Skeleton className='mb-1 h-4 sm:h-6 w-16 sm:w-28'  />
      <Skeleton className='mb-1 h-4 sm:h-6 w-8 sm:w-16' />
      <Skeleton className='sm:mb-6 mb-9 h-4 sm:h-8 w-20 sm:w-32' />
    </div>
  );
};

export default SkeletonCard;
