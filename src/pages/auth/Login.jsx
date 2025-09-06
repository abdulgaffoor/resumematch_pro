import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: authError } = await signIn(formData?.email, formData?.password);
      
      if (authError) {
        if (authError?.message?.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again.');
        } else if (authError?.message?.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link.');
        } else if (authError?.message?.includes('Too many requests')) {
          setError('Too many login attempts. Please wait a few minutes and try again.');
        } else {
          setError(authError?.message || 'Login failed. Please try again.');
        }
      } else if (data?.user) {
        // Successful login - user will be redirected by auth context
        navigate('/match-report-dashboard');
      }
    } catch (error) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">RM</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-text-primary">
            Welcome back
          </h2>
          <p className="mt-2 text-text-secondary">
            Sign in to your ResumeMatch Pro account
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  value={formData?.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <p className="text-error text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-text-secondary text-sm">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </form>

        {/* Demo Login Credentials */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-text-secondary mb-2 font-medium">Demo Account:</p>
          <p className="text-xs text-text-secondary">Email: john@example.com</p>
          <p className="text-xs text-text-secondary">Password: User123!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;