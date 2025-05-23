import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import {generateDemoChecks} from "@/utils/seeder.ts";
import {useAuth} from "@/hooks/useAuth.ts";

const Seeder = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {register} = useAuth()
  const initialize = async () => {
    setIsLoading(true)

    try {
      await register('admin', 'admin');
      await generateDemoChecks();
    } catch (err) {
      console.error('DB initialization failed:', err);
    } finally {
      setTimeout(() => setIsLoading(false), 1000)
    }
  };

  return (
    <Stack sx={{mt: 'auto'}}>
      <Button
        variant="outlined"
        loading={isLoading}
        loadingPosition="start"
        onClick={initialize}>Set Data</Button>
    </Stack>
  );
};

export default Seeder;