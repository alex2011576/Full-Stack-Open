/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';

import { TextField, SelectField, EntryTypeOption, HealthRatingOption, DiagnosisSelection } from './FormField';
import { Entry, HealthCheckRating, TypeOfEntry } from '../types';
import { EntryWithoutId, EntryFormValues } from '../types';
import { useStateValue } from '../state';

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }

const entryTypes: EntryTypeOption[] = [
  { value: TypeOfEntry.HealthCheckEntry, label: 'Health Check' },
  { value: TypeOfEntry.HospitalEntry, label: 'Hospital' },
  { value: TypeOfEntry.OccupationalHealthcareEntry, label: 'Occupational Healthcare' },
];

const healthRatings: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low Risk' },
  { value: HealthCheckRating.HighRisk, label: 'High Risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const EntryTypeFields = (type: TypeOfEntry) => {
    switch (type) {
    case 'Hospital':
      return (
        <>
          <Field
            label="Discharge criteria:"
            placeholder="Discharge criteria:"
            name="discharge.criteria"
            component={TextField}
          />
          <Field
            label="Discharge date:"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <Field
            label="Employer:"
            placeholder="Employer:"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick leave starting date:"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sick leave ending date:"
            placeholder="Sick leave ending date:"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    case 'HealthCheck':
      return (
        <SelectField
          label="Health Rating"
          name="healthCheckRating"
          options={healthRatings}
        />
      );
    }
  };
  return (
    <Formik
      initialValues={{
        type: TypeOfEntry.HealthCheckEntry,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        healthCheckRating: 0,
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        discharge: {
          date: '',
          criteria: ''
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: { [field: string]: string } = {};
        const requiredError = 'Field is required';
        const invalidError = 'Provided value is not valid';

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist= requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry:"
              name="type"
              options={entryTypes}
            />
            <Field
              label="Description:"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date:"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist:"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {/* <SelectField label="Gender" name="gender" options={genderOptions} /> */}
            {EntryTypeFields(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                    Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                    Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
