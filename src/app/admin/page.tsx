import AdminPanel from "@/components/admin/AdminPanel";
import { getUser } from "@/lib/queries/user";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
  return (
    <div>
      <AdminPanel />
    </div>
  );
}
