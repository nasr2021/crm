import { DashboardLayout } from "../../../components/dashbord-layout";
import { TasksManager } from "../tickets/_components/tickets-manager";

export default function TasksPage() {
  return (
  
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المهام</h1>
          <p className="text-muted-foreground">إدارة المهام ومتابعة التقدم</p>
        </div>
        <TasksManager />
      </div>
 
  )
}
