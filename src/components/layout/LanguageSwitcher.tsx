import { useNavigate } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLang, type Lang } from "@/hooks/useLang";

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export function LanguageSwitcher({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const navigate = useNavigate();
  const { lang, frPath, enPath } = useLang();
  const current = LANGUAGES.find((l) => l.code === lang)!;

  const pathFor = (code: Lang) => (code === "fr" ? frPath : enPath);

  const select = (code: Lang) => {
    navigate(pathFor(code));
    onNavigate?.();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-1.5 text-sm font-semibold rounded-full px-3 py-1.5 transition-colors outline-none ${className}`}
      >
        <span aria-hidden="true">{current.flag}</span>
        {current.code.toUpperCase()}
        <ChevronDown className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => select(l.code)}
            className="gap-2 cursor-pointer"
          >
            <span aria-hidden="true">{l.flag}</span>
            <span className="flex-1">{l.label}</span>
            {l.code === lang && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
