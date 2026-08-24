import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLang } from "@/hooks/useLang";

interface Category {
  id: string;
  label: string;
}

export function ExcursionsNavDropdown({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const { localize } = useLang();
  const categories = t("experiences.categories", { returnObjects: true }) as Category[];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`inline-flex items-center gap-1 text-sm font-medium transition-colors outline-none ${className}`}>
        {t("nav.excursions")}
        <ChevronDown className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {categories.map((cat) => (
          <DropdownMenuItem key={cat.id} asChild className="cursor-pointer">
            <Link to={localize(`/excursions/${cat.id}`)}>{cat.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
