# 📂 Code Files & Components Relationship Guide

## 📌 Overview
This document explains every code file, its purpose, and which components/pages use it.

---

## 🎨 **1. Design Components** (`src/components/Design/`)
**Purpose:** Reusable UI building blocks (Design System)

### **LazyImage.tsx** ✨ (Currently Open)
**Purpose:** Performance-optimized image component with lazy loading
**Concepts Used:**
- Intersection Observer API (loads images only when visible)
- Skeleton shimmer placeholder animation
- Fade-in animation on load
- Aspect ratio preservation
- Hover zoom effect

**Code Features:**
```typescript
- IntersectionObserver: Detects when image enters viewport
- useState(isLoaded): Tracks loading state
- useRef: References DOM elements
- Shimmer animation: Gray gradient loading effect
- aspectRatio prop: Maintains image dimensions
```

**Used By:** 
- Profile pages (user avatars)
- Gallery components
- Post images
- Project thumbnails

---

### **Button.tsx**
**Purpose:** Customizable button component with variants
**Variants:** 
- `primary` - Blue solid button
- `secondary` - Gray solid button
- `outline` - Transparent with border
- `ghost` - Transparent with hover

**Sizes:** `sm`, `md`, `lg`
**Features:** Loading state, full width option, disabled state

**Used By:**
- **OpportunityDetails.tsx** - Apply buttons, action buttons
- **ApplicationManagement.tsx** - Accept/reject buttons
- **LandingPageNew.tsx** - CTA buttons
- All forms and action interfaces

---

### **Card.tsx**
**Purpose:** Container component for content sections
**Exports:**
- `Card` - Main container
- `CardHeader` - Top section with title
- `CardTitle` - Title text
- `CardContent` - Main content area
- `CardActions` - Button footer

**Used By:**
- **OpportunityDetails.tsx** - Post details display
- **ApplicationManagement.tsx** - Application cards
- **Home.tsx** - Post cards in feed
- **Dashboard.tsx** - Stats cards

---

### **Input.tsx**
**Purpose:** Text input field with validation
**Features:** Label, placeholder, error state, helper text, icons

**Used By:**
- Login forms
- Registration forms
- Search bars
- Filter inputs

---

### **Modal.tsx**
**Purpose:** Popup dialog overlay
**Features:** Backdrop, close button, header/footer, animations

**Used By:**
- Application submission
- Confirmation dialogs
- Image previews
- Edit forms

---

### **Avatar.tsx**
**Purpose:** User profile picture component
**Features:** Size variants, fallback initials, status indicator

**Used By:**
- **OpportunityDetails.tsx** - Post author avatar
- **ApplicationManagement.tsx** - Applicant avatars
- Navbar user menu
- Chat messages
- Comments sections

---

### **Badge.tsx**
**Purpose:** Small status/label indicator
**Variants:** Status colors, skill tags, notification counts

**Used By:**
- **OpportunityDetails.tsx** - Post status badges
- **ApplicationManagement.tsx** - Application status
- Skill tags
- Notification bell

---

### **Grid.tsx & GridItem**
**Purpose:** Responsive grid layout system
**Features:** Columns, gaps, responsive breakpoints

**Used By:**
- **OpportunityDetails.tsx** - Content layout
- **ApplicationManagement.tsx** - Application grid
- Dashboard layouts
- Profile sections

---

### **Select.tsx**
**Purpose:** Dropdown selection component
**Features:** Options list, search, multi-select

**Used By:**
- **ApplicationManagement.tsx** - Status filter
- Forms (department, skills)
- Sorting controls

---

### **Switch.tsx**
**Purpose:** Toggle switch (on/off)
**Used By:** Settings, privacy controls, filters

---

### **Tabs.tsx**
**Purpose:** Tab navigation component
**Used By:** Profile sections, settings pages, dashboard views

---

### **Tooltip.tsx**
**Purpose:** Hover information popup
**Used By:** Icons, help text, truncated content

---

