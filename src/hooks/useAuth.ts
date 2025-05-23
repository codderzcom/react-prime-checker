import Cookies from 'js-cookie';
import authService from "@/services/auth.ts";

const SESSION_COOKIE = 'auth_session';
const SESSION_DURATION_DAYS = 1;

export const useAuth = () => {
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const isValid = await authService.validateUser(username, password);

      if (isValid) {
        const sessionId = crypto.randomUUID();
        Cookies.set(SESSION_COOKIE, sessionId, {
          expires: SESSION_DURATION_DAYS,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (username, password) => {
    try {
      await authService.addUser(username, password);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const isAuthenticated = () => {
    return !!Cookies.get(SESSION_COOKIE);
  };

  const logout = (): void => {
    Cookies.remove(SESSION_COOKIE, {
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    });
  };

  return {
    login,
    logout,
    register,
    isAuthenticated
  }
}