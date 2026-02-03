import ProfileSection from './ProfileSection'
import OrderStatsCards from './OrderStatsCards'
import RecentOrdersTable from './RecentOrdersTable'

const MyAccount = () => {



    return (
        <div className='container mx-auto py-8 flex flex-col gap-y-5'>
            <div className="profile-welcome-section">
                <ProfileSection />
            </div>

            <OrderStatsCards />

            <RecentOrdersTable
            />
        </div>
    )
}

export default MyAccount
