import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

interface ChecklistItem {
  id: string;
  question: string;
  type: 'boolean' | 'number';
  value?: boolean | number;
}

const checklistTemplate: ChecklistItem[] = [
  { id: '1', question: 'Perimeter fence intact and secure?', type: 'boolean' },
  { id: '2', question: 'Entry/exit points sanitized?', type: 'boolean' },
  { id: '3', question: 'Feed storage area clean and dry?', type: 'boolean' },
  { id: '4', question: 'Number of sick animals observed', type: 'number' },
  { id: '5', question: 'Water quality test passed?', type: 'boolean' },
  { id: '6', question: 'Mortality count', type: 'number' },
];

const mockHistory = [
  { id: '1', date: '2024-01-15', farm: 'Green Valley Farm', compliance: 95 },
  { id: '2', date: '2024-01-14', farm: 'Sunrise Poultry', compliance: 100 },
  { id: '3', date: '2024-01-13', farm: 'Meadow Pig Farm', compliance: 90 },
];

export default function Checklists() {
  const [selectedFarm, setSelectedFarm] = useState('');
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistTemplate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Checklist submitted successfully' });
    setChecklist(checklistTemplate.map(item => ({ ...item, value: undefined })));
  };

  const updateItem = (id: string, value: boolean | number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Biosecurity Checklists</h1>
        <p className="text-muted-foreground mt-1">Complete daily/weekly biosecurity checks</p>
      </div>

      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">New Checklist</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Daily Biosecurity Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Select Farm</Label>
                  <Select value={selectedFarm} onValueChange={setSelectedFarm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a farm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farm1">Green Valley Farm</SelectItem>
                      <SelectItem value="farm2">Sunrise Poultry</SelectItem>
                      <SelectItem value="farm3">Meadow Pig Farm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <Label htmlFor={item.id} className="flex-1">{item.question}</Label>
                      {item.type === 'boolean' ? (
                        <Switch
                          id={item.id}
                          checked={item.value as boolean || false}
                          onCheckedChange={(checked) => updateItem(item.id, checked)}
                        />
                      ) : (
                        <Input
                          id={item.id}
                          type="number"
                          className="w-24"
                          value={item.value as number || ''}
                          onChange={(e) => updateItem(item.id, Number(e.target.value))}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Upload Photo (Optional)</Label>
                  <Input id="image" type="file" accept="image/*" />
                </div>

                <Button type="submit" className="w-full" disabled={!selectedFarm}>
                  Submit Checklist
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Checklist History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Farm</TableHead>
                    <TableHead>Compliance %</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.farm}</TableCell>
                      <TableCell>
                        <span className={record.compliance === 100 ? 'text-success' : 'text-warning'}>
                          {record.compliance}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
