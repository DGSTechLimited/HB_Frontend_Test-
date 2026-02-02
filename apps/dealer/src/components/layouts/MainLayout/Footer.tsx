
import logo from '@/assets/images/logoWhite.png'
import linkedin from '@/components/Icons/linkedin.png'
import twitter from '@/components/Icons/twitter.png'
import instagram from '@/components/Icons/instagram.png'
const Footer = () => {
    const socialMedia = [
        {
            name: 'LinkedIn',
            icon: linkedin,
        },
        {
            name: 'Twitter',
            icon: twitter,
        },
        {
            name: 'Instagram',
            icon: instagram,
        }
    ]
    return (
        <div className='pt-10 bg-gray-700 w-full  bottom-0 px-20 pb-16.5 flex flex-col justify-end'>
            <div>
                <div className=' flex justify-between pb-4'>
                    <img src={logo} alt="logo" className='h-10' />
                    <p className=' font-light text-[#FFFFFFB2] text-sm'>@ 2023 Hotbray. <br />
                        All Rights Reserved. </p>
                </div>
                <hr className=' pb-8.5 border-t-[#FFFFFFB2]' />
                <div className=' flex justify-between'>
                    <div className='flex gap-5'>
                        {socialMedia.map((item) => (
                            <p key={item.name} className=' text-sm text-[#FFFFFF94] flex items-center gap-3'><img src={item.icon} alt={item.name} className=' w-4 h-4' />{item.name}</p>
                        ))}
                    </div>
                    <div className='flex gap-5'>
                        <p className=' text-sm text-white border-r border-r-[#FFFFFF40] pr-5 '>Terms & Conditions</p>

                        <p className=' text-sm text-white'>Privacy Policy</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer