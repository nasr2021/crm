import { DashboardLayout } from "../../../components/dashbord-layout";
import { AnalyticsContent } from "./_components/analytics-content";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التحليلات</h1>
          <p className="text-muted-foreground">تحليل أداء الأعمال والإحصائيات المفصلة</p>
        </div>
        <AnalyticsContent />
      </div>
    </DashboardLayout>
  )
}
