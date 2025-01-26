import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedJobsTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Applied Jobs List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 2].map((item, i) => (
            <TableRow key={i}>
              <TableCell>12-12-2024</TableCell>
              <TableCell>Software Developer</TableCell>
              <TableCell>XYZ Corp.</TableCell>
              <TableCell className="text-right">
                <Badge className="text-right">Applied</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default AppliedJobsTable;
