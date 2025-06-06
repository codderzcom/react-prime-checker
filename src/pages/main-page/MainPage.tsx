import React from 'react';
import {Stack} from "@mui/material";
import PrimeChecker from "@/pages/main-page/components/PrimeChecker.tsx";
import History from "@/pages/main-page/components/History.tsx";
import {ChecksProvider} from "@/contexts/ChecksContext.tsx";

const MainPage = () => {

  return (
    <Stack direction='column' gap={4}>
      <ChecksProvider>
        <PrimeChecker/>
        <History/>
      </ChecksProvider>
    </Stack>
  );
};

export default MainPage;