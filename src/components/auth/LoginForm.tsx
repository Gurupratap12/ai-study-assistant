import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!signIn) return;

    try {
      setLoading(true);

      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId!,
        });

        return;
      }

      if (result.status === "needs_second_factor") {
        await signIn.prepareSecondFactor({
          strategy: "email_code",
        });

        navigate("/login-verification");
        return;
      }
      console.log(signIn.status);
      console.log(signIn.supportedSecondFactors);
      console.log(JSON.stringify(result.supportedSecondFactors, null, 2));
      console.log("Session Activated");
    } catch (error: any) {
      console.error(error);
      alert(error.errors?.[0]?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Welcome Back 👋</h2>

        <p className="mt-3 text-slate-600">
          Login to continue your AI learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-20 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4" />
            Remember me
          </label>

          <button type="button" className="text-blue-600 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <Button className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Signup Link */}
      <p className="mt-6 text-center text-slate-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-blue-600 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </Card>
  );
};

export default LoginForm;
