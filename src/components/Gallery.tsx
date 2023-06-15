import { FC, ReactNode } from 'react';

export const Gallery: FC<{ children: ReactNode }> = ({ children }) => (
  <div className='grid grid-cols-6 gap-8'>{children}</div>
);
