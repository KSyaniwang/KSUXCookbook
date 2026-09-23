# CS handoff setup

The CS form uses an invisible Supabase anonymous session, so CS does not need an
email or password. Only `yani.wang@koreanskincare.com` can open History or
download evidence.

## 1. Create the database and private bucket

In Supabase Dashboard, open **SQL Editor**, paste all of `setup.sql`, and run it.

The script creates the tables, private storage bucket, access policies, and adds
the approved History email.

## 2. Enable anonymous uploads

In **Authentication → Providers**, enable anonymous sign-ins. CS uploaders will
not see a login screen; Supabase creates the upload session in the background.

## 3. Configure email redirects

In **Authentication → URL Configuration**, add the final Vercel Customer
Service page URL to the redirect allow list. This lets the private History
sign-in link return to the page.
