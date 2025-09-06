import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';


const Header = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RM</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-semibold text-text-primary">ResumeMatch Pro</div>
                <div className="text-xs text-text-secondary">AI-Powered Resume Optimization</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/resume-analysis-input"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              Analyze Resume
            </Link>
            <Link
              to="/match-report-dashboard"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/side-by-side-comparison"
              className="text-text-secondary hover:text-text-primary font-medium transition-colors"
            >
              Compare
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              /* Authenticated User Menu */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userProfile?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-text-primary">
                      {userProfile?.full_name || 'User'}
                    </div>
                    <div className="text-xs text-text-secondary capitalize">
                      {userProfile?.role || 'basic'} plan
                    </div>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-text-secondary">{user?.email}</p>
                      <p className="text-xs text-primary capitalize font-medium">
                        {userProfile?.role || 'basic'} plan
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-border pt-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          handleSignOut();
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-error hover:bg-error/10 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest User - Auth Buttons */
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/resume-analysis-input"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analyze Resume
              </Link>
              <Link
                to="/match-report-dashboard"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/side-by-side-comparison"
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare
              </Link>

              {!user && (
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;