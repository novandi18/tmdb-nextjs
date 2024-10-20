import { useState } from "react";

import { ApiStatus } from "@/types/apiStatus";
import { useEffect } from "react";
import { Account } from "@/interfaces/account";
import axios from "axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

const API_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

export const useGetAccountDetails = (
  sessionId: string
): [Account | null, ApiStatus, Error | null] => {
  const [account, setAccount] = useState<Account | null>(null);
  const [status, setStatus] = useState<ApiStatus>(ApiStatus.Idle);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setStatus(ApiStatus.Loading);
      try {
        const response = await axios.get(API_ENDPOINTS.GET_ACCOUNT, {
          params: {
            session_id: sessionId
          },
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        setAccount(response.data);
        setStatus(ApiStatus.Success);
      } catch (err) {
        setError(err as Error);
        setStatus(ApiStatus.Error);
      }
    };

    if (sessionId) {
      fetchAccountDetails();
    }
  }, [sessionId]);

  return [account, status, error];
};