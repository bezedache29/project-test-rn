import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import type { TextInputProps } from 'react-native'

import Input from '@/components/ui/Input'

type Props<T extends FieldValues> = Omit<TextInputProps, 'value' | 'onChangeText'> & {
  control: Control<T>
  name: Path<T>
  label?: string
}

/** Links a React Hook Form field to the app's Input (value, blur, error message). */
export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <Input
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...props}
        />
      )}
    />
  )
}
