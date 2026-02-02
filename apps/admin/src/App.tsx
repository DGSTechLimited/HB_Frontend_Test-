import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import { MutationCache, QueryCache } from "@tanstack/react-query";
import { QueryClient } from "@shared/lib/QueryClient";
import { initializeAxios } from "@shared/lib/AxiosClient";
import { getAllErrorMessages } from "@shared/utils/error";
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

// Global error handler reference (will be set after AntApp mounts)
let globalMessage: ReturnType<typeof AntApp.useApp>["message"] | null = null;

// Enhanced query config with global error handlers
const queryConfigWithHandlers = {
  ...QUERY_CONFIG,
  mutationCache: new MutationCache({
    onError: (error) => {
      const messages = getAllErrorMessages(error);
      if (globalMessage) {
        messages.forEach((msg) => {
          globalMessage?.error(msg);
        });
      }
    },
  }),
};

function AppContent() {
  const { message } = AntApp.useApp();
  globalMessage = message;

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClient config={queryConfigWithHandlers}>
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
