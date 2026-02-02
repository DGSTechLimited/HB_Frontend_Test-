import { Button, Input, Form, App } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useLogin } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import loginBg from "@assets/images/loginBg.png";
import HotbrayLogo from "@assets/images/HotbrayLogo.png";

const Login = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const loginMutation = useLogin({
    onSuccess: (data) => {
      // Cookie is automatically set by backend (HTTP-only)
      message.success(data.message);
      navigate("/");
    },
    // Global error handler will show error messages
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    loginMutation.mutate(values);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(
            148.66deg,
            rgba(241, 241, 241, 0.8) 31.15%,
            rgba(126, 155, 193, 0.8) 379.34%,
            rgba(15, 71, 144, 0.8) 546.04%
          ),
          url(${loginBg})
        `,
        backgroundSize: "contain",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-15">
        <img src={HotbrayLogo} alt="Hotbray Logo" width={160} height={50} />
        <div className="w-[375px] bg-[#FAFAFA] border border-[#E9E9E9] rounded-2xl px-6 py-8">
          <p className="text-xl font-bold">Welcome back!</p>
          <p className="mt-2.5 text-base text-gray-500">
            Sign in to manage HotBray operations securely.
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4.5! space-y-5!"
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
              type="primary"
              htmlType="submit"
              size="large"
              loading={loginMutation.isPending}
              className="w-full h-10! rounded-[52px]! mb-2.5!"
            >
              Login
            </Button>
            <div className="flex justify-end">
              <a href="#" className="text-sm text-primary!">
                Forgot Password?
              </a>
            </div>
          </Form>
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>
              By signing up for an account you agree to the{" "}
              <span className="text-primary! underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-primary! underline cursor-pointer">
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
