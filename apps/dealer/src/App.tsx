import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import { QueryClient } from "@shared/lib/QueryClient";
import { initializeAxios } from "@shared/lib/AxiosClient";
import { theme } from "@/config/theme.config";
import { API_CONFIG, QUERY_CONFIG } from "@/config/app.config";
import { Routes } from "@routes/index";
import { ErrorBoundary } from "@shared/components/ErrorBoundary";
import "@/assets/styles/index.css";
import NProgress from "nprogress";


// Initialize axios with API config
initializeAxios(API_CONFIG);

// Configure NProgress
NProgress.configure({ showSpinner: false });

function AppContent() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClient config={QUERY_CONFIG}>
        <ConfigProvider theme={theme()}>
          <AntApp>
            <AppContent />
          </AntApp>
        </ConfigProvider>
      </QueryClient>
    </ErrorBoundary>
  );
}

export default App;
