import axios, { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { AuthResponse, DeleteSessionResponse, GuestSessionResponse, RequestTokenResponse, SessionResponse } from "@/interfaces/auth";
import { ApiStatus } from "@/types/apiStatus";
import { decrypt, encrypt } from "@/utils/utils";
import Cookies from "js-cookie";
import { Account } from "@/interfaces/account";

const API_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_AUTH;

export const createGuestSession = async (): Promise<GuestSessionResponse | null> => {
  try {
    const response: AxiosResponse<GuestSessionResponse> = await axios.get<GuestSessionResponse>(
      `${API_ENDPOINTS.CREATE_GUEST_SESSION}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    if (response.data.success) {
      Cookies.set('tmdb_session_id', encrypt(response.data.guest_session_id));
      Cookies.set('tmdb_user_type', 'guest');
      return response.data;
    }
    return null;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      console.error(err.response.data.status_message);
    } else {
      console.error('An unknown error occurred');
    }
    return null;
  }
}

export const loginAndGetAccountDetails = async (
  username: string,
  password: string
): Promise<AuthResponse | null> => {
  const response: AuthResponse = {
    account: null,
    sessionId: '',
    status: ApiStatus.Loading,
    error: null
  };

  try {
    const tokenResponse: AxiosResponse<RequestTokenResponse> = await axios.get(
      API_ENDPOINTS.CREATE_REQUEST_TOKEN,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    const requestToken = tokenResponse.data.request_token;

    await axios.post(
      API_ENDPOINTS.VALIDATE_REQUEST_TOKEN,
      {
        username: username,
        password: password,
        request_token: requestToken
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const sessionResponse: AxiosResponse<SessionResponse> = await axios.post(
      API_ENDPOINTS.CREATE_SESSION,
      {
        request_token: requestToken
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );
    const sessionId = sessionResponse.data.session_id;

    const accountResponse: AxiosResponse<Account> = await axios.get(
      API_ENDPOINTS.GET_ACCOUNT,
      {
        params: {
          session_id: sessionId
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });

    const id = accountResponse.data.id;
    const name = accountResponse.data.name;
    const avatar = accountResponse.data.avatar;

    response.account = {
      avatar,
      id,
      name,
      username
    };
    response.sessionId = sessionId;
    response.status = ApiStatus.Success;

    Cookies.set('tmdb_session_id', encrypt(sessionId));
    Cookies.set('tmdb_user_type', 'user');
    Cookies.set('tmdb_account_id', id.toString());
  } catch (error) {
    response.status = ApiStatus.Error;
    if (axios.isAxiosError(error) && error.response) {
      response.error = error.response.data.status_message;
    } else {
      response.error = 'An unknown error occurred';
    }
  }

  return response;
}

export const deleteSessionCookie = (): void => {
  Cookies.remove('tmdb_session_id');
  Cookies.remove('tmdb_user_type');
  Cookies.remove('tmdb_account_id');
}

export const deleteSession = async (): Promise<DeleteSessionResponse | null> => {
  console.log(decrypt(Cookies.get('tmdb_session_id') || ''));
  try {
    const response: AxiosResponse<DeleteSessionResponse> = await axios.delete(
      API_ENDPOINTS.DELETE_SESSION,
      {
        data: {
          session_id: decrypt(Cookies.get('tmdb_session_id') || '')
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });

    deleteSessionCookie();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data.status_message);
    } else {
      console.error('An unknown error occurred');
    }
    return null;
  }
}
