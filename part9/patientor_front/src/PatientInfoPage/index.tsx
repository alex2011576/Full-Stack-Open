/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Box, Button, Typography } from "@material-ui/core";
import { addFetchedPatient, useStateValue } from "../state";
import { Gender, Patient, FetchedPatient, Entry} from "../types";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../components/HealthRatingBar";

import { Link } from "react-router-dom";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from '@mui/icons-material/Transgender';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const PatientInfoPage = () => {

    const { id } = useParams<{ id: string }>();
    const [{ fetchedPatients } , dispatch] = useStateValue();
    
    const [error, setError] = React.useState<string>('');

    if (!id) {
        return null;
    }
    
    const patient: FetchedPatient | undefined = Object.values(fetchedPatients).find((patient) => patient.id === id);

    React.useEffect(() => {
        // console.log('useeffect');
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
              console.error(e?.response?.data || "Unrecognized axios error");
              setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
          }
        };
        void fetchPatient();
    }, [dispatch, id, patient]);

    if (!patient) {
        return null;
    }

    const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
		switch (gender) {
			case "male":
				return <MaleIcon fontSize={"large"} />;
			case "female":
				return <FemaleIcon fontSize={"large"} />;
			case "other":
				return <TransgenderIcon fontSize={"large"} />;
			default:
				return <TransgenderIcon fontSize={"large"} />;
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
  //           const Entry: React.FC<{ entry: Entry }> = ({ entry }) => {
  //             switch (entry) {
	// 		case "HealthCheck":
	// 			return <HealthCheckEntry entry={entry} />;
	// 		case "OccupationalHealthcare":
	// 			return <FemalOccupationalHealthcareEntryeIcon entry={entry} />;
	// 		case "Hospital":
	// 			return <HospitalEntry  entry={entry} />;
	// 		default:
	// 			return assertNever(entry);
	// 	}∏
	// };


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
                <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: "1em" }}>entries</Typography>
                    {patient.entries.map(entry => {
                      return (
                        <Box key={entry.id} mt={2}>
                          <Typography component="span">
                          {entry.date}
                          </Typography>
                          {" "}
                          <Typography component="span" style={{  fontStyle: 'italic'}}>
                            {entry.description}
                          </Typography>
                        <List 
                        sx = {{
                          listStyleType: 'disc',
                          pl: 4,
                          '& .MuiListItem-root': {
                          display: 'list-item',
                          },
                        }}>
                          {entry.diagnosisCodes?.map(code => <ListItem dense={true} key={code} disablePadding><ListItemText sx={{ml: 0}} primary={code} /></ListItem>)}
                        </List>
                        </Box>
                      );
                      })
                    }
            </Box>
            {/* <button onClick={ () => setError(error.concat('3'))} > concat error </button> */}
        </div>
    );
};
export default PatientInfoPage;