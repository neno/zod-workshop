import { clsxm } from '@/lib/helpers';
import { FC, ReactNode } from 'react';

interface VerticalContainerProps {
  children: ReactNode;
  className?: string;
}

export const VerticalContainer: FC<VerticalContainerProps> = ({
  children,
  className,
}) => (
  <div className={clsxm('flex flex-col gap-16', className)}>{children}</div>
);
