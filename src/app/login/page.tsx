"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IbmPlexSans } from "@/lib/fonts";
import { supabaseAuth } from "@/lib/supabseClient";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const user = await supabaseAuth.auth.getSession();
      console.log(user);
    }
    checkSession();
  }, []);
  const handleSignUp = async () => {
    await supabaseAuth.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { data: dataUser, error } =
      await supabaseAuth.auth.signInWithPassword({
        email,
        password,
      });
    if (dataUser) {
      console.log("redirecting");
      setTimeout(() => {
        router.refresh();
      }, 100);

      setLoading(false);
    }
    if (error) {
      setLoading(false);
      toast(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabaseAuth.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center   min-h-screen justify-center">
      <div className="p-10 rounded-md shadow bg-neutral-100">
        <Link href={"/"}>
          <div className={"flex items-center gap-3"}>
            <Image
              src={"/oau_logo.svg"}
              alt={"OAU Logo"}
              width={40}
              height={40}
            />
            <h1
              className={`${IbmPlexSans.className} text-primary font-semibold text-xl`}
            >
              OAUOIR
            </h1>
          </div>
        </Link>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="text-black"
          />
        </div>

        <Button
          className="mt-5 w-full"
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign in"}
        </Button>
      </div>
    </div>
  );
}
