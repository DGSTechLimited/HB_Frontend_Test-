import { Layout, Menu, Avatar, Dropdown, Space, App } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined,
  InboxOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLogout, useProfile } from "@/services/auth";
import HotbrayLogo from "@assets/images/HotbrayLogo.png";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = App.useApp();
  const { data: profileData } = useProfile();

  const logoutMutation = useLogout({
    onSuccess: (data) => {
      message.success(data.message);
      window.location.href = "/login";
    },
    onSettled: () => {
      window.location.href = "/login";
    },
  });

  const getUserInitials = () => {
    if (!profileData?.data) return "";
    const { firstName, lastName } = profileData.data;
    const firstInitial = firstName?.[0]?.toUpperCase() || "";
    const lastInitial = lastName?.[0]?.toUpperCase() || "";
    return lastInitial ? `${firstInitial}${lastInitial}` : firstInitial;
  };

  const menuItems: MenuProps["items"] = [
    {
      type: "group",
      label: (
        <span className="text-xs text-gray-500 uppercase font-medium">
          MAIN MENU
        </span>
      ),
      children: [
        {
          key: "/",
          icon: <AppstoreOutlined />,
          label: "Dashboard",
        },
        {
          key: "/dealers",
          icon: <TeamOutlined />,
          label: "Dealer Registry",
        },
        {
          key: "/order-logs",
          icon: <InboxOutlined />,
          label: "Order Logs",
        },
      ],
    },
    {
      type: "group",
      label: (
        <span className="text-xs text-gray-500 uppercase font-medium">
          ADMIN PANEL
        </span>
      ),
      children: [
        {
          key: "/user-management",
          icon: <SettingOutlined />,
          label: "User Management",
        },
        {
          key: "/content-management",
          icon: <EditOutlined />,
          label: "Content Management",
        },
      ],
    },
  ];

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

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        className="fixed left-0 top-0 bottom-0 h-screen overflow-auto bg-white"
        width={250}
        theme="light"
        style={{ borderRight: "1px solid #f0f0f0" }}
      >
        <div className="flex items-center justify-start h-16 px-6 border-b border-gray-100">
          <img
            src={HotbrayLogo}
            alt="Hotbray Logo"
            className="h-[27px] w-[102px]"
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="
          border-r-0
          pt-4
          sidebar-menu

          [&_.ant-menu-item]:relative
          [&_.ant-menu-item]:transition-colors
          [&_.ant-menu-item]:duration-300
          [&_.ant-menu-item]:ease-out

          [&_.ant-menu-item-selected]:bg-[rgba(12,67,148,0.1)]
          [&_.ant-menu-item-selected]:text-[#0C4394]

          [&_.ant-menu-item-selected::after]:content-['']
          [&_.ant-menu-item-selected::after]:absolute
          [&_.ant-menu-item-selected::after]:right-0
          [&_.ant-menu-item-selected::after]:top-0
          [&_.ant-menu-item-selected::after]:h-full
          [&_.ant-menu-item-selected::after]:w-[1px]
          [&_.ant-menu-item-selected::after]:bg-[#0C4394]

          [&_.ant-menu-item-selected_.anticon]:text-[#0C4394]

          [&_.ant-menu-item:hover]:bg-[rgba(12,67,148,0.06)]
        "
          style={{ backgroundColor: "transparent" }}
        />
      </Sider>
      <Layout >
        <Header
          className="bg-white! px-4 flex items-center justify-end sticky top-0 z-10"
          style={{ borderBottom: "1px solid #f0f0f0" }}
        >
          <div className="flex items-center gap-4">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="text-primary! bg-[#ced9e9]!">{getUserInitials() || <UserOutlined />}</Avatar>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-4 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="bg-white rounded-lg p-6 min-h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export { MainLayout };
