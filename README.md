# LeanIX Viewer

An interactive, secure LeanIX reporting application built with Next.js, deployed on Vercel. Allows Syensqo employees to authenticate via Azure AD SSO and create dynamic reports with drill-down capabilities.

## Features

- **Azure AD Single Sign-On** - Secure corporate authentication
- **LeanIX OAuth Integration** - Seamless access to LeanIX data
- **Pre-built Report Templates**:
  - Application Landscape Overview
  - Technology Stack Analysis
  - Application Portfolio
  - Integration Map
  - Risk Assessment Dashboard
- **Custom Report Builder** - Create dynamic reports with flexible filtering and visualization
- **Interactive Drill-down** - Explore data hierarchically with contextual filtering
- **Secure Session Management** - Automatic token refresh and secure storage

## Tech Stack

- **Frontend**: Next.js 15 (React 19) with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query) for data caching
- **Authentication**: NextAuth.js with Azure AD provider
- **API**: LeanIX GraphQL + Next.js API routes
- **Hosting**: Vercel

## Setup

### 1. Clone and Install

```bash
git clone [repo-url]
cd leanix-viewer
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

#### Azure AD Configuration

1. Go to [Azure Portal](https://portal.azure.com)
2. Create an application registration for "LeanIX Viewer"
3. Add a Redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
4. Copy:
   - Client ID → `AZURE_AD_CLIENT_ID`
   - Client Secret → `AZURE_AD_CLIENT_SECRET`
   - Tenant ID → `AZURE_AD_TENANT_ID`

#### LeanIX OAuth Configuration

1. Go to [LeanIX Administration](https://syensqo.leanix.net/admin)
2. Create an OAuth 2.0 Client:
   - Redirect URI: `http://localhost:3000/api/auth/callback/leanix`
   - Scopes: `read:fact-sheets`
3. Copy:
   - Client ID → `LEANIX_OAUTH_CLIENT_ID`
   - Client Secret → `LEANIX_OAUTH_CLIENT_SECRET`

#### NextAuth Configuration

```bash
# Generate a secure secret
openssl rand -base64 32
# Copy the output to NEXTAUTH_SECRET in .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and log in with your Azure AD account.

## Project Structure

```
app/
├── api/
│   ├── auth/[...nextauth]/    # NextAuth configuration
│   └── leanix/                # LeanIX proxy endpoint
├── auth/
│   └── signin/                # Azure AD login page
├── templates/
│   ├── page.tsx               # Template gallery
│   └── [id]/page.tsx          # Individual template viewer
├── builder/                   # Custom report builder
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Dashboard/home page
└── providers.tsx              # NextAuth + React Query setup

lib/
├── auth.ts                    # NextAuth configuration
├── leanix.ts                  # LeanIX GraphQL client
├── queries.ts                 # Pre-built GraphQL queries
└── templates.ts               # Report template definitions

types/
└── leanix.ts                  # TypeScript types for LeanIX objects

hooks/
└── useApplications.ts         # React Query hooks for data fetching
```

## Usage

### View Pre-built Templates

1. Navigate to "Report Templates" from the dashboard
2. Click any template to view the report
3. Data is fetched from LeanIX and displayed

### Create a Custom Report

1. Click "Create Custom Report" from dashboard
2. Configure:
   - Report name
   - Fact sheet type (Applications, IT Components, etc.)
   - Visualization type (Table, Bar Chart, Pie Chart, etc.)
3. Click "Build Report" to fetch and display data

## Development

### Adding a New Template

1. Edit `lib/templates.ts`
2. Add a new template to the `TEMPLATES` object with:
   - Unique ID
   - GraphQL query
   - Configuration (chart type, fact sheet type, etc.)
3. Template will appear in the gallery automatically

### Adding a New Hook

Create a new hook in `hooks/useXxx.ts` following the pattern in `useApplications.ts`:

```typescript
export function useMyFactSheets() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ['my-fact-sheets'],
    queryFn: async () => {
      // Fetch from /api/leanix
    },
    enabled: !!session?.leanixAccessToken,
  });
}
```

## Security Considerations

- ✅ All routes require Azure AD authentication via middleware
- ✅ LeanIX tokens stored only in httpOnly cookies
- ✅ API proxy validates session before forwarding requests
- ✅ CORS restricted to same origin
- ✅ Input validation on all user-provided filters
- ✅ No sensitive data logged in errors

## Deployment to Vercel

### 1. Prepare for Production

Update environment variables:
```bash
NEXTAUTH_URL=https://your-leanix-viewer.vercel.app
NEXTAUTH_SECRET=[secure-random-value]
```

Azure AD Redirect URI: `https://your-leanix-viewer.vercel.app/api/auth/callback/azure-ad`

### 2. Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel
```

### 3. Set Vercel Environment Variables

In Vercel project settings, add all `.env.local` variables.

## Troubleshooting

### "Unauthorized" Error

- Check `.env.local` variables are set correctly
- Verify LeanIX OAuth credentials
- Check Azure AD app registration

### "Failed to fetch from LeanIX"

- Verify LeanIX server is accessible
- Check LeanIX OAuth client credentials
- Review GraphQL query syntax

## License

Proprietary - Syensqo Internal Use Only
