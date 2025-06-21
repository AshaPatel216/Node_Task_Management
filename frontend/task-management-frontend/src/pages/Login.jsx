/**
 * Login page component.
 * This component renders the authentication form in 'login' mode.
 */
import AuthForm from '../components/AuthForm.jsx';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="login" />
    </div>
  );
}
