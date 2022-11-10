import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Button, Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import { addFetchedPatient, useStateValue } from '../state';
import { Gender, FetchedPatient, Entry, Diagnosis, EntryFormValues } from '../types';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
// import WorkIcon from '@mui/icons-material/Work';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import OccupationalHealthcare from '../components/OccupationalHealthcare';
import HealthCheck from '../components/HealthCheck';
import Hospital from '../components/HospitalEntry';
import AddEntryModal from '../AddEntryModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const PatientInfoPage = () => {

  const { id } = useParams<{ id: string }>();
  const [{ fetchedPatients, diagnoses } , dispatch] = useStateValue();
  // console.log(JSON.stringify(diagnoses, null, 4));
  // const [error, setError] = React.useState<string>('');
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!id) {
    return null;
  }

  let patient: FetchedPatient | undefined = Object.values(fetchedPatients).find((patient) => patient.id === id);

  React.useEffect(() => {
    console.log('useeffect');
    const fetchPatient = async () => {
      if (patient) {
        return ;
      }
      try {
        // console.log('try');
        const { data: patientInfo } = await axios.get<FetchedPatient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // dispatch({ type: "ADD_FETCHED_PATIENT", payload: patientInfo });
        dispatch(addFetchedPatient(patientInfo));
      }
      catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
          //setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error('Unknown error', e);
          //setError("Unknown error");
        }
      }
    };
    void fetchPatient();
  }, [dispatch, id, patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if (newEntry) {
        patient = undefined;
      }
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      // dispatch(add(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (!patient) {
    return null;
  }

  const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
    switch (gender) {
    case 'male':
      return <MaleIcon fontSize={'large'} />;
    case 'female':
      return <FemaleIcon fontSize={'large'} />;
    case 'other':
      return <TransgenderIcon fontSize={'large'} />;
    default:
      return <TransgenderIcon fontSize={'large'} />;
    }
  };

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const findDiagnose = (code: Diagnosis['code']): Diagnosis['name'] => {
    if (code in diagnoses) {
      if (Object.values(diagnoses[code]).includes(code)) {
        return diagnoses[code].name;
      }
    }
    return '';
  };

  const Entry: React.FC<{ entry: Entry, findDiagnose: (code: Diagnosis['code']) => Diagnosis['name']}> = ({ entry, findDiagnose }) => {
    switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry}  findDiagnose={findDiagnose}/>;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} findDiagnose={findDiagnose} />;
    case 'Hospital':
      return <Hospital entry={entry} findDiagnose={findDiagnose} />;
    default:
      return assertNever(entry);
    }
  };

  return (
    <div>
      <Box mt={3} >
        <Typography variant="h4" gutterBottom>
          {patient.name}
          <GenderIcon gender={patient.gender}></GenderIcon>
        </Typography>
        <Typography variant="body1" gutterBottom>
                    ssn: {patient.ssn}
          <br />
                    occupation: {patient.occupation}
        </Typography>
        <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '1em' }}>entries</Typography>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {patient.entries.map(entry => {
              return (
                <Item key={entry.id}>
                  <Entry key={entry.id} entry={entry} findDiagnose={findDiagnose}/>
                </Item>
              );
            })
            }
          </Stack>
        </Box>
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      {/* <button onClick={ () => setError(error.concat('3'))} > concat error </button> */}
    </div>
  );
};
export default PatientInfoPage;