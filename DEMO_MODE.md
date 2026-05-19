# Demo Mode Guide

## Quick Start - No Configuration Required!

You can now run the LeanIX Viewer with **realistic mock data** without any Azure AD or LeanIX OAuth setup.

### Run Demo Locally

```bash
# No .env.local needed!
npm run dev
```

Visit `http://localhost:3000` and you'll be presented with a demo login screen.

### Demo Login

- **Email field**: Enter any email address (e.g., `demo@example.com`, `john.doe@company.com`)
- **Password field**: Any password works (or leave blank)
- Click "Enter Demo Mode"

You'll immediately see the full application with realistic mock data.

## What's Included in Demo Mode

### Mock Data
The demo includes 8 realistic applications with various:
- **Business Criticality**: Mission Critical → Administrative Service
- **Technical Suitability**: Fully Appropriate → Inappropriate
- **Functional Suitability**: Perfect → Insufficient
- **Hosting Types**: On-Premise, SaaS, PaaS, IaaS
- **Migration Strategies**: Retain, Rearchitect, Replatform, Retire

### Pre-built Templates
All 5 templates work with mock data:
- ✅ Application Landscape
- ✅ Technology Stack Analysis
- ✅ Application Portfolio
- ✅ Integration Map
- ✅ Risk Assessment Dashboard

### Custom Report Builder
- ✅ Select any fact sheet type
- ✅ Choose visualization types
- ✅ Build custom reports
- ✅ See mock data populated instantly

### Full Features
- ✅ Complete dashboard
- ✅ Template gallery
- ✅ Report builder
- ✅ Navigation and filtering
- ✅ Demo indicator showing it's not live data

## Demo Data Overview

### Applications (8 total)
- **SAP ERP System** - On-Premise, Mission Critical, Perfect suitability
- **Salesforce CRM** - SaaS, Business Critical, Fully Appropriate
- **Legacy Mainframe** - On-Premise, Mission Critical, Inappropriate (needs rearchitect)
- **Jira** - SaaS, Business Operational
- **Custom Analytics** - PaaS, Business Operational
- **Email & Collaboration** - SaaS, Mission Critical
- **HR System** - SaaS, Business Operational
- **Data Migration Tool** - On-Premise, Administrative, Marked for retirement

### Technology Stacks (6 total)
- Java Spring Boot
- React.js
- PostgreSQL
- Kubernetes
- Apache Kafka
- Next.js

### IT Components (3 total)
- Java Application Server
- Apache Web Server
- Load Balancer

### Business Capabilities (4 total)
- Financial Planning & Analysis
- Customer Relationship Management
- Human Resources Management
- Supply Chain & Procurement

## How Demo Mode Works

When you run the app without Azure AD/LeanIX credentials:

1. **Login Page** shows demo mode notice
2. **Credentials Provider** accepts any email/password
3. **API Routes** detect missing credentials and return mock data
4. **Dashboard** shows demo banner at top
5. **User Profile** tagged with "Demo" indicator
6. **All Features** work exactly like production

## Switching to Production

When you're ready to connect live LeanIX data:

1. Follow the [SETUP.md](SETUP.md) guide
2. Add Azure AD and LeanIX OAuth credentials to `.env.local`
3. Restart `npm run dev`
4. Login page automatically switches to Azure AD authentication
5. Live data replaces mock data
6. Demo banner disappears

## What's This Good For?

Perfect for:
- 🎬 **Demos** - Show stakeholders what the app looks like
- 👥 **Team Discussions** - Visualize what you could build
- 📊 **Mockups** - See how different reports will look
- ✅ **Validating UI** - Test navigation and features
- 📝 **Documentation** - Capture screenshots with realistic data

## Limitations

Demo mode has these constraints:
- Data is static (won't update)
- No drill-down to details (not in mock data)
- No real LeanIX relationships (simplified)
- All users see same mock data
- Can't save or export reports

## Next Steps

Once the admin team sets up Azure AD and LeanIX OAuth:

1. Add `.env.local` with credentials
2. Restart the app
3. Live data automatically loads
4. All mock data switches to real data

No code changes needed!

## Troubleshooting

### Q: Why does it show "Demo Mode"?
**A**: You don't have `LEANIX_OAUTH_CLIENT_ID` and `LEANIX_OAUTH_CLIENT_SECRET` in `.env.local`. This is normal for demoing before admin setup.

### Q: Can I modify mock data?
**A**: Yes! Edit `lib/mockData.ts` to customize the applications, stacks, etc.

### Q: Does demo mode work on Vercel?
**A**: Yes! Deploy as-is and it runs in demo mode on Vercel too. Just don't add the LeanIX/Azure AD env vars.

### Q: What happens when I add real credentials?
**A**: Restart the app and it automatically switches to production mode. Demo mode is only active when credentials are missing.
