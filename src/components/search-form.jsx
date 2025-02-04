import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@/components/ui/sidebar";

export function SearchForm({
  placeholder = "Search the docs...",
  bellIcon = false,
  avatarDropdown = false,
  avatarSrc = "",
  onSearch = () => {},
  className = "pl-8",
  customClass,
  handleClick,
  ...props
}) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative ">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>

          {/* Search Input Field */}
          <SidebarInput
            id="search"
            placeholder={placeholder}
            className={className}
            onChange={(e) => onSearch(e.target.value)}
          />

          <Search
            className={`pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 ${customClass}`}
          />

          {bellIcon && (
            <Bell className="pointer-events-auto absolute right-10 top-1/2 size-4 -translate-y-1/2 select-none opacity-70 mr-4" />
          )}

          {avatarDropdown && avatarSrc && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 mr-2">
              <img
                src={avatarSrc}
                alt="Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => {
                  handleClick;
                }}
              />
            </div>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
