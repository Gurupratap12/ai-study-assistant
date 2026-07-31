import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LoginVerificationPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyCode = async () => {
    if (!isLoaded || !signIn) return;

    try {
      setLoading(true);

      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId!,
        });

        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold">
          Verify Login
        </h2>

        <p className="mt-2 text-slate-500">
          Enter the verification code sent to your email.
        </p>

        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter OTP"
          className="mt-6 w-full rounded-xl border px-4 py-3"
        />

        <button
          onClick={verifyCode}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-white"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default LoginVerificationPage;