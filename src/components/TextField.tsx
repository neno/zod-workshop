import {FC} from "react";
import {Controller, ControllerProps, ControllerRenderProps} from "react-hook-form";

interface FieldProps {
  label: string;
  multiline?: boolean;
  field: ControllerRenderProps;
  type?: "text" | "email" | "number" | "date";
}

interface TextFieldProps extends FieldProps, Omit<ControllerProps, "render"> {
}

const Field: FC<FieldProps> = ({ label, field, multiline, type = "text" }) => {
  return (
    <div className="form-control w-fulls">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {multiline ?
        <textarea rows={4} {...field} className="textarea textarea-bordered" />
        :
        <input type={type} {...field} className="input input-bordered" />
      }
    </div>
  )
}

export const TextField: FC<TextFieldProps> = ({ label, name, control, multiline, type}) => {
  return (<Controller
    name={name}
    control={control}
    render={({ field }) => <Field type={type} label={label} multiline={multiline} field={field} />}
  />)
}