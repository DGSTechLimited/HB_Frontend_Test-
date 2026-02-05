import React from "react";
import "@/styles/authCardAnimated.css";

type AuthCardAnimatedProps = {
  mode: "login" | "register";
  onModeChange: (nextMode: "login" | "register") => void;
  renderLoginForm: () => React.ReactNode;
  renderRegisterForm: () => React.ReactNode;
};

export default function AuthCardAnimated({
  mode,
  onModeChange,
  renderLoginForm,
  renderRegisterForm,
}: AuthCardAnimatedProps) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_15%_20%,rgba(40,90,210,0.35),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(255,140,40,0.35),transparent_40%),linear-gradient(135deg,#0a1020,#0d1c3a_45%,#0a1f45)]">
      <div
        className={`auth-card-animated container relative w-full max-w-[900px] h-[560px] rounded-[28px] overflow-hidden bg-[#0b1222]/80 border border-white/10 shadow-[0_30px_80px_rgba(7,12,28,0.6)] text-[#f1f5ff] ${
          mode === "register" ? "active" : ""
        }`}
      >
        <div className="form-box login Login">{renderLoginForm()}</div>
        <div className="form-box register Register">{renderRegisterForm()}</div>

        <div className="toggle-box" aria-hidden="true" />

        <div className="toggle-panel toggle-left" aria-hidden={mode !== "login"}>
          <h2>Dealer Access</h2>
          <p>Sign in to continue.</p>
          <button type="button" onClick={() => onModeChange("login")}>
            Sign in
          </button>
        </div>
        <div className="toggle-panel toggle-right" aria-hidden={mode !== "register"}>
          <h2>Dealer Access</h2>
          <p>Create your dealer account.</p>
          <button type="button" onClick={() => onModeChange("register")}>
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}
