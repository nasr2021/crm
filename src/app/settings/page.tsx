import { DashboardLayout } from "../../../components/dashbord-layout";
import SettingsContent from "./_components/settings-content";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة إعدادات النظام والملف الشخصي</p>
        </div>
        <SettingsContent />
      </div>
    </DashboardLayout>
  )
}
