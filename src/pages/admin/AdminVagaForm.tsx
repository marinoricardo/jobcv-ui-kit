 import { useState } from 'react';
 import { useNavigate, useParams } from 'react-router-dom';
 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 import { Switch } from '@/components/ui/switch';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { ArrowLeft, Save, Eye } from 'lucide-react';
 import { mockJobs, categories, locations } from '@/data/mockJobs';
 
 export default function AdminVagaForm() {
   const { id } = useParams();
   const navigate = useNavigate();
   const isEditing = !!id;
 
   const existingJob = isEditing ? mockJobs.find((j) => j.id === id) : null;
 
   const [form, setForm] = useState({
     title: existingJob?.title || '',
     company: existingJob?.company || '',
     location: existingJob?.location || '',
     category: existingJob?.category || '',
     type: existingJob?.type || 'full-time',
     salary: existingJob?.salary || '',
     description: existingJob?.description || '',
     requirements: existingJob?.requirements.join('\n') || '',
     benefits: existingJob?.benefits.join('\n') || '',
     isRemote: existingJob?.isRemote || false,
     isUrgent: existingJob?.isUrgent || false,
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // In real app, this would save to backend
     navigate('/admin/vagas');
   };
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex items-center gap-4">
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
             <ArrowLeft className="h-5 w-5" />
           </Button>
           <div>
             <h1 className="text-2xl font-bold text-foreground">
               {isEditing ? 'Editar Vaga' : 'Nova Vaga'}
             </h1>
             <p className="text-muted-foreground">
               {isEditing ? 'Actualize os detalhes da vaga' : 'Preencha os dados para criar uma nova vaga'}
             </p>
           </div>
         </div>
 
         <form onSubmit={handleSubmit}>
           <div className="grid gap-6 lg:grid-cols-3">
             {/* Main Form */}
             <div className="lg:col-span-2 space-y-6">
               <Card>
                 <CardHeader>
                   <CardTitle>Informações Básicas</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="grid gap-4 sm:grid-cols-2">
                     <div className="space-y-2">
                       <Label htmlFor="title">Título da Vaga *</Label>
                       <Input
                         id="title"
                         placeholder="Ex: Desenvolvedor Frontend Senior"
                         value={form.title}
                         onChange={(e) => setForm({ ...form, title: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="company">Empresa *</Label>
                       <Input
                         id="company"
                         placeholder="Nome da empresa"
                         value={form.company}
                         onChange={(e) => setForm({ ...form, company: e.target.value })}
                         required
                       />
                     </div>
                   </div>
 
                   <div className="grid gap-4 sm:grid-cols-3">
                     <div className="space-y-2">
                       <Label htmlFor="location">Localização *</Label>
                       <Select
                         value={form.location}
                         onValueChange={(value) => setForm({ ...form, location: value })}
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Seleccione" />
                         </SelectTrigger>
                         <SelectContent>
                           {locations.slice(1).map((loc) => (
                             <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="category">Categoria *</Label>
                       <Select
                         value={form.category}
                         onValueChange={(value) => setForm({ ...form, category: value })}
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Seleccione" />
                         </SelectTrigger>
                         <SelectContent>
                           {categories.slice(1).map((cat) => (
                             <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="type">Tipo de Contrato *</Label>
                       <Select
                         value={form.type}
                         onValueChange={(value) => setForm({ ...form, type: value as 'full-time' | 'part-time' })}
                       >
                         <SelectTrigger>
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="full-time">Tempo Integral</SelectItem>
                           <SelectItem value="part-time">Part-time</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="salary">Salário (opcional)</Label>
                     <Input
                       id="salary"
                       placeholder="Ex: 80.000 - 120.000 MZN"
                       value={form.salary}
                       onChange={(e) => setForm({ ...form, salary: e.target.value })}
                     />
                   </div>
                 </CardContent>
               </Card>
 
               <Card>
                 <CardHeader>
                   <CardTitle>Detalhes da Vaga</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="space-y-2">
                     <Label htmlFor="description">Descrição *</Label>
                     <Textarea
                       id="description"
                       placeholder="Descreva a vaga, responsabilidades e o que procura num candidato..."
                       className="min-h-[120px]"
                       value={form.description}
                       onChange={(e) => setForm({ ...form, description: e.target.value })}
                       required
                     />
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="requirements">Requisitos (um por linha)</Label>
                     <Textarea
                       id="requirements"
                       placeholder="Experiência mínima de 3 anos&#10;Licenciatura em...&#10;Fluência em inglês"
                       className="min-h-[120px]"
                       value={form.requirements}
                       onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                     />
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="benefits">Benefícios (um por linha)</Label>
                     <Textarea
                       id="benefits"
                       placeholder="Plano de saúde&#10;Bónus anual&#10;Horário flexível"
                       className="min-h-[100px]"
                       value={form.benefits}
                       onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                     />
                   </div>
                 </CardContent>
               </Card>
             </div>
 
             {/* Sidebar */}
             <div className="space-y-6">
               <Card>
                 <CardHeader>
                   <CardTitle>Opções</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-medium text-foreground">Trabalho Remoto</p>
                       <p className="text-sm text-muted-foreground">Esta vaga permite trabalho remoto</p>
                     </div>
                     <Switch
                       checked={form.isRemote}
                       onCheckedChange={(checked) => setForm({ ...form, isRemote: checked })}
                     />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-medium text-foreground">Urgente</p>
                       <p className="text-sm text-muted-foreground">Destacar como vaga urgente</p>
                     </div>
                     <Switch
                       checked={form.isUrgent}
                       onCheckedChange={(checked) => setForm({ ...form, isUrgent: checked })}
                     />
                   </div>
                 </CardContent>
               </Card>
 
               <Card>
                 <CardHeader>
                   <CardTitle>Acções</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                   <Button type="submit" className="w-full">
                     <Save className="mr-2 h-4 w-4" />
                     {isEditing ? 'Guardar Alterações' : 'Publicar Vaga'}
                   </Button>
                   <Button type="button" variant="outline" className="w-full">
                     <Eye className="mr-2 h-4 w-4" />
                     Pré-visualizar
                   </Button>
                 </CardContent>
               </Card>
             </div>
           </div>
         </form>
       </div>
     </AdminLayout>
   );
 }