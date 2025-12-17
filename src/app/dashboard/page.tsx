import { redirect } from 'next/navigation';

export default function DashboardRoot() {
  // In a real app, you'd check the user's role and redirect accordingly.
  // For now, redirect to the home page if accessed directly.
  redirect('/');
}
