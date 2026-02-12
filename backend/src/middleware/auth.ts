import { Response, NextFunction } from 'express';
import { supabase } from '../lib/supabase.js';
import { AuthRequest } from '../types/index.js';

/**
 * Extracts bearer token from Authorization header
 */
function extractBearerToken(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.substring(7);
}

/**
 * Middleware to authenticate Supabase JWT tokens
 * Fetches user via Supabase Admin API and enriches with profile role
 */
export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = extractBearerToken(req.headers.authorization);

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Fetch role from profiles table; fall back to user metadata or default
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    const role = (profile?.role || (data.user.user_metadata as any)?.role || 'student') as string;

    req.user = {
      id: data.user.id,
      email: data.user.email || '',
      role: role.toLowerCase(),
    };

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Authentication error' });
  }
}

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export async function optionalAuthMiddleware(req: AuthRequest, _res: Response, next: NextFunction) {
  try {
    const token = extractBearerToken(req.headers.authorization);

    if (token) {
      const { data } = await supabase.auth.getUser(token);
      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const role = (profile?.role || (data.user.user_metadata as any)?.role || 'student') as string;

        req.user = {
          id: data.user.id,
          email: data.user.email || '',
          role: role.toLowerCase(),
        };
      }
    }

    next();
  } catch (_err) {
    next();
  }
}

/**
 * Role-based access control middleware
 */
export function roleMiddleware(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const reqRole = req.user.role?.toLowerCase();
    const allowed = roles.map(r => r.toLowerCase());

    if (!allowed.includes(reqRole)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient permissions',
      });
    }

    next();
  };
}
