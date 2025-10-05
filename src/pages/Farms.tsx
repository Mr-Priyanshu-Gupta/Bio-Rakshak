import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Farm {
  id: string;
  name: string;
  species: string;
  capacity: number;
  current: number;
  location: string;
}

const mockFarms: Farm[] = [
  { id: '1', name: 'Green Valley Farm', species: 'Pig', capacity: 500, current: 450, location: 'North District' },
  { id: '2', name: 'Sunrise Poultry', species: 'Poultry', capacity: 800, current: 720, location: 'East District' },
  { id: '3', name: 'Meadow Pig Farm', species: 'Pig', capacity: 600, current: 580, location: 'South District' },
];

export default function Farms() {
  const [farms, setFarms] = useState<Farm[]>(mockFarms);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    capacity: '',
    current: '',
    location: '',
  });

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(search.toLowerCase()) ||
    farm.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFarm) {
      setFarms(farms.map(f => f.id === editingFarm.id ? { ...editingFarm, ...formData, capacity: Number(formData.capacity), current: Number(formData.current) } : f));
      toast({ title: 'Farm updated successfully' });
    } else {
      const newFarm: Farm = {
        id: Date.now().toString(),
        ...formData,
        capacity: Number(formData.capacity),
        current: Number(formData.current),
      };
      setFarms([...farms, newFarm]);
      toast({ title: 'Farm added successfully' });
    }
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (farm: Farm) => {
    setEditingFarm(farm);
    setFormData({
      name: farm.name,
      species: farm.species,
      capacity: farm.capacity.toString(),
      current: farm.current.toString(),
      location: farm.location,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFarms(farms.filter(f => f.id !== id));
    toast({ title: 'Farm deleted successfully' });
  };

  const resetForm = () => {
    setFormData({ name: '', species: '', capacity: '', current: '', location: '' });
    setEditingFarm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Farm Management</h1>
          <p className="text-muted-foreground mt-1">Manage your farm facilities</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Farm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFarm ? 'Edit Farm' : 'Add New Farm'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Farm Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Select value={formData.species} onValueChange={(value) => setFormData({ ...formData, species: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pig">Pig</SelectItem>
                    <SelectItem value="Poultry">Poultry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current">Current Count</Label>
                  <Input
                    id="current"
                    type="number"
                    value={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingFarm ? 'Update Farm' : 'Add Farm'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Farms</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farm Name</TableHead>
                <TableHead>Species</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarms.map((farm) => (
                <TableRow key={farm.id}>
                  <TableCell className="font-medium">{farm.name}</TableCell>
                  <TableCell>{farm.species}</TableCell>
                  <TableCell>{farm.capacity}</TableCell>
                  <TableCell>{farm.current}</TableCell>
                  <TableCell>{farm.location}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(farm)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(farm.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
