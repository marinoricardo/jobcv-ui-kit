import { categories } from '@/data/mockJobs';
import type { JobCategory, JobType } from '@/types/job';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface FilterBarProps {
  category: JobCategory;
  type: JobType;
  remote: boolean;
  onCategoryChange: (category: JobCategory) => void;
  onTypeChange: (type: JobType) => void;
  onRemoteChange: (remote: boolean) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  category,
  type,
  remote,
  onCategoryChange,
  onTypeChange,
  onRemoteChange,
}: FilterBarProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Área de actuação</h3>
        <Select value={category} onValueChange={(value) => onCategoryChange(value as JobCategory)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Tipo de contrato</h3>
        <Select value={type} onValueChange={(value) => onTypeChange(value as JobType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="full-time">Tempo integral</SelectItem>
            <SelectItem value="part-time">Tempo parcial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4">
        <div>
          <Label htmlFor="remote-toggle" className="text-sm font-medium text-foreground">
            Trabalho remoto
          </Label>
          <p className="text-xs text-muted-foreground">Mostrar apenas vagas remotas</p>
        </div>
        <Switch
          id="remote-toggle"
          checked={remote}
          onCheckedChange={onRemoteChange}
        />
      </div>
    </div>
  );
}
