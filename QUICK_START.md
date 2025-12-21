# Quick Start Guide - User Registration & Website Creation

**Ready to test in:** 10 minutes  
**Last Updated:** December 20, 2025

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Run Database Migration (2 min)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your MagicWRX project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of this file:
   ```
   supabase/migrations/001_create_sites_tables.sql
   ```
6. Paste into the SQL Editor
7. Click **Run** (bottom right)
8. Wait for "Success. No rows returned"

### Step 2: Install Enhanced Dashboard (1 min)

```bash
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX
cd src/app/dashboard
mv page.tsx page.backup.tsx
cp enhanced-page.tsx page.tsx
cd ../../..
```

### Step 3: Start Development Server (1 min)

```bash
npm install  # if needed
npm run dev
```

✅ **You're ready!**

---

## 🧪 Test the Features (5 minutes)

### Test 1: User Registration (2 min)

1. Open http://localhost:3000/onboarding
2. Fill in account details:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
3. Click **Continue →**
4. Fill in business info:
   - Company: Test Company
   - Industry: Technology (or any)
5. Click **Continue →**
6. Select **Business** template
7. Leave site name blank (will use company name)
8. Click **Complete Setup →**
9. Wait for success message
10. Verify redirect to dashboard

**Expected Result:** ✅ Dashboard shows 1 site called "Test Company"

### Test 2: Dashboard Features (2 min)

**View Site Stats:**
- Total Sites: 1
- Published: 0 (site starts as draft)
- Drafts: 1
- Plan: Free

**Publish Site:**
1. Find your site card
2. Click **🚀 Publish** button
3. Status changes to "Live" (green badge)
4. Click **🔗 View** button
5. New tab opens to your subdomain

**Expected Result:** ✅ Site accessible at `test-company-xxxxx.magicwrx.com`

**Create Second Site (Test Limits):**
1. Click **+ Create New Site** button
2. You should see error: "Site limit reached"
3. See "Upgrade to Add More" button

**Expected Result:** ✅ Free tier limit enforced (1 site max)

### Test 3: Google OAuth (1 min)

1. Log out
2. Go to /onboarding
3. Click **Continue with Google**
4. Complete Google sign-in
5. Should redirect back and continue to business step

**Expected Result:** ✅ OAuth flow works, profile created

---

## 📊 Verify Database Tables

Check these tables exist in Supabase:

```sql
-- In Supabase SQL Editor
SELECT * FROM user_profiles LIMIT 5;
SELECT * FROM sites LIMIT 5;
SELECT * FROM pages LIMIT 5;
SELECT * FROM site_analytics LIMIT 5;
```

**Expected Result:** All queries return data without errors

---

## 🐛 Quick Troubleshooting

### Issue: "Profile not found"
**Fix:** Run this in Supabase SQL Editor:
```sql
SELECT * FROM user_profiles WHERE id = (SELECT id FROM auth.users LIMIT 1);
-- If empty, the trigger didn't fire. Manually create:
INSERT INTO user_profiles (id, display_name, role)
VALUES ((SELECT id FROM auth.users LIMIT 1), 'Test User', 'user');
```

### Issue: "Cannot create site"
**Fix:** Check site limit:
```sql
SELECT sites_limit FROM user_profiles 
WHERE id = (SELECT id FROM auth.users LIMIT 1);
-- If 0 or NULL, update:
UPDATE user_profiles SET sites_limit = 1 
WHERE id = (SELECT id FROM auth.users LIMIT 1);
```

### Issue: Dashboard shows old version
**Fix:** 
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Build errors
**Fix:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎯 Success Criteria

✅ **All systems working if:**

- [x] User can register at /onboarding
- [x] Profile automatically created in user_profiles table
- [x] First site created during onboarding
- [x] Dashboard displays the site
- [x] Publish button changes site status
- [x] Published site accessible via subdomain
- [x] Cannot create more than 1 site on free tier
- [x] All database queries return without errors

---

## 📞 Need Help?

**Check documentation:**
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Full implementation details
- [USER_REGISTRATION_IMPLEMENTATION.md](./docs/USER_REGISTRATION_IMPLEMENTATION.md) - Complete guide

**Common issues:**
1. RLS policies blocking queries → Check Supabase logs
2. User not authenticated → Clear cookies, try again
3. Site limit errors → Check user_profiles.sites_limit value
4. Pages not created → Check pages table for site_id

**Still stuck?**
- Check Supabase logs in Dashboard → Logs → Postgres Logs
- Check browser console for JavaScript errors
- Check terminal for build/runtime errors

---

## 🚀 Ready for Production?

Before deploying:

1. **Test all features locally** ✅
2. **Run migration on production Supabase** ⚠️
3. **Set production environment variables** ⚠️
4. **Test with real Google OAuth** ⚠️
5. **Create test accounts for each tier** ⚠️
6. **Verify RLS policies work** ⚠️
7. **Check subdomain routing** ⚠️

Then:
```bash
./deploy.sh
# Or push to GitHub → Vercel auto-deploys
```

---

## 🎉 Next Steps

Once everything works:

**Phase 2B - Site Builder** (Next Sprint)
- Build drag-and-drop editor
- Add theme customization
- Create page management
- Implement site settings

**See:** [MAGICWRX_ROADMAP.md](../../../DOCs/MAGICWRX/MAGICWRX_ROADMAP.md) for full roadmap

---

**Estimated Setup Time:** 10 minutes  
**Estimated Testing Time:** 5 minutes  
**Total Time to Live System:** 15 minutes

**Let's build! 🚀**
