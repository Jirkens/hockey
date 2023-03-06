import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthWrapper } from "./AuthWrapper";
import { AuthProvider, MetricsProvider } from './contexts';
import { MainPage } from "./MainPage";
import { WithAxios } from "./WithAxios";

import './App.css';

const theme = responsiveFontSizes(createTheme({
  spacing: 5,
}));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MetricsProvider>
            <WithAxios>
              <AuthWrapper>
                <MainPage />
              </AuthWrapper>
            </WithAxios>
          </MetricsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
