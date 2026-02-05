 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { AdminLayout } from '@/components/admin/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Badge } from '@/components/ui/badge';
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from '@/components/ui/table';
 import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
 } from '@/components/ui/dropdown-menu';
 import {
   Plus,
   Search,
   MoreHorizontal,
   Eye,
   Edit,
   Trash2,
   FileText,
   Star,
 } from 'lucide-react';
 import { blogPosts } from '@/data/mockJobs';
 
 export default function AdminBlog() {
   const [search, setSearch] = useState('');
   const [statusFilter, setStatusFilter] = useState<string>('all');
 
   const filteredPosts = blogPosts.filter((post) => {
     const matchesSearch =
       post.title.toLowerCase().includes(search.toLowerCase()) ||
       post.author.toLowerCase().includes(search.toLowerCase());
     const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
     return matchesSearch && matchesStatus;
   });
 
   const formatDate = (dateStr: string) => {
     return new Date(dateStr).toLocaleDateString('pt-MZ', {
       day: '2-digit',
       month: 'short',
       year: 'numeric',
     });
   };
 
   return (
     <AdminLayout>
       <div className="p-6 lg:p-8">
         {/* Header */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
           <div>
             <h1 className="text-2xl font-bold text-foreground">Gestão do Blog</h1>
             <p className="text-muted-foreground">{blogPosts.length} artigos no total</p>
           </div>
           <Button asChild>
             <Link to="/admin/blog/novo">
               <Plus className="mr-2 h-4 w-4" />
               Novo Artigo
             </Link>
           </Button>
         </div>
 
         {/* Filters */}
         <div className="mb-6 flex flex-col gap-4 sm:flex-row">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
             <Input
               placeholder="Pesquisar artigos..."
               className="pl-10"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
           </div>
           <div className="flex gap-2">
             <Button
               variant={statusFilter === 'all' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('all')}
             >
               Todos
             </Button>
             <Button
               variant={statusFilter === 'published' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('published')}
             >
               Publicados
             </Button>
             <Button
               variant={statusFilter === 'draft' ? 'default' : 'outline'}
               size="sm"
               onClick={() => setStatusFilter('draft')}
             >
               Rascunhos
             </Button>
           </div>
         </div>
 
         {/* Table */}
         <div className="rounded-xl border border-border bg-card">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Artigo</TableHead>
                 <TableHead>Autor</TableHead>
                 <TableHead>Categoria</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="text-center">Visualizações</TableHead>
                 <TableHead>Data</TableHead>
                 <TableHead className="w-[50px]"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {filteredPosts.map((post) => (
                 <TableRow key={post.id}>
                   <TableCell>
                     <div className="flex items-center gap-3">
                       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                         <FileText className="h-5 w-5 text-muted-foreground" />
                       </div>
                       <div>
                         <div className="flex items-center gap-2">
                           <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                           {post.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                         </div>
                         <p className="text-sm text-muted-foreground">{post.readTime} de leitura</p>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div>
                       <p className="text-foreground">{post.author}</p>
                       <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                     </div>
                   </TableCell>
                   <TableCell>
                     <Badge variant="secondary">{post.category}</Badge>
                   </TableCell>
                   <TableCell>
                     <Badge
                       variant={post.status === 'published' ? 'default' : 'outline'}
                     >
                       {post.status === 'published' && 'Publicado'}
                       {post.status === 'draft' && 'Rascunho'}
                       {post.status === 'archived' && 'Arquivado'}
                     </Badge>
                   </TableCell>
                   <TableCell className="text-center">
                     <div className="flex items-center justify-center gap-1 text-muted-foreground">
                       <Eye className="h-4 w-4" />
                       {post.views || 0}
                     </div>
                   </TableCell>
                   <TableCell className="text-muted-foreground">{formatDate(post.publishedAt)}</TableCell>
                   <TableCell>
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                           <MoreHorizontal className="h-4 w-4" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end">
                         <DropdownMenuItem asChild>
                           <Link to={`/blog/${post.slug}`}>
                             <Eye className="mr-2 h-4 w-4" />
                             Ver
                           </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem asChild>
                           <Link to={`/admin/blog/${post.id}/editar`}>
                             <Edit className="mr-2 h-4 w-4" />
                             Editar
                           </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4" />
                           Eliminar
                         </DropdownMenuItem>
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </div>
       </div>
     </AdminLayout>
   );
 }