### **AnimatedComponents.tsx**
**Purpose:** Pre-configured Framer Motion animations
**Exports:** FadeIn, SlideIn, ScaleIn, Stagger animations

**Used By:** All pages for entrance animations

---

### **LoadingSpinner.tsx & LoadingComponents.tsx**
**Purpose:** Loading state indicators
**Used By:** Data fetching, form submissions, page transitions

---

### **StyledComponents.tsx**
**Purpose:** Additional styled utility components
**Used By:** Various pages for consistent styling

---

## 🏠 **2. Landing Components** (`src/components/Landing/`)
**Purpose:** Public website sections (before login)

### **PublicNavbar.tsx**
**Purpose:** Navigation bar for non-authenticated users
**Features:** Logo, navigation links, Login/Register buttons

**Used By:**
- **LandingPageNew.tsx** - Main landing page

---

### **HeroSection.tsx**
**Purpose:** Main hero section with headline and CTA
**Features:** 
- Large headline text
- Background image with overlay
- Primary CTA buttons
- Animated entrance
- Scroll-to-section navigation

**Code Highlights:**
```typescript
- Framer Motion animations
- MUI Box with background image
- Custom overlay effect
- Responsive flex layout
```

**Used By:**
- **LandingPageNew.tsx**

---

### **AboutSection.tsx**
**Purpose:** Platform introduction and mission statement
**Used By:** **LandingPageNew.tsx**

---

### **FeaturesSection.tsx**
**Purpose:** Key features grid with icons
**Features:** 3-column grid, icons, descriptions, animations

**Used By:** **LandingPageNew.tsx**

---

### **WorkflowSection.tsx**
**Purpose:** Step-by-step usage guide
**Features:** Numbered steps, illustrations, progression flow

**Used By:** **LandingPageNew.tsx**

---

### **TestimonialsSection.tsx**
**Purpose:** User testimonials carousel
**Used By:** **LandingPageNew.tsx**

---

### **Footer.tsx**
**Purpose:** Footer with links, social media, copyright
**Used By:** **LandingPageNew.tsx**

---

## 🔐 **3. Layout Components** (`src/components/Layout/`)
**Purpose:** Page structure and navigation

### **MainLayout.tsx**
**Purpose:** Wrapper layout for authenticated pages
**Structure:**
```
┌─────────────────────────┐
│  AuthenticatedNavbar    │
├─────────────────────────┤
│                         │
│  <Outlet /> (Children)  │ ← Pages render here
│                         │
└─────────────────────────┘
```

**Used By:** App.tsx wraps all protected routes

---

### **AuthenticatedNavbar.tsx**
**Purpose:** Navigation bar for logged-in users
**Features:**
- Logo
- Navigation links (Home, Dashboard, Profile, etc.)
- Notifications bell
- Messages icon
- User avatar dropdown menu
- Search bar

**Used By:**
- **MainLayout.tsx** (automatically on all protected pages)
- **ProjectDetail.tsx** (standalone)
- **AcceptedApplications.tsx** (standalone)

---

### **PrivateRoute.tsx**
**Purpose:** Route guard for authentication
**Logic:**
```typescript
if (user is authenticated) {
  return <Outlet /> (show page)
} else {
  redirect to /login
}
```

**Used By:** App.tsx route configuration

---

## 🎯 **4. Advanced Components** (`src/components/Advanced/`)
**Purpose:** Complex feature components

### **ProjectCard.tsx**
**Purpose:** Display post/project in card format
**Features:**
- Project title & description
- Author info with avatar
- Status badge (Available/Ongoing/Completed)
- Skill tags
- Stats (interests, needed members, views)
- Location & posted date
- Hover animation

**Code Structure:**
```typescript
interface ProjectCardProps {
  title: string
  description: string
  author: string
  status: 'Available' | 'Ongoing' | 'Completed'
  tags: string[]
  stats: { interests, needed, views }
  location: string
  postedDate: string
}
```

**Used By:**
- **Home.tsx** - Posts feed
- Search results
- Recommended opportunities
- User profile (owned projects)

