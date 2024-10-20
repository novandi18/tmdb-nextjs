import { ApiStatus } from "@/types/apiStatus";
import { Account } from "@/interfaces/account";
export interface GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean;
  session_id: string;
}

export interface AuthResponse {
  account: Account | null;
  sessionId: string;
  status: ApiStatus;
  error: string | null;
}

export interface DeleteSessionResponse {
  success: boolean;
}
