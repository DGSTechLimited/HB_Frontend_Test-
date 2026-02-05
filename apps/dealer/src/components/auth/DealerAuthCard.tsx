import React, { useMemo, useState } from "react";
import styles from "./dealer-auth.module.css";

type Mode = "login" | "register";

type LoginValues = {
  email: string;
  password: string;
};

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

type FieldErrors<T> = Partial<Record<keyof T, string>>;

const emptyLogin: LoginValues = { email: "", password: "" };
const emptyRegister: RegisterValues = { username: "", email: "", password: "" };

export default function DealerAuthCard() {
  const [mode, setMode] = useState<Mode>("login");
  const [loginValues, setLoginValues] = useState<LoginValues>(emptyLogin);
  const [registerValues, setRegisterValues] = useState<RegisterValues>(emptyRegister);
  const [loginErrors, setLoginErrors] = useState<FieldErrors<LoginValues>>({});
  const [registerErrors, setRegisterErrors] = useState<FieldErrors<RegisterValues>>({});

  const isLogin = mode === "login";

  const cardClassName = useMemo(
    () => `${styles.card} ${isLogin ? "" : styles.active}`,
    [isLogin]
  );

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
    const nextErrors = validateLogin(loginValues);
    setLoginErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer login", loginValues);
    }
  }

  function handleRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegister(registerValues);
    setRegisterErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log("Dealer register", registerValues);
    }
  }

  return (
    <section className={styles.page}>
      <div className={cardClassName} data-mode={mode}>
        <div className={styles.diagonal} aria-hidden="true" />

        <div className={styles.leftPanel}>
          <div className={styles.leftContent}>
            <p className={styles.eyebrow}>HotBray Dealers</p>
            <h1 className={styles.headline}>Welcome back</h1>
            <p className={styles.subtext}>
              Access your B2B dashboard, manage inventory, and track orders in real
              time.
            </p>
            <button
              className={styles.ghostButton}
              type="button"
              onClick={() => setMode(isLogin ? "register" : "login")}
              aria-pressed={!isLogin}
            >
              {isLogin ? "Create account" : "Login instead"}
            </button>
          </div>
          <div className={styles.pattern} aria-hidden="true" />
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>{isLogin ? "Dealer Login" : "Create account"}</h2>
            <p className={styles.formSubtitle}>
              {isLogin
                ? "Sign in to continue your dealer experience."
                : "Join HotBray and unlock dealer-only pricing."}
            </p>
          </div>

          <div className={styles.formWrapper}>
            <form className={`${styles.form} ${styles.formLogin}`} onSubmit={handleLoginSubmit}>
              <div className={styles.fieldBlock + " " + styles.animation} style={{ "--i": 1 } as React.CSSProperties}>
                <label htmlFor="dealer-login-email">Email address</label>
                <input
                  id="dealer-login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={loginValues.email}
                  onChange={(event) =>
                    setLoginValues((prev) => ({ ...prev, email: event.target.value }))
                  }
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

              <div className={styles.fieldBlock + " " + styles.animation} style={{ "--i": 2 } as React.CSSProperties}>
                <label htmlFor="dealer-login-password">Password</label>
                <input
                  id="dealer-login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={loginValues.password}
                  onChange={(event) =>
                    setLoginValues((prev) => ({ ...prev, password: event.target.value }))
                  }
                  aria-invalid={Boolean(loginErrors.password)}
                  aria-describedby={loginErrors.password ? "dealer-login-password-error" : undefined}
                  required
                />
                {loginErrors.password ? (
                  <span id="dealer-login-password-error" className={styles.errorText}>
                    {loginErrors.password}
                  </span>
                ) : null}
              </div>

              <div className={styles.rowBetween + " " + styles.animation} style={{ "--i": 3 } as React.CSSProperties}>
                <button className={styles.primaryButton} type="submit">
                  Login
                </button>
                <button className={styles.linkButton} type="button">
                  Forgot Password?
                </button>
              </div>

              <div className={styles.helperLine + " " + styles.animation} style={{ "--i": 4 } as React.CSSProperties}>
                <span>Don&apos;t have an account?</span>
                <button className={styles.linkButton} type="button" onClick={() => setMode("register")}>
                  Sign up
                </button>
              </div>
            </form>

            <form
              className={`${styles.form} ${styles.formRegister}`}
              onSubmit={handleRegisterSubmit}
            >
              <div className={styles.fieldBlock + " " + styles.animation} style={{ "--i": 1 } as React.CSSProperties}>
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

              <div className={styles.fieldBlock + " " + styles.animation} style={{ "--i": 2 } as React.CSSProperties}>
                <label htmlFor="dealer-register-email">Email address</label>
                <input
                  id="dealer-register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={registerValues.email}
                  onChange={(event) =>
                    setRegisterValues((prev) => ({ ...prev, email: event.target.value }))
                  }
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

              <div className={styles.fieldBlock + " " + styles.animation} style={{ "--i": 3 } as React.CSSProperties}>
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

              <div className={styles.rowBetween + " " + styles.animation} style={{ "--i": 4 } as React.CSSProperties}>
                <button className={styles.primaryButton} type="submit">
                  Create account
                </button>
              </div>

              <div className={styles.helperLine + " " + styles.animation} style={{ "--i": 5 } as React.CSSProperties}>
                <span>Already have an account?</span>
                <button className={styles.linkButton} type="button" onClick={() => setMode("login")}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