---

### **ProjectDetailModal.tsx**
**Purpose:** Full project details in modal popup
**Features:** Expanded view, apply button, full description

**Used By:**
- When clicking ProjectCard
- Post detail pages

---

## 📋 **5. Application Components** (`src/components/Application/`)

### **ApplicationModal.tsx**
**Purpose:** Application submission form modal
**Features:**
- Cover letter textarea
- Skill selection
- File upload (resume)
- Submit button
- Validation

**Used By:**
- **ProjectDetail.tsx** - Apply to post
- **OpportunityDetails.tsx** - Quick apply

---

## 👤 **6. Profile Components** (`src/components/Profile/`)

### **PrivacyControls.tsx**
**Purpose:** Profile visibility settings
**Features:** Toggle switches for profile sections

**Used By:** **ProfileSettingsNew.tsx**

---

### **ProfileShowcase.tsx**
**Purpose:** Display user's projects and achievements
**Used By:** **Profile.tsx**, **UserProfile.tsx**

---

### **QuickSkillEdit.tsx**
**Purpose:** Inline skill editing component
**Used By:** **Profile.tsx**

---

## 🖥️ **7. Debug Components** (`src/components/Debug/`)
**Purpose:** Development/testing utilities (not shown to users in production)

---

## 📄 **8. Page Files** (`src/pages/`)
**Purpose:** Full page views (routes)

### **LandingPageNew.tsx** 🏠
**Route:** `/`
**Purpose:** Public homepage (before login)
**Components Used:**
```
<ThemeProvider>
  <PublicNavbar />
  <HeroSection />
  <AboutSection />
  <FeaturesSection />
  <WorkflowSection />
  <TestimonialsSection />
  <Footer />
</ThemeProvider>
```
**User Flow:** First page visitors see → Register/Login

---

### **Home.tsx** 📱
**Route:** `/home` (protected)
**Purpose:** Main feed of research/project posts
**Features:**
- Search bar with filters
- Tabs (All Posts / My Posts / Recommended)
- Post cards grid
- Filter by purpose (Research/Project/Hackathon)
- Filter by skills
- Create post button

**Components Used:**
- MUI: Container, Typography, Card, Chip, Button, TextField, Tabs
- Framer Motion: Animated cards
- Lucide Icons: Search, Filter, Users, Calendar

**Data:** Pulls from `mockData.ts`

---

### **OpportunityDetails.tsx**
**Route:** `/opportunity/:id` (protected)
**Purpose:** Full details of a research/project post
**Components Used:**
- Design/Card - Layout structure
- Design/Button - Apply button
- Design/Badge - Status badges
- Design/Avatar - Author avatar
- Design/Grid - Responsive layout

**Features:**
- Full description
- Required skills list
- Team members needed
- Application deadline
- Apply button
- Post author info

---

### **ApplicationManagement.tsx**
**Route:** `/applications/manage` (protected, faculty only)
**Purpose:** Faculty manage received applications
**Components Used:**
- Design/Card - Application cards
- Design/Button - Accept/Reject buttons
- Design/Badge - Status indicators
- Design/Avatar - Applicant avatars
- Design/Grid - Application grid
- Design/Select - Status filter

**Features:**
- View all applications
- Filter by status (Pending/Accepted/Rejected)
- Accept/reject applications
- View applicant profiles
- Sort by date

---

### **Dashboard.tsx**
**Route:** `/dashboard` (protected)
**Purpose:** User dashboard with statistics
**Features:**
- Stats cards (posts, applications, connections)
- Recent activity
- Quick actions
- Notifications summary

---

### **Profile.tsx**
**Route:** `/profile` (protected)
**Purpose:** Current user's profile page
**Features:**
- Profile picture
- Bio
- Skills list (editable)
- Projects showcase
- Achievements
- Edit profile button

**Components Used:**
- ProfileShowcase
- QuickSkillEdit
- Design components (Card, Button, Badge)

---

