import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useLogin } from "@/services/auth";
import AuthCardAnimated from "@/components/auth/AuthCardAnimated";

type Mode = "login" | "register";

type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

type FieldErrors<T> = Partial<Record<keyof T, string>>;

const emptyLogin: LoginValues = { email: "", password: "", remember: true };
const emptyRegister: RegisterValues = { username: "", email: "", password: "" };

export default function DealerAuthFullPageFlip() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [mode, setMode] = useState<Mode>("login");
  const [loginValues, setLoginValues] = useState<LoginValues>(emptyLogin);
  const [registerValues, setRegisterValues] = useState<RegisterValues>(emptyRegister);
  const [loginErrors, setLoginErrors] = useState<FieldErrors<LoginValues>>({});
  const [registerErrors, setRegisterErrors] = useState<FieldErrors<RegisterValues>>({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const loginMutation = useLogin({
    onSuccess: (data) => {
      message.success(data.message);
      setLoginMessage("Logged in. Redirecting...");
      navigate("/");
    },
    onError: () => {
      setLoginMessage("Login failed. Please check your credentials.");
      message.error("Login failed. Please try again.");
    },
  });

  function validateLogin(values: LoginValues) {
    const nextErrors: FieldErrors<LoginValues> = {};
    if (!values.email.trim()) nextErrors.email = "Email is required.";
    if (!values.password.trim()) nextErrors.password = "Password is required.";
    return nextErrors;
  }

  function validateRegister(values: RegisterValues) {
    const nextErrors: FieldErrors<RegisterValues> = {};
    if (!values.username.trim()) nextErrors.username = "Username is required.";
    if (!values.email.trim()) nextErrors.email = "Email is required.";
    if (!values.password.trim()) nextErrors.password = "Password is required.";
    return nextErrors;
  }

  function handleToggle(next: Mode) {
    if (next === mode) return;
    setMode(next);
  }

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin(loginValues);
    setLoginErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer login", loginValues);
      setLoginMessage("Login request sent.");
      setLoginLoading(true);
      loginMutation.mutate({ email: loginValues.email, password: loginValues.password });
      window.setTimeout(() => setLoginLoading(false), 800);
    }
  }

  function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegister(registerValues);
    setRegisterErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer register", registerValues);
      setRegisterLoading(true);
      window.setTimeout(() => setRegisterLoading(false), 800);
    }
  }

  return (
    <AuthCardAnimated
      mode={mode}
      onModeChange={handleToggle}
      renderLoginForm={() => (
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="form-header">
            <h2 className="form-title animation" style={{ "--li": 1 } as React.CSSProperties}>
              Dealer Login
            </h2>
            <p className="form-subtitle animation" style={{ "--li": 2 } as React.CSSProperties}>
              Sign in to continue.
            </p>
          </div>

          <div className="field animation" style={{ "--li": 3 } as React.CSSProperties}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              value={loginValues.email}
              onChange={(event) => setLoginValues((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(loginErrors.email)}
              aria-describedby={loginErrors.email ? "login-email-error" : undefined}
              required
            />
            {loginErrors.email ? (
              <span id="login-email-error" className="error-text">
                {loginErrors.email}
              </span>
            ) : null}
          </div>

          <div className="field animation" style={{ "--li": 4 } as React.CSSProperties}>
            <label htmlFor="login-password">Password</label>
            <div className="password-field">
              <input
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={loginValues.password}
                onChange={(event) => setLoginValues((prev) => ({ ...prev, password: event.target.value }))}
                aria-invalid={Boolean(loginErrors.password)}
                aria-describedby={loginErrors.password ? "login-password-error" : undefined}
                required
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {loginErrors.password ? (
              <span id="login-password-error" className="error-text">
                {loginErrors.password}
              </span>
            ) : null}
          </div>

          <div className="row-between animation" style={{ "--li": 5 } as React.CSSProperties}>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={loginValues.remember}
                onChange={(event) =>
                  setLoginValues((prev) => ({ ...prev, remember: event.target.checked }))
                }
              />
              Remember me
            </label>
            <button className="link-btn" type="button">
              Forgot Password?
            </button>
          </div>

          <div className="animation" style={{ "--li": 6 } as React.CSSProperties}>
            <button className="primary-btn" type="submit" disabled={loginLoading}>
              {loginLoading ? "Logging in..." : "Login"}
            </button>
            <div className="inline-message" role="status" aria-live="polite">
              {loginMessage}
            </div>
          </div>

          <div className="helper-line animation" style={{ "--li": 7 } as React.CSSProperties}>
            <span>Don&apos;t have an account?</span>
            <button className="link-btn" type="button" onClick={() => handleToggle("register")}>
              Sign up
            </button>
          </div>
        </form>
      )}
      renderRegisterForm={() => (
        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <div className="form-header">
            <h2 className="form-title animation" style={{ "--li": 1 } as React.CSSProperties}>
              Dealer Registration
            </h2>
            <p className="form-subtitle animation" style={{ "--li": 2 } as React.CSSProperties}>
              Create your dealer account.
            </p>
          </div>

          <div className="field animation" style={{ "--li": 3 } as React.CSSProperties}>
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              name="username"
              type="text"
              autoComplete="username"
              value={registerValues.username}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, username: event.target.value }))}
              aria-invalid={Boolean(registerErrors.username)}
              aria-describedby={registerErrors.username ? "register-username-error" : undefined}
              required
            />
            {registerErrors.username ? (
              <span id="register-username-error" className="error-text">
                {registerErrors.username}
              </span>
            ) : null}
          </div>

          <div className="field animation" style={{ "--li": 4 } as React.CSSProperties}>
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              value={registerValues.email}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(registerErrors.email)}
              aria-describedby={registerErrors.email ? "register-email-error" : undefined}
              required
            />
            {registerErrors.email ? (
              <span id="register-email-error" className="error-text">
                {registerErrors.email}
              </span>
            ) : null}
          </div>

          <div className="field animation" style={{ "--li": 5 } as React.CSSProperties}>
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={registerValues.password}
              onChange={(event) => setRegisterValues((prev) => ({ ...prev, password: event.target.value }))}
              aria-invalid={Boolean(registerErrors.password)}
              aria-describedby={registerErrors.password ? "register-password-error" : undefined}
              required
            />
            {registerErrors.password ? (
              <span id="register-password-error" className="error-text">
                {registerErrors.password}
              </span>
            ) : null}
          </div>

          <div className="animation" style={{ "--li": 6 } as React.CSSProperties}>
            <button className="primary-btn" type="submit" disabled={registerLoading}>
              {registerLoading ? "Creating..." : "Create account"}
            </button>
            <div className="inline-message" role="status" aria-live="polite">
              {registerLoading ? "Creating your account..." : null}
            </div>
          </div>

          <div className="helper-line animation" style={{ "--li": 7 } as React.CSSProperties}>
            <span>Already have an account?</span>
            <button className="link-btn" type="button" onClick={() => handleToggle("login")}>
              Sign in
            </button>
          </div>
        </form>
      )}
    />
  );
}
