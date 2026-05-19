# LeanIX Viewer - Setup Guide

Complete step-by-step guide to get the application running locally and deployed to Vercel.

## Prerequisites

- Node.js 18+ and npm
- Azure AD tenant access
- LeanIX instance access at `syensqo.leanix.net/SyensqoLive`
- Vercel account (for production deployment)

## Phase 1: Local Development Setup

### Step 1: Install Dependencies

```bash
cd /Users/owenpettiford/Documents/Claude\ Dev/leanix-viewer
npm install
```

### Step 2: Azure AD Configuration

#### 2a. Create App Registration in Azure

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory → App registrations**
3. Click **New registration**
4. Configure:
   - **Name**: `LeanIX Viewer`
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: `Web` → `http://localhost:3000/api/auth/callback/azure-ad`
5. Click **Register**

#### 2b. Configure Credentials

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Copy the secret value (you'll need it for `.env.local`)
4. Go to **Overview** and copy:
   - **Application (client) ID** → `AZURE_AD_CLIENT_ID`
   - **Directory (tenant) ID** → `AZURE_AD_TENANT_ID`

### Step 3: LeanIX OAuth Configuration

#### 3a. Create OAuth Client in LeanIX

1. Go to [LeanIX Admin](https://syensqo.leanix.net/admin)
2. Navigate to **Integration → OAuth 2.0 Clients**
3. Click **Create Client**
4. Configure:
   - **Name**: `Viewer App`
   - **Client Type**: `Confidential`
   - **Redirect URIs**: `http://localhost:3000/api/auth/callback/leanix`
5. Copy:
   - **Client ID** → `LEANIX_OAUTH_CLIENT_ID`
   - **Client Secret** → `LEANIX_OAUTH_CLIENT_SECRET`

### Step 4: Create Environment Variables

```bash
# Copy example file
cp .env.local.example .env.local

# Generate NextAuth secret
openssl rand -base64 32
# Copy the output to NEXTAUTH_SECRET in .env.local
```

#### Complete `.env.local` with:

```env
# Azure AD
AZURE_AD_CLIENT_ID=<from Azure Portal>
AZURE_AD_CLIENT_SECRET=<from Azure Portal>
AZURE_AD_TENANT_ID=<from Azure Portal>

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated value from openssl>

# LeanIX
LEANIX_OAUTH_CLIENT_ID=<from LeanIX Admin>
LEANIX_OAUTH_CLIENT_SECRET=<from LeanIX Admin>
LEANIX_BASE_URL=https://syensqo.leanix.net
```

### Step 5: Run Development Server

```bash
npm run dev
```

The app should be available at `http://localhost:3000`

### Step 6: Test Login

1. Navigate to `http://localhost:3000`
2. Click "Sign in with Microsoft"
3. Log in with your Syensqo Azure AD account
4. You should be redirected to the dashboard
5. Try clicking on a report template to fetch LeanIX data

## Phase 2: Production Deployment to Vercel

### Step 1: Create Vercel Project

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow the prompts to create a new project.

### Step 2: Update Azure AD Configuration

1. Go to [Azure Portal](https://portal.azure.com)
2. Find the app registration you created
3. Go to **Authentication**
4. Add **Redirect URI**: `https://your-project.vercel.app/api/auth/callback/azure-ad`
5. Update `NEXTAUTH_URL` in Vercel

### Step 3: Update LeanIX OAuth Configuration

1. Go to [LeanIX Admin](https://syensqo.leanix.net/admin)
2. Edit the OAuth client you created
3. Update **Redirect URIs**: `https://your-project.vercel.app/api/auth/callback/leanix`

### Step 4: Set Environment Variables in Vercel

Go to your Vercel project dashboard:
1. **Settings → Environment Variables**
2. Add all variables from `.env.local`:
   - `AZURE_AD_CLIENT_ID`
   - `AZURE_AD_CLIENT_SECRET`
   - `AZURE_AD_TENANT_ID`
   - `NEXTAUTH_URL` (production URL)
   - `NEXTAUTH_SECRET` (same as local)
   - `LEANIX_OAUTH_CLIENT_ID`
   - `LEANIX_OAUTH_CLIENT_SECRET`
   - `LEANIX_BASE_URL`

### Step 5: Deploy

```bash
# From the project directory
vercel --prod
```

Your app is now live at `https://your-project.vercel.app`

## Verification Checklist

### Local Development
- [ ] `npm run dev` starts without errors
- [ ] `http://localhost:3000` loads the login page
- [ ] Azure AD login works
- [ ] Dashboard loads after login
- [ ] Templates gallery loads
- [ ] Clicking a template fetches data from LeanIX
- [ ] Custom report builder is accessible
- [ ] Environment variables are loaded correctly

### Production Deployment
- [ ] Vercel deployment completes successfully
- [ ] Login redirects work correctly
- [ ] Azure AD SSO works with production URL
- [ ] LeanIX data is fetched successfully
- [ ] No console errors in browser developer tools
- [ ] Performance is acceptable for your team size

## Troubleshooting

### Issue: "Invalid Client" Error

**Solution**:
- Verify client ID and secret match Azure AD/LeanIX settings
- Check Redirect URIs are correct (http for local, https for prod)
- Regenerate secrets if needed

### Issue: LeanIX Data Not Loading

**Solution**:
- Verify `LEANIX_BASE_URL` is correct
- Check OAuth credentials in LeanIX admin
- Verify GraphQL queries in templates are valid
- Check browser console for error details

### Issue: Session Expires Immediately

**Solution**:
- Verify `NEXTAUTH_SECRET` is set and consistent
- Check `NEXTAUTH_URL` matches your domain
- Review JWT expiry settings in `lib/auth.ts`

### Issue: Deployment Fails

**Solution**:
- Check all environment variables are set in Vercel
- Verify no secrets are missing
- Review build logs in Vercel dashboard
- Ensure Node.js version is compatible (18+)

## Next Steps

1. **Add Team Members**:
   - Add their emails to Azure AD group
   - They can log in immediately

2. **Customize Templates**:
   - Edit `lib/templates.ts` to modify pre-built reports
   - Add custom GraphQL queries

3. **Performance Optimization**:
   - Monitor Vercel analytics
   - Adjust React Query cache settings
   - Consider pagination for large datasets

4. **Enhance Visualizations**:
   - Install Recharts for charts: `npm install recharts`
   - Implement visualization components
   - Add drill-down interactions

## Support Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [LeanIX API Documentation](https://leanix.net/developers)
- [Azure AD Documentation](https://docs.microsoft.com/en-us/azure/active-directory)
