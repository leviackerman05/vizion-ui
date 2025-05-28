import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { FaApple, FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Invalid email or password");
        toast(
          <div className="flex flex-col">
            <span className="font-medium">Login failed</span>
            <span className="text-sm text-gray-700">
              Please check your credentials
            </span>
          </div>,
          {
            style: { backgroundColor: "#eae4e2", color: "black" },
          }
        );
        return;
      }

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("session_id", data.sessionId);

      navigate("/");
    } catch {
      setError("Something went wrong");
      toast(
        <div className="flex flex-col">
          <span className="font-medium">Login failed</span>
          <span className="text-sm text-gray-700">Please try again later.</span>
        </div>,
        {
          style: { backgroundColor: "#eae4e2", color: "black" },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#111] rounded-xl p-8 shadow-2xl border border-white/10">
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-sm font-bold">O</span>
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Welcome</h1>
          <p className="text-sm text-white/60 mt-1">
            Don't have an account yet?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={16}
            />
            <Input
              type="email"
              placeholder="Email"
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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <div className="text-center text-white/40 text-sm mt-4">OR</div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/10"
          >
            <FaApple size={16} />
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/10"
          >
            <FaGoogle size={16} />
          </Button>
          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/10"
          >
            <FaGithub size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
