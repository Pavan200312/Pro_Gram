import express from 'express';
import { supabase } from '../lib/supabase.js';
import { generateToken } from '../utils/jwt.js';

const router = express.Router();

// Register user (Student or Faculty)
router.post('/register', async (req, res) => {
  const { email, password, role, ...profileData } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required' });
  }

  const allowedRoles = ['STUDENT', 'FACULTY'] as const;
  type AllowedRole = (typeof allowedRoles)[number];

  // Normalize role to uppercase expected by backend/DB
  const normalizedRole = (role as string).toUpperCase();
  if (!allowedRoles.includes(normalizedRole as AllowedRole)) {
    return res.status(400).json({ error: 'Invalid role. Must be STUDENT or FACULTY' });
  }
  const roleValue = normalizedRole as AllowedRole;

  // Enforce ANITS student email and roll-number formats for students
  if (normalizedRole === 'STUDENT') {
    const studentEmailRegex = /^[a-zA-Z]+\.[0-9]{2}\.(cse|csd|aim|csc|it|ece)@anits\.edu\.in$/i;
    if (!studentEmailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format. Use firstname.YY.dept@anits.edu.in (dept: cse/csd/aim/csc/it/ece)',
      });
    }

    const rollRegex = /^A\d{11}$/;
    if (profileData.rollNumber && !rollRegex.test(profileData.rollNumber)) {
      return res.status(400).json({
        error: 'Invalid roll number format. Use A followed by 11 digits',
      });
    }
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
    first_name: profileData.firstName ?? null,
    last_name: profileData.lastName ?? null,
    middle_name: profileData.middleName ?? null,
    email,
    contact_no: profileData.contactNo ?? null,
    gender: profileData.gender ?? null,
    roll_number: profileData.rollNumber ?? null,
    department: profileData.department ?? null,
    year_of_graduation: profileData.yearOfGraduation ?? null,
    skills: profileData.skills ?? [],
    portfolio: profileData.portfolio ?? null,
    bio: profileData.bio ?? null,
  };

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([profileInsert]);

  if (profileError) {
    return res.status(400).json({ error: profileError.message });
  }

  const accessToken = generateToken({ id: userId, email, role: roleValue });

  return res.status(200).json({
    message: 'User registered successfully',
    user: authData.user,
    access_token: accessToken,
  });
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

  const role = (profile?.role || 'STUDENT') as 'STUDENT' | 'FACULTY';
  const accessToken = generateToken({ id: userId, email: data.user.email ?? email, role });

  return res.status(200).json({
    message: 'Logged in successfully',
    user: data.user,
    access_token: accessToken,
    supabase_access_token: data.session?.access_token,
  });
});

export default router;
