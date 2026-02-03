import { Link, Outlet, useSearchParams } from "react-router-dom";
import Header from "./Header";
import Cart from "@/components/Cart";
import { Drawer } from "antd";
import Footer from "./Footer";
import PageTransition from "@/components/PageTransition";


const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isCartOpen = searchParams.get('cart') === 'true'

  const handleOpenCart = () => {
    searchParams.delete('cart')
    setSearchParams(searchParams)
  }

  return (
    <div className="flex flex-col w-full max-w-[100vw]">
      <PageTransition />
      <Header />
      <section className="marquee-shell">
        <div className="marquee-edge marquee-edge--left" />
        <div className="marquee-edge marquee-edge--right" />
        <div className="marquee-track">
          <div className="marquee-content">
            Jaguar Spare Parts • Range Rover Spare Parts • OEM Quality • Genuine Parts • Fast Shipping • Premium Aftermarket
          </div>
          <div className="marquee-content" aria-hidden="true">
            Jaguar Spare Parts • Range Rover Spare Parts • OEM Quality • Genuine Parts • Fast Shipping • Premium Aftermarket
          </div>
        </div>
      </section>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
      <Footer />


      <Drawer
        closeIcon={false}
        className="cart-drawer"
        title={
          <div className="flex w-full justify-between items-center cart-drawer__header">
            <span className="text-base! font-semibold leading-0 text-[#0B1220]">Your Cart</span>
            <Link to="/cart">
              <span className="text-sm! text-primary underline underline-offset-2 font-normal cart-drawer__viewall">View all</span>
            </Link>
          </div>
        }
        open={isCartOpen}
        onClose={handleOpenCart}
      >
        <Cart />
      </Drawer>
    </div>
  );
};

export { MainLayout };
