import React from 'react'
import { ClockIcon } from '@/components/Icons/ClockIcon'
import { TruckIcon } from '@/components/Icons/TruckIcon'
import { MessageIcon } from '@/components/Icons/MessageIcon'
import { SupportIcon } from '@/components/Icons/SupportIcon'
import logo from '@assets/images/HotbrayLogo.png'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, type MenuProps } from "antd";
import { useLogout } from "@/services/auth";
import { useCartCount } from "@/services/cart";


const menuItems = [
  {
    label: 'Dashboard',
    key: '/',
  },
  {
    label: 'Search Parts',
    key: '/search',
  },
  {
    label: 'Exclusive Parts',
    key: '/exclusive',
  },
  {
    label: 'News & Offers',
    key: '/new-stocks-offers',
  },
  {
    label: 'Resources',
    key: '/resources',
  },
]

const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()

  const logoutMutation = useLogout({
    onSuccess: () => {
      window.location.href = "/login";
    },
    onSettled: () => {
      window.location.href = "/login";
    },
  });

  // Get cart count
  const { data: cartCountData } = useCartCount()
  const cartCount = cartCountData?.data.count || 0


  const handleOpenCart = () => {
    searchParams.set('cart', 'true')
    setSearchParams(searchParams)
  }


  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className='sticky top-0 z-40 header-shell'>
      <div className="flex w-full py-2 header-topbar">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            <div className="flex items-center gap-x-2">
              <ClockIcon width={20} height={20} />
              <span className='text-sm font-medium header-topbar__text'>Open 24/7</span>
            </div>
            <div className="flex items-center gap-x-2">
              <TruckIcon width={24} height={24} />
              <span className='text-sm font-medium header-topbar__text'>Fast Shipping & Delivery</span>
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex items-center gap-x-2">
              <MessageIcon width={24} height={24} />
              <span className='text-sm font-medium header-topbar__text'>hotbray08@gmail.com</span>
            </div>
            <div className="flex items-center gap-x-2">
              <SupportIcon width={20} height={20} />
              <span className='text-sm font-medium header-topbar__text'>hotbray08@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex container mx-auto justify-between items-center py-4">
        <div className="flex items-center gap-4">
          <img width={156} height={41} src={logo} alt="logo" className='h-10 w-auto logo-clean' />
        </div>
        <div className="flex gap-x-6 items-center">
          {menuItems.map((item) => (
            <Link
              className="nav-link"
              data-active={location.pathname === item.key}
              key={item.key}
              to={item.key}
            >
              <span className="nav-link__label">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex gap-x-5 items-center">
          <div onClick={handleOpenCart} className="flex cursor-pointer">
            <Badge size='small' styles={{
              indicator: {
                backgroundColor: '#FF8A3D',
              }
            }} count={cartCount} >
              <ShoppingCartOutlined className='text-2xl! text-slate-900 cart-icon' />
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