### **UserProfile.tsx**
**Route:** `/profile/:id` (protected)
**Purpose:** View other user's profile
**Features:** Same as Profile but read-only with "Connect" button

**Used By:** 
- Clicking user avatars
- Search results
- Application applicant view

---

### **StudentRegister.tsx & FacultyRegister.tsx**
**Routes:** `/register/student`, `/register/faculty`
**Purpose:** Registration forms
**Features:**
- Multi-step form
- Email validation (ANITS format)
- Password strength validation
- Department selection
- Skills selection

---

### **LoginNew.tsx**
**Route:** `/login`
**Purpose:** Login form
**Features:** Email, password, remember me, forgot password link

---

### **CreatePostMultiStep.tsx**
**Route:** `/create-post` (protected)
**Purpose:** Create new research/project post
**Features:**
- Step 1: Basic info (title, description, purpose)
- Step 2: Required skills with counts
- Step 3: Additional details (deadline, location)
- Step 4: Review & publish

---

### **Applications.tsx**
**Route:** `/applications` (protected, student)
**Purpose:** Student's submitted applications
**Features:** View status, withdraw application

---

### **AcceptedApplications.tsx**
**Route:** `/applications/accepted` (protected)
**Purpose:** Applications that were accepted
**Components Used:** AuthenticatedNavbar (standalone)

---

### **ChatroomsNew.tsx & ChatroomPage.tsx**
**Routes:** `/chatrooms`, `/chatroom/:id`
**Purpose:** Messaging system
**Features:** Real-time chat, message list, send messages

---

### **Notifications.tsx**
**Route:** `/notifications`
**Purpose:** Notification center
**Types:** Applications, connections, invitations, messages

---

### **Invitations.tsx**
**Route:** `/invitations`
**Purpose:** Faculty invitations to students
**Features:** Send/receive invitations, accept/decline

---

### **RecommendedCandidatesPage.tsx & CandidateProfilePage.tsx**
**Routes:** `/candidates/recommended`, `/candidate/:id`
**Purpose:** AI-recommended candidates for posts
**Features:** Skill matching, send invitations

---

### **UserDiscovery.tsx**
**Route:** `/discover`
**Purpose:** Search and discover users
**Features:** Filter by skills, department, send connections

---

### **PostDetailPage.tsx & PostManagePage.tsx**
**Routes:** `/post/:id`, `/post/:id/manage`
**Purpose:** View/manage individual posts
**Features:** Edit post, view applicants, close post

---

### **Settings.tsx & ProfileSettingsNew.tsx**
**Routes:** `/settings`, `/profile/settings`
**Purpose:** Account and profile settings
**Components Used:** PrivacyControls, Switch, Input

---

### **Forums/** Folder
**Files:** `Forums.tsx`, `ForumThread.tsx`, `CreateThread.tsx`
**Purpose:** Discussion forums
**Routes:** `/forums`, `/forum/:id`, `/forum/create`

---

### **Events/** Folder
**Files:** `EventsList.tsx`, `EventDetails.tsx`, `CalendarView.tsx`
**Purpose:** Events management
**Routes:** `/events`, `/event/:id`, `/calendar`

---

## 🔄 **9. Component Usage Flow**

### **Landing Page Flow:**
```
LandingPageNew.tsx
  └── PublicNavbar
  └── HeroSection
  └── AboutSection
  └── FeaturesSection
  └── WorkflowSection
  └── TestimonialsSection
  └── Footer
```

### **Authenticated Pages Flow:**
```
App.tsx
  └── MainLayout
        └── AuthenticatedNavbar
        └── Outlet (renders page)
              └── Home.tsx
                    └── MUI Components
                    └── ProjectCard (not currently imported but should be)
```

### **Application Workflow:**
```
Home.tsx (see post)
  ↓
Click post
  ↓
OpportunityDetails.tsx
  └── Card, Button, Badge, Avatar, Grid (Design components)
  ↓
Click Apply
  ↓
ApplicationModal (Application component)
  ↓
Faculty sees in ApplicationManagement.tsx
  └── Card, Button, Badge, Avatar, Grid, Select (Design components)
```

