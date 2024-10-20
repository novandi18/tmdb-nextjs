import { createGuestSession, loginAndGetAccountDetails } from "@/api/authApi";
import Alert from "@/components/common/Alert";
import { ApiStatus } from "@/types/apiStatus";
import { encrypt } from "@/utils/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const cookies = Cookies;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username || !password) {
      setError('Please enter your username and password');
      return;
    }
    
    const authResponse = await loginAndGetAccountDetails(username, password);
    if (authResponse && authResponse.status === ApiStatus.Success) {
      cookies.set('tmdb_session_id', encrypt(authResponse.sessionId));
      cookies.set('tmdb_name', authResponse.account?.name || '');
      cookies.set('tmdb_user_type', 'user');
      cookies.set('tmdb_account_id', authResponse.account?.id.toString() || '');
      cookies.set('tmdb_username', authResponse.account?.username || '');
      router.push(`/`);
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  }
  
  const handleGuestLogin = async () => {
    setError(null);
    setLoading(true);
    
    const guestSession = await createGuestSession();
    if (guestSession && guestSession.success) {
      cookies.set('tmdb_session_id', encrypt(guestSession.guest_session_id));
      cookies.set('tmdb_name', 'Guest User');
      cookies.set('tmdb_user_type', 'guest');
      router.push(`/`);
    }
    
    setError('Failed to create guest session');
    setLoading(false);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex flex-col px-4 md:px-16 py-8 text-sky-950 dark:text-white">
      <h1 className="text-xl font-medium">Login to your account</h1>
      <span className="text-sm text-gray-500 mt-2 dark:text-gray-400">In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account.</span>
      
      {error && <Alert message={error} type="error" />}

      <form className="mt-4" onSubmit={handleLogin}>
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Username
          </label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-gray-500 disabled:dark:border-gray-700 disabled:dark:text-gray-400" 
            placeholder="Username" 
            required
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mt-4">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Password
          </label>
          <input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            name="password" 
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:dark:bg-gray-500 disabled:dark:border-gray-700 disabled:dark:text-gray-400" 
            placeholder="Password" 
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="Option1" className="flex items-center gap-2 mt-2 cursor-pointer w-32">
            <div className="flex items-center">
              &#8203;
              <input type="checkbox" className="size-4 rounded border-gray-300" id="Option1" onChange={handleShowPassword} />
            </div>
            <span className="text-sky-950 dark:text-white text-xs">Show Password</span>
          </label>
        </div>
        <div className="flex gap-4">
          <button 
            type="submit" 
            className="mt-6 bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition-colors duration-300 px-6 text-sm disabled:cursor-not-allowed disabled:bg-sky-800"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button 
            type="button" 
            className="mt-6 text-sm text-gray-500 underline dark:text-gray-400 disabled:cursor-not-allowed" 
            onClick={handleGuestLogin}
            disabled={loading}
          >Continue as guest</button>
        </div>
      </form>
    </div>
  )
}
