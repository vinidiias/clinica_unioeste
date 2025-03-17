import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const dias = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ control, name }) {
  const theme = useTheme();

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Dias</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            input={<OutlinedInput label="Diasadasdsadasd" />}
            MenuProps={MenuProps}
          >
            {dias.map((dia) => (
              <MenuItem
                key={dia}
                value={dia}
                style={getStyles(dia, field.value, theme)}
              >
                {dia}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
