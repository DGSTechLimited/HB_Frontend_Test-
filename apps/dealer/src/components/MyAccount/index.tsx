import ProfileSection from './ProfileSection'
import RecentOrdersTable from './RecentOrdersTable'
import DashboardHero from '@/components/DashboardHero'
import QuickActions from './QuickActions'

const MyAccount = () => {



    return (
        <div className="flex flex-col gap-6">
            <DashboardHero />
            <div className="container mx-auto flex flex-col gap-6 pb-10 pt-6">
                <div className="profile-welcome-section">
                    <ProfileSection />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 shadow-sm backdrop-blur">
                            Quick Actions
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">Manage orders faster</h2>
                    </div>
                </div>

                <QuickActions />

                <RecentOrdersTable />
            </div>
        </div>
    )
}

export default MyAccount
