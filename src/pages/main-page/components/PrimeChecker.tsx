import React, {useState} from 'react';
import storageService from "@/services/storage";
import checkerService from "@/services/checker"
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import type {CheckResult} from "@/types";
import dayjs from "dayjs";
import {useChecks} from "@/contexts/ChecksContext.tsx";

const PrimeChecker = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState('');
  const {addCheck} = useChecks();

  const handleCheck = async () => {
    try {
      const num = parseInt(number);
      if (isNaN(num) || num <= 0) {
        setError('Please enter a valid natural number');
        return;
      }

      const primeResult = checkerService.checkPrime(num);
      const now = new Date().getTime();

      await storageService.addCheck(num, primeResult);

      const newCheck = {
        number: num,
        isPrime: primeResult,
        timestamp: now
      };
      setResult(newCheck);
      addCheck(newCheck);
      setError('');
      setNumber('')
    } catch {
      setError('Error during prime check');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumber(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!/[0-9]/.test(e.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <Paper elevation={1} sx={{p: 3, mb: 3}}>
      <Box sx={{display: 'flex', gap: 2, alignItems: 'center', mb: 2}}>
        <TextField
          label="Enter a natural number"
          variant="outlined"
          value={number}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          type="number"
          size={'small'}
          slotProps={{
            input: {inputMode: 'numeric'}
          }}
        />
        <Button
          variant="contained"
          onClick={handleCheck}
          sx={{height: '40px'}}
        >
          Check
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {result && (
        <Typography sx={{mt: 2}}>
          The number {result.number} is {result.isPrime ? 'prime' : 'not prime'}.
          Checked at: {dayjs(result.timestamp).format('DD.MM.YYYY HH:mm:ss')}
        </Typography>
      )}
    </Paper>
  );
};

export default PrimeChecker;