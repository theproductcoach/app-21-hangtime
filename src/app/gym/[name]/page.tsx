import { Suspense } from "react";
import GymProfileContent from "@/components/GymProfileContent";

interface PageProps {
  params: Promise<{ name: string }>;
}

export default async function GymProfile({ params }: PageProps) {
  const { name } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <GymProfileContent gymId={name} />
    </Suspense>
  );
} 