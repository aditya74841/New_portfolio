import { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';

// Type definitions
interface HealthCheckReturn {
  serverMessage: string;
  loading: boolean;
  error: string | null;
}

interface HealthCheckResponse {
  message: string;
}

const useHealthCheck = (url: string): HealthCheckReturn => {
  const [serverMessage, setServerMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const healthCheck = async (): Promise<void> => {
      try {
        const response = await axios.get<HealthCheckResponse>(url);
        setServerMessage(response.data.message);
        setLoading(false);
        setError(null);

        // Stop polling once we get a successful response
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        setServerMessage('Server offline');
        setError(axiosError.message || 'Connection failed');
        setLoading(false);
      }
    };

    // Initial health check
    healthCheck();

    // Start polling every 2 seconds if not already started
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        // Only continue polling if we haven't received a successful response
        if (serverMessage === '' || serverMessage === 'Server offline') {
          healthCheck();
        }
      }, 2000);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [url, serverMessage]);

  return { serverMessage, loading, error };
};

export default useHealthCheck;
