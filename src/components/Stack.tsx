import { clsxm } from '@/lib/helpers';
import { FC, ReactNode } from 'react';

interface StackProps {
  children: ReactNode;
  className?: string;
}

export const Stack: FC<StackProps> = ({ children, className }) => (
  <div className={clsxm('flex flex-col gap-16', className)}>{children}</div>
);
