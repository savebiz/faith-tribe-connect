import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full bg-deep-slate flex items-center justify-center p-4">
            {/* Background Gradient */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-faith-teal/10 via-deep-slate to-black pointer-events-none" />

            <AuthForm mode="login" />
        </main>
    );
}
