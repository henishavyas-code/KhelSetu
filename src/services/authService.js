const AUTH_STORAGE_KEY = 'khelsetu_auth_session_v2';
const USERS_STORAGE_KEY = 'khelsetu_registered_users_v2';
const AUTH_EVENT_NAME = 'khelsetu_auth_changed';

// Initial Demo Accounts
const DEFAULT_USERS = [
  {
    id: 'USR-ATH-001',
    name: 'Aarav Patel',
    email: 'aarav@khelsetu.in',
    password: 'Password@123',
    role: 'athlete',
    age: 18,
    sport: 'Athletics & Field',
    district: 'Kheda',
    state: 'Gujarat',
    khelScore: 87,
    assessmentsCompleted: 14,
    streak: 5,
    personalBests: {
      pushups: 34,
      squats: 48,
      jumpingJacks: 72
    }
  },
  {
    id: 'USR-COA-002',
    name: 'Coach Rajesh Sharma',
    email: 'coach.rajesh@khelsetu.in',
    password: 'Password@123',
    role: 'coach',
    organization: 'Gujarat Sports Academy',
    district: 'Ahmedabad',
    state: 'Gujarat',
    assignedAthletes: 12
  },
  {
    id: 'USR-ADM-003',
    name: 'Dr. Sunita Rao',
    email: 'admin@khelsetu.in',
    password: 'Password@123',
    role: 'admin',
    department: 'National Sports Assessment Operations'
  }
];

const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const authService = {
  // Validate Password Criteria
  validatePassword: (password) => {
    const errors = [];
    if (!password || password.length < 8) {
      errors.push('At least 8 characters required');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('One uppercase letter required');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('One number required');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('One special character required');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Register New User
  register: ({ name, email, phone, password, confirmPassword, role }) => {
    if (!name || !email || !password || !role) {
      throw new Error('Please fill in all required fields.');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const pwdCheck = authService.validatePassword(password);
    if (!pwdCheck.isValid) {
      throw new Error(`Password policy violation: ${pwdCheck.errors.join(', ')}`);
    }

    const users = getStoredUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `USR-${role.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone: phone || '',
      password, // Note: client-side mock; in production hashed with bcrypt
      role,
      state: 'Gujarat',
      district: 'Ahmedabad',
      createdAt: new Date().toISOString(),
      khelScore: 80,
      assessmentsCompleted: 0,
      streak: 1,
      personalBests: { pushups: 0, squats: 0, jumpingJacks: 0 }
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto login after registration
    return authService.login(email, password);
  },

  // Login Existing User
  login: (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      throw new Error('Incorrect email or password.');
    }

    // Create session token mock
    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      sport: user.sport || 'Sports & Athletics',
      district: user.district || 'National',
      state: user.state || 'India',
      token: `JWT_MOCK_${btoa(user.email)}_${Date.now()}`,
      khelScore: user.khelScore || 85,
      assessmentsCompleted: user.assessmentsCompleted || 0,
      streak: user.streak || 1,
      personalBests: user.personalBests || { pushups: 20, squats: 30, jumpingJacks: 40 }
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME));
    return sessionUser;
  },

  // Get Active Logged In User Session
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  // Check Role
  hasRole: (allowedRoles) => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.includes(user.role);
    }
    return user.role === allowedRoles;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME));
  },

  // Subscribe to Auth State Changes
  subscribe: (callback) => {
    const handler = () => callback(authService.getCurrentUser());
    window.addEventListener(AUTH_EVENT_NAME, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(AUTH_EVENT_NAME, handler);
      window.removeEventListener('storage', handler);
    };
  }
};
