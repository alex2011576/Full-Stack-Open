import React from 'react';
import { Box } from '@mui/system';
import {  Diagnosis, OccupationalHealthcareEntry } from '../types';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import WorkIcon from '@mui/icons-material/Work';
import Typography from '@mui/material/Typography';
import { formatDate } from '../utils';


const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry , findDiagnose: (code: Diagnosis['code']) => Diagnosis['name']}> = ({ entry, findDiagnose }) => {
  return (
    <Box mt={2} textAlign="left" >
      <Box sx={{ display: 'flex',  alignItems: 'center' }}>
        <Typography style={{ marginRight: '0.6rem' }} component="span">
          {formatDate(entry.date)}
        </Typography>
        <WorkIcon />
        <Typography style={{  fontStyle: 'italic', marginLeft: '0.3rem' }}>{entry.employerName}</Typography>
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
        {entry.sickLeave
          ? <Typography style={{ color: 'red', marginTop: '0.5rem', marginLeft: '0.2rem', }} variant="h6">Sick leave was issued from {formatDate(entry.sickLeave.startDate)} until {formatDate(entry.sickLeave.endDate)}</Typography>
          : ''
        }
      </Box>
    </Box>
  );
};

export default OccupationalHealthcare;