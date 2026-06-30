import { useAuth } from '@/contexts/AuthContext'
import { ROLE_LABEL, ROLE_COLOR } from '@/lib/constants'
import { cn } from '@/lib/utils'
import AppShell from '@/components/layout/AppShell'
import PageHeader from '@/components/layout/PageHeader'
import StatCard from '@/components/shared/StatCard'
import { Users, TrendingUp, Activity, Shield } from 'lucide-react'

/* === Template Dashboard ===
   Halaman dashboard skeleton. Ganti dengan data dan chart sesuai kebutuhan.
   StatCard menerima props: title, value, icon, trend (opsional), color (opsional).
*/

export default function DashboardPage() {
  const { profile } = useAuth()

  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        description={`Selamat datang, ${profile?.nama_lengkap || 'User'}`}
      />

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Data"
          value="0"
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="Item Aktif"
          value="0"
          icon={Shield}
          color="green"
        />
        <StatCard
          title="User Terdaftar"
          value="0"
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Pertumbuhan"
          value="0%"
          icon={TrendingUp}
          trend="up"
          color="orange"
        />
      </div>

      {/* Role Info Badge */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Info Sesi</h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>Role:</span>
          <span className={cn(
            'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
            ROLE_COLOR[profile?.role]
          )}>
            {ROLE_LABEL[profile?.role] || profile?.role}
          </span>
          <span className="text-gray-400">|</span>
          <span>Unit: {profile?.kode_unit || '-'}</span>
        </div>
      </div>

      {/* === TAMBAH CHART / TABEL DI SINI === */}
    </AppShell>
  )
}
