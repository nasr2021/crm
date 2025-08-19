import { DashboardLayout } from "../../../components/dashbord-layout";
import { DashboardWidgets } from "./_components/dashboard-widgets";

export default function DashboardPage() {
  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً بك في نظام إدارة العملاء</p>
        </div>
        <DashboardWidgets />
      </div>
  )
}
