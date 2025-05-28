import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-purple-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-purple-300">
            Welcome to COC Tracker
          </h2>
          <p className="mt-2 text-sm text-purple-400">
            Sign in to your account or create a new one
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 