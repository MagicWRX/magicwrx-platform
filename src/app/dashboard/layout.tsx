import { AIAssistant } from '@/components/AIAssistant';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <AIAssistant />
    </div>
  );
}
