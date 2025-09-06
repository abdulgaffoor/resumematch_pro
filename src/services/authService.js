import { supabase } from '../lib/supabase';

class AuthService {
  // Sign up with email and password
  async signUp(email, password, userData = {}) {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.fullName || '',
            role: userData?.role || 'basic'
          }
        }
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      return { error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get current session
  async getSession() {
    try {
      const { data, error } = await supabase?.auth?.getSession();
      return { data: data?.session, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get current user
  async getUser() {
    try {
      const { data, error } = await supabase?.auth?.getUser();
      return { data: data?.user, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      const { data, error } = await supabase?.auth?.updateUser({
        data: updates
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Update user password
  async updatePassword(password) {
    try {
      const { data, error } = await supabase?.auth?.updateUser({
        password
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      const { data, error } = await supabase?.auth?.resetPasswordForEmail(email, {
        redirectTo: `${window?.location?.origin}/reset-password`
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Get user profile from user_profiles table
  async getUserProfile() {
    try {
      const { data: user } = await supabase?.auth?.getUser();
      if (!user?.user) return { error: { message: 'No user found' } };

      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.user?.id)?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Update user profile in user_profiles table
  async updateUserProfile(updates) {
    try {
      const { data: user } = await supabase?.auth?.getUser();
      if (!user?.user) return { error: { message: 'No user found' } };

      const { data, error } = await supabase?.from('user_profiles')?.update({
          full_name: updates?.fullName,
          subscription_ends_at: updates?.subscriptionEndsAt,
          analyses_remaining: updates?.analysesRemaining
        })?.eq('id', user?.user?.id)?.select()?.single();

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Check if user has remaining analyses
  async hasAnalysesRemaining() {
    try {
      const { data, error } = await this.getUserProfile();
      if (error) return { hasRemaining: false, error };

      const hasRemaining = (data?.analyses_remaining || 0) > 0 || data?.role === 'premium';
      
      return { 
        hasRemaining, 
        remaining: data?.analyses_remaining,
        role: data?.role,
        error: null 
      };
    } catch (error) {
      return { hasRemaining: false, error: { message: 'Network error. Please try again.' } };
    }
  }

  // Decrement analyses count
  async decrementAnalysesCount() {
    try {
      const { data: profile } = await this.getUserProfile();
      if (!profile || profile?.role === 'premium') return { data: null, error: null };

      const newCount = Math.max((profile?.analyses_remaining || 0) - 1, 0);
      
      const { data, error } = await this.updateUserProfile({
        analysesRemaining: newCount
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }

  // Sign in with OAuth provider
  async signInWithProvider(provider) {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window?.location?.origin}/dashboard`
        }
      });

      return { data, error };
    } catch (error) {
      return { error: { message: 'Network error. Please try again.' } };
    }
  }
}

export const authService = new AuthService();