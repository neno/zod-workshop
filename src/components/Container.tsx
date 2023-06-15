import { FC, ReactNode } from 'react';

export const Container: FC<{ children: ReactNode }> = ({ children }) => (
  <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
);
