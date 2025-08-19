import { DashboardLayout } from "../../../components/dashbord-layout";
import DealsKanban from "./_components/deals-kanban";

export default function DealsPage() {
  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الصفقات</h1>
          <p className="text-muted-foreground">إدارة الصفقات ومتابعة مراحل البيع</p>
        </div>
        <DealsKanban />
      </div>
 
  )
}
