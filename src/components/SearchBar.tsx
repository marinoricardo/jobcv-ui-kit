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
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-card md:flex-row md:items-center md:gap-0 md:p-2"
    >
      <div className="flex flex-1 items-center gap-2 md:border-r md:border-border md:pr-4">
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cargo, empresa ou palavra-chave"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-0 bg-transparent p-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-1 items-center gap-2 md:px-4">
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cidade ou estado"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border-0 bg-transparent p-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
        />
      </div>

      <Button type="submit" size="lg" className="w-full md:ml-2 md:w-auto">
        Buscar Vagas
      </Button>
    </form>
  );
}
