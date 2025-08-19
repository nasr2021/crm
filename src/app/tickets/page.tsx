import { DashboardLayout } from "../../../components/dashbord-layout";
import { TicketsTable } from "./_components/tickets-table";

export default function TicketsPage() {
  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التذاكر</h1>
          <p className="text-muted-foreground">إدارة تذاكر الدعم الفني وطلبات العملاء</p>
        </div>
        <TicketsTable />
      </div>

  )
}
