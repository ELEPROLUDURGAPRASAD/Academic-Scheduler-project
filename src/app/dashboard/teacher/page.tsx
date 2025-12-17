import { redirect } from 'next/navigation';

export default function TeacherRoot() {
  redirect('/dashboard/teacher/assignments');
}
