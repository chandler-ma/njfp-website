import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ActionAreaCard from './card';
import file from '../../cat.csv';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function CardList() {
  const [dataEntries, setDataEntries] = useState([]);
  const [dataEntriesFiltered, setDataEntriesFiltered] = useState("");

  useEffect(() => {
    Papa.parse(file, {
      header: true,
      download: true,
      complete: (results) => {
        setDataEntries(results.data);
      },
    });
  }, []);

  return (
    <div>
      <Box sx={{width: 500, maxWidth: '100%',}}>
        <TextField fullWidth label="Search" id="fullWidth" onChange={(event) => {setDataEntriesFiltered(event.target.value);}} />
      </Box>

      {dataEntries.filter(dataEntry => dataEntry.title.includes(dataEntriesFiltered)).map((dataEntry) => (
        <ActionAreaCard
          key={dataEntry.title}
          title={dataEntry.title}
          description={dataEntry.description}
          image={dataEntry.image}
        />
      ))}
    </div>
  );
}
