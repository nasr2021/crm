import { LoginForm } from "@/_components/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-950">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">تسجيل الدخول</h1>
            <p className="text-muted-foreground">أدخل بياناتك للوصول إلى نظام إدارة العملاء</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
