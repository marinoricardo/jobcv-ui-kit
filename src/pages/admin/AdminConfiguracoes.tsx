 import { useState } from 'react';
 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Switch } from '@/components/ui/switch';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Save, Globe, Mail, Bell, Shield, Palette } from 'lucide-react';
 
 export default function AdminConfiguracoes() {
   const [settings, setSettings] = useState({
     siteName: 'JobCV Moçambique',
     siteDescription: 'A melhor plataforma de emprego em Moçambique',
     contactEmail: 'contacto@meucv.app',
     supportEmail: 'suporte@meucv.app',
     enableNotifications: true,
     enableEmailAlerts: true,
     requireEmailVerification: true,
     allowSocialLogin: false,
     maintenanceMode: false,
   });
 
   const handleSave = () => {
     // Save settings
   };
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex items-center justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
             <p className="text-muted-foreground">Gerencie as configurações da plataforma</p>
           </div>
           <Button onClick={handleSave}>
             <Save className="mr-2 h-4 w-4" />
             Guardar Alterações
           </Button>
         </div>
 
         <Tabs defaultValue="general" className="space-y-6">
           <TabsList>
             <TabsTrigger value="general" className="gap-2">
               <Globe className="h-4 w-4" />
               Geral
             </TabsTrigger>
             <TabsTrigger value="email" className="gap-2">
               <Mail className="h-4 w-4" />
               Email
             </TabsTrigger>
             <TabsTrigger value="notifications" className="gap-2">
               <Bell className="h-4 w-4" />
               Notificações
             </TabsTrigger>
             <TabsTrigger value="security" className="gap-2">
               <Shield className="h-4 w-4" />
               Segurança
             </TabsTrigger>
           </TabsList>
 
           <TabsContent value="general">
             <Card>
               <CardHeader>
                 <CardTitle>Configurações Gerais</CardTitle>
                 <CardDescription>Informações básicas do site</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="siteName">Nome do Site</Label>
                     <Input
                       id="siteName"
                       value={settings.siteName}
                       onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="contactEmail">Email de Contacto</Label>
                     <Input
                       id="contactEmail"
                       type="email"
                       value={settings.contactEmail}
                       onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="siteDescription">Descrição do Site</Label>
                   <Textarea
                     id="siteDescription"
                     value={settings.siteDescription}
                     onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                   />
                 </div>
                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
                   <div>
                     <p className="font-medium text-foreground">Modo de Manutenção</p>
                     <p className="text-sm text-muted-foreground">
                       Quando activado, apenas administradores podem aceder ao site
                     </p>
                   </div>
                   <Switch
                     checked={settings.maintenanceMode}
                     onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           <TabsContent value="email">
             <Card>
               <CardHeader>
                 <CardTitle>Configurações de Email</CardTitle>
                 <CardDescription>Configure os emails da plataforma</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="grid gap-4 sm:grid-cols-2">
                   <div className="space-y-2">
                     <Label htmlFor="supportEmail">Email de Suporte</Label>
                     <Input
                       id="supportEmail"
                       type="email"
                       value={settings.supportEmail}
                       onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                     />
                   </div>
                 </div>
                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
                   <div>
                     <p className="font-medium text-foreground">Alertas por Email</p>
                     <p className="text-sm text-muted-foreground">
                       Enviar emails automáticos para candidatos e empresas
                     </p>
                   </div>
                   <Switch
                     checked={settings.enableEmailAlerts}
                     onCheckedChange={(checked) => setSettings({ ...settings, enableEmailAlerts: checked })}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           <TabsContent value="notifications">
             <Card>
               <CardHeader>
                 <CardTitle>Notificações</CardTitle>
                 <CardDescription>Configure as notificações do sistema</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
                   <div>
                     <p className="font-medium text-foreground">Notificações Push</p>
                     <p className="text-sm text-muted-foreground">
                       Activar notificações push para utilizadores
                     </p>
                   </div>
                   <Switch
                     checked={settings.enableNotifications}
                     onCheckedChange={(checked) => setSettings({ ...settings, enableNotifications: checked })}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
 
           <TabsContent value="security">
             <Card>
               <CardHeader>
                 <CardTitle>Segurança</CardTitle>
                 <CardDescription>Configure as opções de segurança</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
                   <div>
                     <p className="font-medium text-foreground">Verificação de Email Obrigatória</p>
                     <p className="text-sm text-muted-foreground">
                       Exigir verificação de email para novos utilizadores
                     </p>
                   </div>
                   <Switch
                     checked={settings.requireEmailVerification}
                     onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
                   <div>
                     <p className="font-medium text-foreground">Login Social</p>
                     <p className="text-sm text-muted-foreground">
                       Permitir login com Google, Facebook, etc.
                     </p>
                   </div>
                   <Switch
                     checked={settings.allowSocialLogin}
                     onCheckedChange={(checked) => setSettings({ ...settings, allowSocialLogin: checked })}
                   />
                 </div>
               </CardContent>
             </Card>
           </TabsContent>
         </Tabs>
       </div>
     </AdminLayout>
   );
 }