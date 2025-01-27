import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { Typography } from './Typography';

interface BreadcrumbData {
  label: string;
  route: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
}

interface DynamicBreadcrumbsProps {
  separator?: React.ReactNode;
  data: BreadcrumbData[];
}

const Breadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({
  separator = <FaChevronRight size={18} />,
  data,
}) => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const breadcrumb = data.find((item) => item.route === path);

    return {
      label: breadcrumb?.label || segment.replace(/-/g, ' '),
      route: breadcrumb?.route || path,
      icon: breadcrumb?.icon,
      isCurrentPage: index === pathSegments.length - 1,
    };
  });

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastItem = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={`${index}_${breadcrumb.label}`}>
              <BreadcrumbItem>
                {breadcrumb.isCurrentPage || isLastItem ? (
                  <BreadcrumbPage aria-current='page'>
                    <Typography
                      variant='sm'
                      className='flex font-normal text-black capitalize'
                    >
                      {breadcrumb.icon && (
                        <span className='mr-1'>{breadcrumb.icon}</span>
                      )}
                      {breadcrumb.label}
                    </Typography>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.route}>
                    <Typography
                      variant='sm'
                      className='flex text-SteelGray capitalize font-normal'
                    >
                      {breadcrumb.icon && (
                        <span className='mr-1'>{breadcrumb.icon}</span>
                      )}
                      {breadcrumb.label}
                    </Typography>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && (
                <BreadcrumbSeparator className='text-SteelGray'>
                  {separator}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
