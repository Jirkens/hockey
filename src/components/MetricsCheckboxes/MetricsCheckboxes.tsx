import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Checkbox, FormControlLabel, styled } from '@mui/material';

import { IMetricsRecord } from '../../types';

const CheckboxesContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

interface IMetricsCheckboxesProps {
  metricsCheckboxes: IMetricsRecord;
  setMetricsCheckboxes: Dispatch<SetStateAction<IMetricsRecord>>;
}

export const MetricsCheckboxes: FC<IMetricsCheckboxesProps> = ({
  metricsCheckboxes,
  setMetricsCheckboxes,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    setMetricsCheckboxes(prevState => ({
      ...prevState,
      [target.name]: {
        name: target.name,
        isChecked: target.checked,
      },
    }));
  };

  return (
    <CheckboxesContainer>
      <FormControlLabel
        control={
          <Checkbox
            name={metricsCheckboxes.xg60.name}
            checked={metricsCheckboxes.xg60.isChecked}
            onChange={handleInputChange}
          />
        }
        label={metricsCheckboxes.xg60.name}
      />
      <FormControlLabel
        control={
          <Checkbox
            name={metricsCheckboxes.c60.name}
            checked={metricsCheckboxes.c60.isChecked}
            onChange={handleInputChange}
          />
        }
        label={metricsCheckboxes.c60.name}
      />
      <FormControlLabel
        control={
          <Checkbox
            name={metricsCheckboxes.sogc_pct.name}
            checked={metricsCheckboxes.sogc_pct.isChecked}
            onChange={handleInputChange}
          />
        }
        label={metricsCheckboxes.sogc_pct.name}
      />
    </CheckboxesContainer>
  );
};
