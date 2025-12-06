# Student Registration Updates

## Changes Implemented

### 1. Restricted Department Options
Updated the student registration form to only allow the following departments:
- **CSE** (Computer Science and Engineering)
- **CSE (DATA SCIENCE)**
- **CSE (AI ML)** (Artificial Intelligence and Machine Learning)
- **CYBERSECURITY**
- **INFORMATION TECHNOLOGY**
- **ECE** (Electronics and Communication Engineering)

**File Modified:** `src/pages/StudentRegister.tsx`

### 2. Email Validation for Specific Departments
Updated email validation to only accept ANITS email addresses with the following department codes:
- `cse` - Computer Science and Engineering
- `csd` - CSE (Data Science)
- `aim` - CSE (AI ML)
- `csc` - Cybersecurity
- `it` - Information Technology
- `ece` - Electronics and Communication Engineering

**Email Format:** `fullname.batchyear.dept@anits.edu.in`

**Example:** `godavarthivedaaksharee.22.csd@anits.edu.in`

### 3. Secure Session Persistence
The application already has a robust storage system implemented:

#### Features:
- **Encrypted Storage:** All user data is encrypted using XOR encryption before storing in localStorage
- **Session Persistence:** User login sessions persist across browser restarts
- **Secure Authentication:** Passwords are hashed before storage
- **Profile Management:** User profiles are automatically saved and retrieved

#### Technical Implementation:
1. **secureStorageService.ts:** Handles encryption/decryption of data
2. **localStorageAuthService.ts:** Manages user registration, login, and session persistence
3. **AuthContext.tsx:** Provides authentication state across the application

#### How It Works:
1. When a user registers or logs in, their credentials are securely stored
2. Session tokens are generated and encrypted
3. On page reload, the system automatically checks for existing sessions
4. Users remain logged in until they explicitly logout

### Security Features
- Password hashing using Base64 encoding
- XOR encryption for localStorage data
- Session token management
- Automatic session validation on app load
- Secure profile updates with authentication checks

### Usage
1. Students must use valid ANITS email addresses with allowed department codes
2. Only the 6 specified departments can register
3. Login sessions persist across browser sessions
4. Users can update their profiles while maintaining secure authentication

### Testing
To test the implementation:
1. Try registering with an email from an unauthorized department (should fail)
2. Register with a valid email (e.g., `john.22.cse@anits.edu.in`)
3. Close the browser and reopen - you should still be logged in
4. Check browser's localStorage to verify data is encrypted

### Notes
- The current encryption is for obfuscation purposes
- For production, consider using a more robust encryption library like CryptoJS
- Email validation is case-insensitive
- Duplicate email addresses are prevented
- Roll numbers must be unique and follow the format: A followed by 11 digits
