import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.detail === "EMAIL_EXISTS") {
          toast(
            <div className="flex flex-col">
              <span className="font-medium">Account already exists</span>
              <span className="text-sm text-gray-700">
                Try logging in instead.
              </span>
            </div>,
            {
              style: { backgroundColor: "#eae4e2", color: "black" },
            }
          );
        } else {
          toast(
            <div className="flex flex-col">
              <span className="font-medium">Signup failed</span>
              <span className="text-sm text-gray-700">
                Unexpected error occurred.
              </span>
            </div>,
            {
              style: { backgroundColor: "#eae4e2", color: "black" },
            }
          );
        }
        return;
      }

      toast(
        <div className="flex flex-col">
          <span className="font-medium">Account created!</span>
          <span className="text-sm text-gray-300">You can now log in.</span>
        </div>,
        {
          style: { backgroundColor: "#16a34a", color: "white" },
        }
      );

      navigate("/login");
    } catch {
      toast(
        <div className="flex flex-col">
          <span className="font-medium">Something went wrong</span>
          <span className="text-sm text-gray-300">Please try again later.</span>
        </div>,
        {
          style: { backgroundColor: "#b91c1c", color: "white" },
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] rounded-xl p-8 shadow-2xl border border-white/10">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Create Account
        </h1>
        <div className="space-y-4">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={16}
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-white/10 border-none text-white placeholder-white/40"
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={16}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-white/10 border-none text-white placeholder-white/40"
            />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
