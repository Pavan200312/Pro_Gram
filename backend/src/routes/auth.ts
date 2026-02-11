import express from 'express';
import { supabase } from '../lib/supabase.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

// Register user (Student or Faculty)
router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      role,
      firstName,
      middleName,
      lastName,
      contactNo,
      gender,
      rollNumber,
      department,
      yearOfGraduation,
      skills,
      portfolio,
      bio,
    } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required' });
    }

    const allowedRoles = ['student', 'faculty'] as const;
    type AllowedRole = (typeof allowedRoles)[number];

    // Normalize role to lowercase for validation and storage
    const normalizedRole = (role as string).toLowerCase();
    if (!allowedRoles.includes(normalizedRole as AllowedRole)) {
      return res.status(400).json({ error: 'Invalid role. Must be student or faculty' });
    }
    const roleValue = normalizedRole as 'student' | 'faculty';

    // Enforce ANITS student email and roll-number formats for students
    if (normalizedRole === 'student') {
      const studentEmailRegex = /^[a-zA-Z]+\.[0-9]{2}\.(cse|csd|aim|csc|it|ece)@anits\.edu\.in$/i;
      if (!studentEmailRegex.test(email)) {
        return res.status(400).json({
          error: 'Invalid email format. Use firstname.YY.dept@anits.edu.in (dept: cse/csd/aim/csc/it/ece)',
        });
      }

      const rollRegex = /^A\d{11}$/;
      if (rollNumber && !rollRegex.test(rollNumber)) {
        return res.status(400).json({
          error: 'Invalid roll number format. Use A followed by 11 digits',
        });
      }
    }

    // Check if user already exists in profiles table
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existingProfile) {
      return res.status(400).json({ error: 'User with this email already exists. Please login instead.' });
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError || !authData?.user) {
      return res.status(400).json({ error: authError?.message || 'Unable to create user' });
    }

    const userId = authData.user.id;

    // Map incoming frontend fields to profile columns used in Supabase
    const profileInsert = {
      id: userId,
      role: roleValue,
      first_name: firstName ?? null,
      last_name: lastName ?? null,
      middle_name: middleName ?? null,
      email,
      contact_no: contactNo ?? null,
      gender: gender ?? null,
      roll_number: rollNumber ?? null,
      department: department ?? null,
      year_of_graduation: yearOfGraduation ?? null,
      skills: skills ?? [],
      portfolio: portfolio ?? null,
      bio: bio ?? null,
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(profileInsert, {
        onConflict: 'id'
      });

    if (profileError) {
      // If profile creation fails, delete the auth user to avoid orphaned accounts
      await supabase.auth.admin.deleteUser(userId);
      return res.status(400).json({ error: profileError.message });
    }

    const accessToken = generateToken({ id: userId, email, role: roleValue });

    return res.status(200).json({
      message: 'User registered successfully',
      user: authData.user,
      access_token: accessToken,
    });
  } catch (err: any) {
    console.error('REGISTER ERROR:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
});

// Login user (returns JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return res.status(400).json({ error: error?.message || 'Invalid credentials' });
  }

  const userId = data.user.id;
    const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

    const role = (profile?.role || 'student') as 'student' | 'faculty';
    const accessToken = generateToken({ id: userId, email: data.user.email ?? email, role });

  return res.status(200).json({
    message: 'Logged in successfully',
    user: data.user,
    access_token: accessToken,
    supabase_access_token: data.session?.access_token,
  });
});

export default router;
