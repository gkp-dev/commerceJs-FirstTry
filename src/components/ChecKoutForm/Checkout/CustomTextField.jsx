import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Grid } from '@material-ui/core'

function FormInput({ name, label }) {
  const { control } = useFormContext()

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <TextField name={name} label={label} onChange={onChange} required />
        )}
      />
    </Grid>
  )
}

export default FormInput