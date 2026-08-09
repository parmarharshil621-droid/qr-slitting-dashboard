QR Slitting Dashboard
1. Keep index.html, style.css and app.js together.
2. Open index.html through a web host (Netlify/GitHub Pages/etc.). Some browsers block local JS modules; hosting is recommended.
3. Public QR URL should point to the hosted index.html.
4. Admin uses Supabase Authentication email/password.
5. Publishable key is intentionally in app.js. Never put the Supabase secret/service_role key in frontend code.
6. RLS policy in Supabase controls who can read/write jobs.
