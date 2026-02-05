import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useLogin } from "@/services/auth";
import styles from "./dealer-auth-animated.module.css";

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

export default function DealerAuthAnimated() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [mode, setMode] = useState<Mode>("login");
  const [isSwitching, setIsSwitching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginValues, setLoginValues] = useState<LoginValues>(emptyLogin);
  const [registerValues, setRegisterValues] = useState<RegisterValues>(emptyRegister);
  const [loginErrors, setLoginErrors] = useState<FieldErrors<LoginValues>>({});
  const [registerErrors, setRegisterErrors] = useState<FieldErrors<RegisterValues>>({});
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState(false);

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

  useEffect(() => {
    setIsSwitching(true);
    const timer = window.setTimeout(() => setIsSwitching(false), 900);
    return () => window.clearTimeout(timer);
  }, [mode]);

  function handleToggle(next: Mode) {
    if (next === mode) return;
    setMode(next);
  }

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

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginMessage(null);
    const nextErrors = validateLogin(loginValues);
    setLoginErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer login", {
        email: loginValues.email,
        password: loginValues.password,
        remember: loginValues.remember,
      });
      setLoginMessage("Logging in...");
      loginMutation.mutate({ email: loginValues.email, password: loginValues.password });
    }
  }

  function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterMessage(null);
    const nextErrors = validateRegister(registerValues);
    setRegisterErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer register", registerValues);
      setRegisterLoading(true);
      setRegisterMessage("Creating your account...");
      window.setTimeout(() => {
        setRegisterLoading(false);
        setRegisterMessage("Registration submitted. We will contact you soon.");
      }, 1200);
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.floatLayer} aria-hidden="true">
        <svg className={`${styles.floatIcon} ${styles.icon1}`} viewBox="0 0 64 64" fill="none">
          <path d="M32 6l6 6 10-2 4 10 10 4-2 10 6 6-6 6 2 10-10 4-4 10-10-2-6 6-6-6-10 2-4-10-10-4 2-10-6-6 6-6-2-10 10-4 4-10 10 2 6-6z" stroke="currentColor" strokeWidth="2"/>
          <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className={`${styles.floatIcon} ${styles.icon2}`} viewBox="0 0 64 64" fill="none">
          <path d="M26 6h16l-6 20h12L22 58l6-22H16L26 6z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className={`${styles.floatIcon} ${styles.icon3}`} viewBox="0 0 64 64" fill="none">
          <path d="M18 10l10 10-8 8 6 6 8-8 10 10-6 6 8 8-6 6-8-8-6 6-10-10 8-8-6-6-8 8-10-10 6-6-8-8 6-6 8 8 6-6z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg className={`${styles.floatIcon} ${styles.icon4}`} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2"/>
          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 12v8M32 44v8M12 32h8M44 32h8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div
        className={`${styles.card} ${mode === "register" ? styles.isRegister : ""} ${
          isSwitching ? styles.isSwitching : ""
        }`}
      >
        <div className={styles.toggleBox} aria-hidden="true" />

        <div className={`${styles.formBox} ${styles.loginBox}`}>
          <form className={styles.form} onSubmit={handleLoginSubmit}>
            <div className={styles.formHeader}>
              <h2 className={`${styles.title} ${styles.animItem}`} style={{ "--i": 1 } as React.CSSProperties}>
                Dealer Access
              </h2>
              <p className={`${styles.subtitle} ${styles.animItem}`} style={{ "--i": 2 } as React.CSSProperties}>
                Sign in to continue.
              </p>
            </div>

            <div className={`${styles.field} ${styles.animItem}`} style={{ "--i": 3 } as React.CSSProperties}>
              <label htmlFor="dealer-login-email">Email address</label>
              <input
                id="dealer-login-email"
                name="email"
                type="email"
                autoComplete="email"
                value={loginValues.email}
                onChange={(event) => setLoginValues((prev) => ({ ...prev, email: event.target.value }))}
                aria-invalid={Boolean(loginErrors.email)}
                aria-describedby={loginErrors.email ? "dealer-login-email-error" : undefined}
                required
              />
              {loginErrors.email ? (
                <span id="dealer-login-email-error" className={styles.errorText}>
                  {loginErrors.email}
                </span>
              ) : null}
            </div>

            <div className={`${styles.field} ${styles.animItem}`} style={{ "--i": 4 } as React.CSSProperties}>
              <label htmlFor="dealer-login-password">Password</label>
              <div className={styles.passwordField}>
                <input
                  id="dealer-login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={loginValues.password}
                  onChange={(event) => setLoginValues((prev) => ({ ...prev, password: event.target.value }))}
                  aria-invalid={Boolean(loginErrors.password)}
                  aria-describedby={loginErrors.password ? "dealer-login-password-error" : undefined}
                  required
                />
                <button
                  className={styles.passwordToggle}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {loginErrors.password ? (
                <span id="dealer-login-password-error" className={styles.errorText}>
                  {loginErrors.password}
                </span>
              ) : null}
            </div>

            <div className={`${styles.row} ${styles.animItem}`} style={{ "--i": 5 } as React.CSSProperties}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={loginValues.remember}
                  onChange={(event) =>
                    setLoginValues((prev) => ({ ...prev, remember: event.target.checked }))
                  }
                />
                Remember me
              </label>
              <button className={styles.linkButton} type="button">
                Forgot password?
              </button>
            </div>

            <div className={`${styles.animItem}`} style={{ "--i": 6 } as React.CSSProperties}>
              <button className={styles.primaryButton} type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </button>
              <div className={styles.inlineMessage} role="status" aria-live="polite">
                {loginMessage}
              </div>
            </div>

            <div className={`${styles.helper} ${styles.animItem}`} style={{ "--i": 7 } as React.CSSProperties}>
              <span>New here?</span>
              <button className={styles.linkButton} type="button" onClick={() => handleToggle("register")}>
                Create account
              </button>
            </div>
          </form>
        </div>

        <div className={`${styles.formBox} ${styles.registerBox}`}>
          <form className={styles.form} onSubmit={handleRegisterSubmit}>
            <div className={styles.formHeader}>
              <h2 className={`${styles.title} ${styles.animItem}`} style={{ "--i": 1 } as React.CSSProperties}>
                Dealer Access
              </h2>
              <p className={`${styles.subtitle} ${styles.animItem}`} style={{ "--i": 2 } as React.CSSProperties}>
                Create your dealer account.
              </p>
            </div>

            <div className={`${styles.field} ${styles.animItem}`} style={{ "--i": 3 } as React.CSSProperties}>
              <label htmlFor="dealer-register-username">Username</label>
              <input
                id="dealer-register-username"
                name="username"
                type="text"
                autoComplete="username"
                value={registerValues.username}
                onChange={(event) =>
                  setRegisterValues((prev) => ({ ...prev, username: event.target.value }))
                }
                aria-invalid={Boolean(registerErrors.username)}
                aria-describedby={registerErrors.username ? "dealer-register-username-error" : undefined}
                required
              />
              {registerErrors.username ? (
                <span id="dealer-register-username-error" className={styles.errorText}>
                  {registerErrors.username}
                </span>
              ) : null}
            </div>

            <div className={`${styles.field} ${styles.animItem}`} style={{ "--i": 4 } as React.CSSProperties}>
              <label htmlFor="dealer-register-email">Email address</label>
              <input
                id="dealer-register-email"
                name="email"
                type="email"
                autoComplete="email"
                value={registerValues.email}
                onChange={(event) => setRegisterValues((prev) => ({ ...prev, email: event.target.value }))}
                aria-invalid={Boolean(registerErrors.email)}
                aria-describedby={registerErrors.email ? "dealer-register-email-error" : undefined}
                required
              />
              {registerErrors.email ? (
                <span id="dealer-register-email-error" className={styles.errorText}>
                  {registerErrors.email}
                </span>
              ) : null}
            </div>

            <div className={`${styles.field} ${styles.animItem}`} style={{ "--i": 5 } as React.CSSProperties}>
              <label htmlFor="dealer-register-password">Password</label>
              <input
                id="dealer-register-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={registerValues.password}
                onChange={(event) =>
                  setRegisterValues((prev) => ({ ...prev, password: event.target.value }))
                }
                aria-invalid={Boolean(registerErrors.password)}
                aria-describedby={registerErrors.password ? "dealer-register-password-error" : undefined}
                required
              />
              {registerErrors.password ? (
                <span id="dealer-register-password-error" className={styles.errorText}>
                  {registerErrors.password}
                </span>
              ) : null}
            </div>

            <div className={`${styles.animItem}`} style={{ "--i": 6 } as React.CSSProperties}>
              <button className={styles.primaryButton} type="submit" disabled={registerLoading}>
                {registerLoading ? "Creating..." : "Create account"}
              </button>
              <div className={styles.inlineMessage} role="status" aria-live="polite">
                {registerMessage}
              </div>
            </div>

            <div className={`${styles.helper} ${styles.animItem}`} style={{ "--i": 7 } as React.CSSProperties}>
              <span>Already have an account?</span>
              <button className={styles.linkButton} type="button" onClick={() => handleToggle("login")}>
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className={`${styles.togglePanel} ${styles.toggleLeft}`} aria-hidden={mode !== "register"}>
          <h2>Dealer Access</h2>
          <p>Sign in to continue.</p>
          <button type="button" onClick={() => handleToggle("login")}>
            Sign in
          </button>
        </div>

        <div className={`${styles.togglePanel} ${styles.toggleRight}`} aria-hidden={mode !== "login"}>
          <h2>Dealer Access</h2>
          <p>Create your dealer account.</p>
          <button type="button" onClick={() => handleToggle("register")}>
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}
