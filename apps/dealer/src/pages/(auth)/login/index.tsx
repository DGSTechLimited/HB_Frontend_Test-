import gear1 from "@/assets/images/gear1.png";
import gear2 from "@/assets/images/gear2.png";
import gear3 from "@/assets/images/gear3.png";
import logo from "@/assets/images/logoWhite.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Form, App } from "antd";
import { useLogin } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Login = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const loginMutation = useLogin({
    onSuccess: (data) => {
      message.success(data.message);
      navigate("/");
    },
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="flex w-full h-screen pt-8 px-7 pb-7 bg-gray-100">
      {/* Left Image */}
      <div className="w-1/2 relative bg-[linear-gradient(180.19deg,#F1F1F1_-170.84%,#114086_99.9%)] rounded-2xl pt-12 px-14.5 pb-[121px] flex flex-col justify-between">
        <div className=" flex justify-end">
          <img src={logo} alt="logo" className="w-[140px] h-[37px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden 3xl:hidden block">
          <motion.img
            src={gear1}
            alt="gear1"
            className="absolute bottom-[40%] left-[10%] -translate-x-1/2 opacity-100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.img
            src={gear2}
            alt="gear2"
            className="absolute top-[-10%] left-[10%]  opacity-100"
            animate={{ rotate: 360 }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.img
            src={gear3}
            alt="gear3"
            className="absolute bottom-[30%] right-[-25%]  "
            animate={{ rotate: 360 }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />
        </div>

        <div className="text-white">
          <p className=" text-3xl mb-3.5">Hello,</p>
          <p className=" text-4xl font-medium mb-3">Welcome back!</p>
          <hr />
          <p className="mt-5.5 text-[#FFFFFFB0] text-md">Access your HotBray dealer dashboard to track orders, manage inventory, and update account details.</p>
        </div>

      </div>

      {/* Right Form */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-[70%] mx-auto">
          <p className="text-[32px] font-bold text-center">Sign In</p>
          <p className="mt-2 text-textgray text-center text-lg max-w-[350px] mx-auto">
            Sign in to view orders, manage inventory, and track account activity.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-10! space-y-5"
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Email Address" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Button
              htmlType="submit"
              size="large"
              loading={loginMutation.isPending}
              className="uppercase w-full bg-primary! text-white! h-10 rounded-[52px]! p-3 mb-2.5! mt-[13px]!"
            >
              Login
            </Button>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary!">
                Forgot Password?
              </a>
            </div>
          </Form>

          <div className="mt-10 text-center text-textgray text-sm max-w-[350px] mx-auto">
            <p>
              By signing up for an account you agree to the{" "}
              <span className="text-primary underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-primary underline cursor-pointer">
                Terms of Service.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
