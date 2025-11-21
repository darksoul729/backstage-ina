"use server";

import { prisma } from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

// --- 1. READ: Ambil Semua Event ---
export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return events;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// --- 4. UPDATE: Edit Event ---
export async function updateEvent(formData: FormData) {
  const id = formData.get("id") as string;
  
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const status = formData.get("status") as string; // Status Tiket
  const image = formData.get("image") as string;
  
  // BARU: Ambil data timeline
  const timeline = formData.get("timeline") as string; 

  await prisma.event.update({
    where: { id },
    data: { 
      title, date, location, description, price, status, image, 
      timeline // Simpan ke database
    },
  });

  revalidatePath("/upcoming");
  revalidatePath("/admin/events");
}

// --- 2. CREATE: Tambah Event Baru ---
export async function addEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const status = formData.get("status") as string;
  const image = formData.get("image") as string;

  // BARU: Ambil data timeline (Default ke Upcoming jika kosong)
  const timeline = (formData.get("timeline") as string) || "Upcoming";

  await prisma.event.create({
    data: { 
      title, date, location, description, price, status, image, 
      timeline // Simpan ke database
    },
  });

  revalidatePath("/upcoming");
  revalidatePath("/admin/events"); // Typo fixed (evemts -> events)
}

// --- 3. DELETE: Hapus Event ---
export async function deleteEvent(id: string) {
  await prisma.event.delete({
    where: { id },
  });
  
  revalidatePath("/upcoming");
  revalidatePath("/admin/events");
}

// ... kode Event, Team, Analytics sebelumnya ...

// --- 11. PROJECT: Get All ---
export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" }, // Proyek terbaru di atas
    });
  } catch (error) {
    return [];
  }
}

// --- 12. PROJECT: Add ---
export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  await prisma.project.create({
    data: { title, category, image },
  });

  revalidatePath("/proyek");
  revalidatePath("/admin/projects");
}

// --- 13. PROJECT: Update ---
export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;

  await prisma.project.update({
    where: { id },
    data: { title, category, image },
  });

  revalidatePath("/proyek");
  revalidatePath("/admin/projects");
}

// --- 14. PROJECT: Delete ---
export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  
  revalidatePath("/proyek");
  revalidatePath("/admin/projects");
}