import { Logo } from "@/components/Logo";

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <Logo size="sm" />
      </div>
    </div>
  );
}
