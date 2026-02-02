import { Link, Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Cart from "@/components/Cart";
import { Drawer } from "antd";
import Footer from "./Footer";


const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isCartOpen = searchParams.get('cart') === 'true'

  const handleOpenCart = () => {
    searchParams.delete('cart')
    setSearchParams(searchParams)
  }

  return (
    <div className="flex flex-col w-full max-w-[100vw]">
      <Header />
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
      <Footer />


      <Drawer closeIcon={false} title={<div className="flex w-full justify-between items-center">
        <span className="text-base! font-medium leading-0">Your Cart</span>
        <Link to="/cart">
          <span className="text-sm! text-primary underline underline-offset-2 font-normal">View all</span>
        </Link>
      </div>} open={isCartOpen} onClose={handleOpenCart}>
        <Cart />
      </Drawer>
    </div>
  );
};

export { MainLayout };
