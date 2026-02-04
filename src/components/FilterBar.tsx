import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/mockJobs';
import type { JobCategory, JobType } from '@/types/job';

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
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = category !== 'all' || type !== 'all' || remote;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filtros</span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto h-7 gap-1 px-2 text-xs text-muted-foreground"
          >
            <X className="h-3 w-3" />
            Limpar
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? 'default' : 'filter'}
              size="sm"
              onClick={() => onCategoryChange(cat.value as JobCategory)}
              className="h-8 text-xs"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Job Type */}
        <Button
          variant={type === 'all' ? 'default' : 'filter'}
          size="sm"
          onClick={() => onTypeChange('all')}
          className="h-8 text-xs"
        >
          Todos os tipos
        </Button>
        <Button
          variant={type === 'full-time' ? 'default' : 'filter'}
          size="sm"
          onClick={() => onTypeChange('full-time')}
          className="h-8 text-xs"
        >
          Full-time
        </Button>
        <Button
          variant={type === 'part-time' ? 'default' : 'filter'}
          size="sm"
          onClick={() => onTypeChange('part-time')}
          className="h-8 text-xs"
        >
          Part-time
        </Button>

        {/* Remote Toggle */}
        <Button
          variant={remote ? 'default' : 'filter'}
          size="sm"
          onClick={() => onRemoteChange(!remote)}
          className="h-8 text-xs"
        >
          🏠 Remoto
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Filtros ativos:</span>
          {category !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categories.find((c) => c.value === category)?.label}
              <button onClick={() => onCategoryChange('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {type !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {type === 'full-time' ? 'Full-time' : 'Part-time'}
              <button onClick={() => onTypeChange('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {remote && (
            <Badge variant="secondary" className="gap-1">
              Remoto
              <button onClick={() => onRemoteChange(false)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
