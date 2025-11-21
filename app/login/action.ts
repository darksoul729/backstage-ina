"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const correctUser = process.env.ADMIN_USER;
  const correctPass = process.env.ADMIN_PASSWORD;

  if (username === correctUser && password === correctPass) {
    // PERBAIKAN: Tambahkan (await cookies())
    const cookieStore = await cookies();
    
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    redirect("/admin/dashboard");
  } else {
    return { error: "Username atau Password salah!" };
  }
}

export async function handleLogout() {
  // PERBAIKAN: Tambahkan (await cookies())
  const cookieStore = await cookies();
  
  cookieStore.delete("admin_session");
  redirect("/login");
}