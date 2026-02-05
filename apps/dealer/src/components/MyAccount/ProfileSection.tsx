import { motion, useReducedMotion } from "framer-motion";
import { Mail, Building2, ShieldCheck, User } from "lucide-react";
import { useProfile } from '@/services/auth'


const ProfileSection = () => {

    const { data } = useProfile()
    const reduceMotion = useReducedMotion()
    const firstName = data?.data.firstName || "Account"
    const email = data?.data.email || "—"
    const company = data?.data.dealer?.companyName || "—"
    const initial = firstName?.[0]?.toUpperCase() || "A"

    return (
        <motion.section
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="relative overflow-hidden rounded-[20px] border border-blue-100/80 bg-gradient-to-br from-blue-50 via-white to-orange-50/60 p-6 shadow-[0_18px_40px_-28px_rgba(30,64,175,0.35)]"
        >
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <motion.div
                            className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500/40 via-orange-400/30 to-blue-300/40 blur"
                            animate={reduceMotion ? undefined : { opacity: [0.5, 0.8, 0.5] }}
                            transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                            <span className="text-xl font-semibold text-slate-800">{initial}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                            <User className="h-4 w-4 text-blue-500" />
                            Welcome Back
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-900">Hi, {firstName}</h2>
                        <p className="text-sm text-slate-600">
                            Access and manage your profile, preferences, and dealer details.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF8A00] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_-18px_rgba(255,138,0,0.8)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-18px_rgba(255,138,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
                        onClick={() => {}}
                    >
                        Edit Profile
                    </button>
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                        View Account
                    </button>
                </div>
            </div>

            <div className="relative mt-5 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Mail className="h-4 w-4" />
                    {email}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                    <Building2 className="h-4 w-4" />
                    {company}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                    Verified Dealer
                </div>
            </div>
        </motion.section>
    )
}

export default ProfileSection
