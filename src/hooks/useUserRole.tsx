import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    fetchUserRole();
  }, [user]);

  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setRole(data?.role || 'user');
    } catch (error) {
      console.error('Error fetching user role:', error);
      setRole('user'); // Default to user role
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = role === 'admin';

  return {
    role,
    isAdmin,
    loading
  };
};