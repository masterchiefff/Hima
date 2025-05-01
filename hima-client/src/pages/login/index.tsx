import { LoginForm } from "@/components/auth/login-form"
import { SwahiliPattern } from "@/components/swahili-pattern"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <SwahiliPattern className="text-white" />
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <span className="text-black text-xl font-bold">H</span>
          </div>
          <span className="font-bold text-3xl ml-2">ima</span>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Micro-insurance for Africa's gig workers</p>

        <LoginForm />
      </div>
    </div>
  )
}
