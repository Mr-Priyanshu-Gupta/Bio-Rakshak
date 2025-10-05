import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const statsCards = [
  { title: 'Disease Incidents', value: '2', status: 'Low Risk', color: 'text-success' },
  { title: 'Mortality Rate', value: '0.8%', status: 'Normal', color: 'text-success' },
  { title: 'Sick Animals', value: '12', status: 'Monitoring', color: 'text-warning' },
  { title: 'Quarantine Cases', value: '1', status: 'Active', color: 'text-accent' },
];

const recentIncidents = [
  { id: '1', date: '2024-01-10', farm: 'Green Valley Farm', type: 'Minor Illness', severity: 'Low', status: 'Resolved' },
  { id: '2', date: '2024-01-08', farm: 'Sunrise Poultry', type: 'Feed Contamination', severity: 'Medium', status: 'Investigating' },
  { id: '3', date: '2024-01-05', farm: 'Meadow Pig Farm', type: 'Biosecurity Breach', severity: 'High', status: 'Resolved' },
];

export default function Reports() {
  const handleDownloadReport = () => {
    console.log('Generating PDF report...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">View compliance reports and statistics</p>
        </div>
        <Button onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Recent Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.farm}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={incident.severity === 'High' ? 'destructive' : incident.severity === 'Medium' ? 'default' : 'secondary'}
                    >
                      {incident.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={incident.status === 'Resolved' ? 'outline' : 'default'}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Overall Compliance Rate</span>
            <span className="text-lg font-bold text-success">94%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Completed Checklists (This Month)</span>
            <span className="text-lg font-bold">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Pending Actions</span>
            <span className="text-lg font-bold text-warning">8</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
