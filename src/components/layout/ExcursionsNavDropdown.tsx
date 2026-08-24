import { useNavigate } from "react-router-dom";
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
  emoji: string;
  label: string;
}

export function ExcursionsNavDropdown({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { localize } = useLang();
  const categories = t("excursionsPage.categories", { returnObjects: true }) as Category[];

  const go = (categoryId?: string) => {
    navigate(categoryId ? `${localize("/excursions")}?category=${categoryId}` : localize("/excursions"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`inline-flex items-center gap-1 text-sm font-medium transition-colors outline-none ${className}`}>
        {t("nav.excursions")}
        <ChevronDown className="w-3.5 h-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => go()} className="cursor-pointer font-medium">
          {t("excursionsPage.allCategories")}
        </DropdownMenuItem>
        {categories.map((cat) => (
          <DropdownMenuItem key={cat.id} onClick={() => go(cat.id)} className="cursor-pointer">
            {cat.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
