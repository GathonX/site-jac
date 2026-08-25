import { Logo } from "@/components/Logo";

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[6px] border-muted border-t-primary animate-spin" />
        <Logo size="xl" />
      </div>
    </div>
  );
}
