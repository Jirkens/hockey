import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthWrapper } from "./AuthWrapper";
import { AuthProvider } from './contexts/AuthContext';
import { MainPage } from "./MainPage";
import { WithAxios } from "./WithAxios";

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WithAxios>
          <AuthWrapper>
            <MainPage />
          </AuthWrapper>
        </WithAxios>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
