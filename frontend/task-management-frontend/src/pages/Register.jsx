// src/pages/Register.jsx
import AuthForm from '../components/AuthForm.jsx';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="register" />
    </div>
  );
}
