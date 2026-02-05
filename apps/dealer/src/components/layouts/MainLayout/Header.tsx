import React, { useEffect, useState } from 'react'
import logo from '@assets/images/HotbrayLogo.png'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, type MenuProps } from "antd";
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
  const [isScrolled, setIsScrolled] = useState(false);
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
      key: "orders",
      icon: <InboxOutlined />,
      label: "Orders",
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 header-shell ${isScrolled ? "header-shell--scrolled" : ""}`}>
      <div className="header-topbar">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <span>Open 24/7</span>
            <span className="text-slate-300">|</span>
            <span>Fast Shipping & Delivery</span>
            <span className="text-slate-300">|</span>
            <span>Genuine OEM</span>
          </div>
          <div className="hidden items-center gap-3 text-[0.7rem] text-slate-500 md:flex">
            <span>Support: hotbray08@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container mx-auto grid grid-cols-1 items-center gap-4 px-6 lg:grid-cols-[1fr_auto_1fr] lg:h-16">
          <div className="flex items-center justify-start gap-3">
            <img width={156} height={41} src={logo} alt="logo" className='h-10 w-auto logo-clean' />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:flex-nowrap">
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

          <div className="flex flex-wrap items-center justify-end gap-3 lg:flex-nowrap">
            <div className="flex items-center gap-3">
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <button
                  type="button"
                  className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                  aria-label="Account menu"
                >
                  <UserOutlined className="text-slate-500" />
                  <span className="hidden sm:inline">Priya</span>
                  <DownOutlined className="text-slate-400" />
                </button>
              </Dropdown>

              <button
                type="button"
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <InboxOutlined className="text-slate-500" />
                Orders
              </button>

              <div
                className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                onClick={handleOpenCart}
              >
                <Badge size='small' styles={{
                  indicator: {
                    backgroundColor: '#FF8A3D',
                  }
                }} count={cartCount} >
                  <ShoppingCartOutlined className='text-xl! text-slate-900 cart-icon' />
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
