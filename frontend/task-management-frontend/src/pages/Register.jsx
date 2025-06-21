/**
 * Register page component.
 * This component renders the authentication form in 'register' mode.
 */
import AuthForm from '../components/AuthForm';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="register" />
    </div>
  );
}
