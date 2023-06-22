import { FC } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

interface FieldProps {
  label: string;
  multiline?: boolean;
  required?: boolean;
  name: string;
  type?: 'text' | 'email' | 'number' | 'date';
}

export const TextField: FC<FieldProps> = ({
  label,
  name,
  multiline,
  type = 'text',
  required,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError;

  return (
    <div className='form-control w-full'>
      <label htmlFor={name} className='label'>
        <span className='label-text'>{label}</span>
      </label>
      {multiline ? (
        <textarea
          id={name}
          rows={4}
          className='textarea textarea-bordered'
          {...register(name, {
            required,
          })}
        />
      ) : (
        <input
          required={required}
          id={name}
          type={type}
          className='input input-bordered'
          {...register(name, {
            required,
          })}
        />
      )}
      {error && <p className='text-sm text-error my-2'>{error.message}</p>}
    </div>
  );
};
