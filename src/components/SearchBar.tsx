import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onSearch,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-md md:flex-row md:items-center md:gap-0 md:p-2"
    >
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary/50 px-4 py-2.5 md:rounded-none md:rounded-l-xl md:border-r md:border-border md:bg-transparent md:py-0">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cargo, empresa ou palavra-chave"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-auto border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 md:text-base"
        />
      </div>

      <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary/50 px-4 py-2.5 md:rounded-none md:bg-transparent md:px-4 md:py-0">
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cidade ou província"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="h-auto border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 md:text-base"
        />
      </div>

      <Button type="submit" size="lg" className="h-12 w-full rounded-xl px-8 md:ml-2 md:w-auto">
        <Search className="mr-2 h-4 w-4 md:hidden" />
        Buscar
      </Button>
    </form>
  );
}
