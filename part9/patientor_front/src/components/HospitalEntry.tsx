import { Diagnosis, HospitalEntry } from '../types';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const Hospital: React.FC<{ entry: HospitalEntry, findDiagnose: (code: Diagnosis['code']) => Diagnosis['name']}> = ({ entry, findDiagnose }) => {
  return (
    <Box mt={2} textAlign="left" >
      <Box sx={{ display: 'flex',  alignItems: 'center' }}>
        <Typography style={{ marginRight: '0.6rem' }} component="span">
          {entry.date}
        </Typography>
        <LocalHospitalIcon />
      </Box>
      <Box sx={{}}>
        <Typography style={{  fontStyle: 'italic' }}>{entry.description}</Typography>
        <Typography> diagnosed by {entry.specialist}</Typography>
        { entry.diagnosisCodes && Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.length
          ?
          <List
            sx = {{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
            }}>
            <ListSubheader component="div" color="inherit" disableGutters><Typography variant="h6">Diagnosis:</Typography></ListSubheader>
            {entry.diagnosisCodes?.map(code => <ListItem  key={code} disablePadding sx={{ ml: 4 }}><ListItemText sx={{ ml: 0 }} primary={`${code} ${findDiagnose(code)}`} /></ListItem>)}
          </List>
          : ''
        }
        <Typography style={{ color: 'red', marginTop: '0.5rem', marginLeft: '0.2rem', }} variant="h6">To be dicharged: {entry.discharge.date} (criteria: {entry.discharge.criteria})</Typography>
      </Box>
    </Box>
  );
};

export default Hospital;