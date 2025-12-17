import { AuthTabs } from '@/components/auth/auth-tabs';
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-background">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-primary rounded-full p-4 mb-4">
          <GraduationCap className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground font-headline">
          Welcome to AcademiaFlow
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your All-in-One Academic Scheduler
        </p>
      </div>
      <AuthTabs />
    </main>
  );
}
