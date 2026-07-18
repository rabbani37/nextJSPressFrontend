import LoginForm from "../_components/LoginForm";


export default function LoginPage() {
  return (

    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-5 rounded-lg border p-8 shadow-lg">

        {/* FORM GENERIC TEXT  */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-gray-500">Enter your crediential to access your account</p>
        </div>
        {/* FORM  */}

        <LoginForm />
      </div>

    </div>




  )
}
