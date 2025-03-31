import Login from "@/components/admin/Login";
import { getUser } from "@/lib/queries/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    return redirect("/admin");
  }

  return <Login />;
}
