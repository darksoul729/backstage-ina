import { getEvents } from "@/app/actions"; // Import server action
import UpcomingClient from "./client"; // Import komponen UI (Client)

// Ini Server Component (Async)
export default async function UpcomingPage() {
  // 1. Ambil data dari database
  const events = await getEvents(); 

  // 2. Kirim data ke Client Component
  return <UpcomingClient initialEvents={events} />;
}