---

## 🎯 **10. Key Relationships Summary**

### **Design Components** are used by:
- ✅ OpportunityDetails.tsx
- ✅ ApplicationManagement.tsx
- ✅ All other pages (Button, Card widely used)

### **Landing Components** are used by:
- ✅ LandingPageNew.tsx only

### **Layout Components** are used by:
- ✅ App.tsx (MainLayout, PrivateRoute)
- ✅ All authenticated pages (via MainLayout)

### **Advanced Components** (ProjectCard) should be used by:
- ❌ Currently NOT imported in pages (potential improvement)
- ✅ Should be used in Home.tsx for post cards

### **Application Components** are used by:
- ✅ ProjectDetail.tsx
- ✅ Any page with apply functionality

---

## 📊 **11. Import Patterns**

### **Material-UI (MUI):**
```typescript
import { Box, Container, Typography, Button } from '@mui/material';
```
**Used:** Every page uses MUI components

### **Design System Components:**
```typescript
import { Card, Button, Badge } from '../components/Design/[Component]';
```
**Used:** OpportunityDetails, ApplicationManagement

### **Framer Motion:**
```typescript
import { motion } from 'framer-motion';
```
**Used:** Landing pages, animated pages

### **Lucide Icons:**
```typescript
import { Search, Filter, Users, Calendar } from 'lucide-react';
```
**Used:** Most pages for icons

---

## 🔧 **12. Component Architecture**

### **Presentational Components** (UI Only):
- Design/* components
- Landing/* components
- Stateless, reusable

### **Container Components** (Logic + UI):
- Pages/* files
- Has state, API calls, business logic

### **Layout Components**:
- MainLayout, Navbar
- Wrap other components

### **Feature Components**:
- ProjectCard, ApplicationModal
- Specific functionality

---

## 📝 **13. File Naming Conventions**

- **Components:** PascalCase (e.g., `LazyImage.tsx`, `HeroSection.tsx`)
- **Pages:** PascalCase (e.g., `Home.tsx`, `Dashboard.tsx`)
- **Services:** camelCase (e.g., `authService.ts`)
- **Types:** PascalCase interfaces/types
- **Folders:** PascalCase for component folders

---

## 🎨 **14. Styling Approaches**

### **Emotion (CSS-in-JS):**
```typescript
const Card = styled.div`
  background: white;
  border-radius: 8px;
`
```
**Used by:** Design components, custom styled components

### **Material-UI sx prop:**
```typescript
<Box sx={{ padding: 2, backgroundColor: 'primary.main' }}>
```
**Used by:** Most pages, inline styling

### **CSS files:**
- `design-system.css` - Design tokens
- `globals.css` - Global styles
- **Used by:** Theme setup

---

## 🚀 **15. Performance Optimizations**

### **LazyImage.tsx:**
- ✅ Intersection Observer (load only when visible)
- ✅ Placeholder shimmer animation
- ✅ Prevents layout shift with aspect ratio

### **Code Splitting:**
- ✅ Lazy loading with React.lazy (can be added)
- ✅ Vite automatic code splitting

### **Memoization:**
- ✅ useMemo for expensive calculations
- ✅ useCallback for functions passed as props

---

## 🎯 **Key Takeaways for Code Review**

1. **Design System:** 17 reusable Design components for consistency
2. **Landing Components:** 7 sections for public landing page
3. **Layout:** 3 layout components (MainLayout, Navbar, PrivateRoute)
4. **Advanced:** ProjectCard for post display (underutilized)
5. **Pages:** 40+ page components for all features
6. **Import Pattern:** Mix of MUI (primary) and custom Design components
7. **Styling:** Emotion + MUI sx prop approach
8. **Performance:** LazyImage demonstrates optimization techniques
9. **Architecture:** Clear separation - Design/Landing/Layout/Advanced/Pages

**Total Component Files:** 100+ components across all folders

