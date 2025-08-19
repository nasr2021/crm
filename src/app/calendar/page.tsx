import React from 'react'
import { DashboardLayout } from '../../../components/dashbord-layout'
import { CalendarView } from './_components/calendar-view'

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التقويم</h1>
          <p className="text-muted-foreground">عرض شامل للمهام والصفقات والاجتماعات</p>
        </div>
        <CalendarView />
      </div>
    </DashboardLayout>
  )
}
