import { useState } from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, locations } from '@/data/mockJobs';
import type { JobCategory, JobType } from '@/types/job';

interface FilterModalProps {
  category: JobCategory;
  type: JobType;
  remote: boolean;
  salaryRange: number[];
  onCategoryChange: (category: JobCategory) => void;
  onTypeChange: (type: JobType) => void;
  onRemoteChange: (remote: boolean) => void;
  onSalaryRangeChange: (range: number[]) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function FilterModal({
  category,
  type,
  remote,
  salaryRange,
  onCategoryChange,
  onTypeChange,
  onRemoteChange,
  onSalaryRangeChange,
  onClearFilters,
  activeFiltersCount,
}: FilterModalProps) {
  const [open, setOpen] = useState(false);

  const formatSalary = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return value.toString();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 md:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Filtros</SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="gap-1.5 text-muted-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              Limpar
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-6 overflow-y-auto pb-20">
          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Área de actuação</Label>
            <Select value={category} onValueChange={(value) => onCategoryChange(value as JobCategory)}>
              <SelectTrigger className="h-12 rounded-xl">
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

          {/* Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Tipo de contrato</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'full-time', label: 'Integral' },
                { value: 'part-time', label: 'Parcial' },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => onTypeChange(t.value as JobType)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    type === t.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/30'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Faixa salarial (MZN)</Label>
              <span className="text-sm font-medium text-primary">
                {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
              </span>
            </div>
            <Slider
              value={salaryRange}
              onValueChange={onSalaryRangeChange}
              min={0}
              max={300000}
              step={10000}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 MZN</span>
              <span>300k MZN</span>
            </div>
          </div>

          {/* Remote Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/30 p-4">
            <div>
              <Label className="text-sm font-medium text-foreground">
                Apenas trabalho remoto
              </Label>
              <p className="text-xs text-muted-foreground">
                Mostrar vagas com opção de trabalho remoto
              </p>
            </div>
            <Switch checked={remote} onCheckedChange={onRemoteChange} />
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Localização</Label>
            <div className="flex flex-wrap gap-2">
              {locations.slice(0, 6).map((loc) => (
                <button
                  key={loc}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4">
          <Button
            size="lg"
            className="w-full rounded-xl"
            onClick={() => setOpen(false)}
          >
            Ver {activeFiltersCount > 0 ? 'resultados filtrados' : 'todas as vagas'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
