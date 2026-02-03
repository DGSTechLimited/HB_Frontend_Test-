import { Avatar, Button } from 'antd'
import { BankOutlined, EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useProfile } from '@/services/auth'


const ProfileSection = () => {

    const { data } = useProfile()
    return (
        <div className="profile-welcome-card">
            <div className="profile-welcome-card__accent" />
            <div className="profile-welcome-card__body">
                <div className="flex w-full justify-between items-center pb-3 border-b border-gray-200">
                    <div className="flex gap-x-4">
                        <Avatar className='bg-primary! text-[#0B1220]! profile-avatar' size={72}>{data?.data.firstName.charAt(0).toUpperCase()}</Avatar>
                        <div className="flex flex-col justify-center">
                            <span className='profile-welcome-card__title'>Hi, {data?.data.firstName}</span>
                            <span className='profile-welcome-card__subtitle'>
                                Access and edit your profile information, preferences, and saved details in one place.
                            </span>
                        </div>
                    </div>
                    <Button icon={<EditOutlined />} onClick={() => { }} className="profile-edit-btn">Edit Profile</Button>
                </div>
                <div className="flex gap-x-10 mt-3">
                    <div className="flex items-center gap-x-2">
                        <div className="flex p-2 rounded-full profile-icon-bg">
                            <MailOutlined className='text-base profile-icon' />
                        </div>
                        <span className='profile-welcome-card__meta'>{data?.data.email}</span>
                    </div>
                {/* <div className="flex items-center gap-x-2">
                    <div className="flex bg-primary/10 p-2 rounded-full text-primary">
                        <PhoneOutlined className='text-base' />
                    </div>
                    <span className='text-base text-neutral-500'>{data?.data.phone || '-'}</span>
                </div> */}
                    <div className="flex items-center gap-x-2">
                        <div className="flex p-2 rounded-full profile-icon-bg">
                            <BankOutlined className='text-base profile-icon' />
                        </div>
                        <span className='profile-welcome-card__meta'>{data?.data.dealer?.companyName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
