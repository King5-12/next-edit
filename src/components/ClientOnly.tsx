'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import { Spin } from 'antd';
import { PropsWithChildren } from 'react';

export const ClientOnly = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  if (!isMounted)
    return (
      <div className='h-full flex justify-center items-center'>
        <Spin />
      </div>
    );
  return <>{props.children}</>;
};
