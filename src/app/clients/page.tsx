import { DashboardLayout } from "../../../components/dashbord-layout";
import { ClientsTable } from "./_component/clients-table";

export default function ClientsPage() {
  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">العملاء</h1>
          <p className="text-muted-foreground">إدارة قاعدة بيانات العملاء</p>
        </div>
        <ClientsTable />
      </div>
  )
}
