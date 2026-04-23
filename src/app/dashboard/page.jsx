import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div>
      <p className="mt-10 text-4xl font-bold text-center">
        Welcome to dashboard
      </p>
    </div>
  );
};

export default DashboardPage;
