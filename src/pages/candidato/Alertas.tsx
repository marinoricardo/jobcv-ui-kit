import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CandidatoLayout } from '@/components/candidato/CandidatoLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Plus,
  Trash2,
  MapPin,
  Briefcase,
  Wallet,
  Check,
  Mail,
} from 'lucide-react';
import { useState } from 'react';

interface Alert {
  id: string;
  name: string;
  category: string;
  location: string;
  minSalary?: string;
  frequency: 'daily' | 'weekly' | 'instant';
  active: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    name: 'Desenvolvedor Frontend',
    category: 'Tecnologia',
    location: 'Maputo',
    minSalary: '80.000 MZN',
    frequency: 'daily',
    active: true,
  },
  {
    id: '2',
    name: 'Marketing Digital',
    category: 'Marketing',
    location: 'Todas',
    frequency: 'weekly',
    active: true,
  },
  {
    id: '3',
    name: 'Gestor de Projectos',
    category: 'Operações',
    location: 'Maputo, Beira',
    frequency: 'instant',
    active: false,
  },
];

export default function Alertas() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [showForm, setShowForm] = useState(false);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  const deleteAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const frequencyLabels = {
    daily: 'Diário',
    weekly: 'Semanal',
    instant: 'Instantâneo',
  };

  return (
    <CandidatoLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Alertas de Vagas</h1>
            <p className="text-muted-foreground">
              Receba notificações quando novas vagas corresponderem aos seus critérios.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Alerta
          </Button>
        </div>

        {/* Create Alert Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Criar Novo Alerta</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome do alerta</Label>
                <Input placeholder="Ex: Vagas de TI em Maputo" />
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Input placeholder="Ex: Tecnologia" />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input placeholder="Ex: Maputo" />
              </div>
              <div className="space-y-2">
                <Label>Salário mínimo (opcional)</Label>
                <Input placeholder="Ex: 50.000 MZN" />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button>Criar Alerta</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border bg-card p-5 transition-all ${
                alert.active ? 'border-border' : 'border-border/50 opacity-60'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Bell
                      className={`h-5 w-5 ${
                        alert.active ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                    <h3 className="font-semibold text-foreground">{alert.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {frequencyLabels[alert.frequency]}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {alert.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {alert.location}
                    </span>
                    {alert.minSalary && (
                      <span className="flex items-center gap-1">
                        <Wallet className="h-3.5 w-3.5" />
                        Min: {alert.minSalary}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`alert-${alert.id}`} className="text-sm">
                      {alert.active ? 'Activo' : 'Inactivo'}
                    </Label>
                    <Switch
                      id={`alert-${alert.id}`}
                      checked={alert.active}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Nenhum alerta configurado
              </h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Crie alertas para receber notificações de novas vagas.
              </p>
              <Button onClick={() => setShowForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Criar Primeiro Alerta
              </Button>
            </div>
          )}
        </div>

        {/* Email Preferences */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Preferências de Email</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Configure como quer receber as notificações de vagas.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Resumo diário de vagas</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Vagas urgentes instantâneas</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Newsletter semanal</span>
                  <Switch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CandidatoLayout>
  );
}
