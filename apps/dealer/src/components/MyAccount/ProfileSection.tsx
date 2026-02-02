import { Avatar, Button } from 'antd'
import { BankOutlined, EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { useProfile } from '@/services/auth'


const ProfileSection = () => {

    const { data } = useProfile()
    return (
        <div className="flex w-full flex-col bg-white rounded-xl p-5">
            <div className="flex w-full justify-between items-center pb-3 border-b border-gray-200">
                <div className="flex gap-x-4">
                    <Avatar className='bg-primary! text-white!' size={72}>{data?.data.firstName.charAt(0).toUpperCase()}</Avatar>
                    <div className="flex flex-col justify-center">
                        <span className='text-2xl font-medium'>Hi, {data?.data.firstName}</span>
                        <span className='text-sm text-gray-500 mt-1'>
                            Access and edit your profile information, preferences, and saved details in one place.
                        </span>
                    </div>
                </div>
                <Button icon={<EditOutlined />} onClick={() => { }}>Edit Profile</Button>
            </div>
            <div className="flex gap-x-10 mt-3">
                <div className="flex items-center gap-x-2">
                    <div className="flex bg-primary/10 p-2 rounded-full text-primary">
                        <MailOutlined className='text-base' />
                    </div>
                    <span className='text-base text-neutral-500'>{data?.data.email}</span>
                </div>
                {/* <div className="flex items-center gap-x-2">
                    <div className="flex bg-primary/10 p-2 rounded-full text-primary">
                        <PhoneOutlined className='text-base' />
                    </div>
                    <span className='text-base text-neutral-500'>{data?.data.phone || '-'}</span>
                </div> */}
                <div className="flex items-center gap-x-2">
                    <div className="flex bg-primary/10 p-2 rounded-full text-primary">
                        <BankOutlined className='text-base' />
                    </div>
                    <span className='text-base text-neutral-500'>{data?.data.dealer?.companyName}</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
