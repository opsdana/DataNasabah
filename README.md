# Monitoring App — Template

Template project React 18 + Vite + Tailwind CSS + Supabase dengan fitur login split-layout dan sidebar navigasi siap pakai.

## ⚡ Quick Start

```bash
# Clone template branch
git clone -b template https://github.com/opsdana/DataNasabah.git my-app
cd my-app

# Install dependencies
npm install

# Copy env config
cp .env.example .env.local
# Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY

# Jalankan
npm run dev
```

Buka `http://localhost:3000` — halaman login siap tampil.

## 🗄️ Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan SQL berikut di **SQL Editor**:

```sql
-- Tabel users (Auth + Profile)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama_lengkap VARCHAR(100) NOT NULL,
  kode_unit VARCHAR(10) DEFAULT '001',
  role VARCHAR(30) NOT NULL DEFAULT 'USER'
    CHECK (role IN ('SUPER_ADMIN','ADMIN','USER')),
  jabatan VARCHAR(50),
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: user bisa baca profil sendiri
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Trigger: auto-create profile saat user register
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nama_lengkap, role)
  VALUES (NEW.id, NEW.email, 'USER');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

3. Buka **Authentication → Settings** → enable **Email/Password** provider

## 🎨 Kustomisasi Branding

### Nama & subtitle aplikasi
Edit `src/pages/LoginPage.jsx` — cari komentar `{/* Ganti dengan nama aplikasi Anda */}`

### Warna tema
Edit `tailwind.config.js` — 3 warna brand:
```js
brand: {
  primary: '#...',    // Warna utama (tombol, header)
  secondary: '#...',  // Warna hover/accent
  light: '#...',      // Warna aksen terang
}
```

### Menu sidebar
Edit `src/components/layout/Sidebar.jsx` — array `menuItems`

### Role system
Edit `src/lib/constants.js` — `ROLE`, `ROLE_LABEL`, `ROLE_COLOR`

## 📄 Menambah Halaman Baru

1. Buat file di `src/pages/NamaPage.jsx`
2. Import di `src/App.jsx` dan tambah `<Route>`
3. Tambah menu di `src/components/layout/Sidebar.jsx`

## 📦 Deploy ke GitHub Pages

1. Push ke branch `main`
2. **Settings → Pages → Source** pilih **GitHub Actions**
3. Tambah **Secrets** di Settings → Secrets → Actions:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📦 Deploy ke Cloudflare Pages (alternatif)

```bash
npx wrangler pages deploy dist --project-name=my-app
```

## 🧱 Struktur Project

```
├── public/
├── src/
│   ├── components/
│   │   ├── auth/          # ProtectedRoute
│   │   ├── layout/        # AppShell, Sidebar, Topbar, PageHeader
│   │   └── shared/        # DataTable, StatCard, LoadingSpinner
│   ├── contexts/          # AuthContext (Supabase Auth)
│   ├── lib/               # supabase.js, utils.js, constants.js
│   ├── pages/             # LoginPage, DashboardPage, ...
│   ├── App.jsx            # Router + Route definitions
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind + custom styles
├── .github/workflows/     # Auto-deploy ke GitHub Pages
├── .env.local             # Environment variables (gitignored)
└── vite.config.js         # Vite config dengan @ alias
```

## 🔐 Keamanan

- Auth via Supabase (JWT token, auto-refresh)
- ProtectedRoute untuk halaman yang butuh login
- Role-based menu visibility
- Siap ditambah Row Level Security di Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS 3, Lucide React, Recharts
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Hosting**: GitHub Pages / Cloudflare Pages
