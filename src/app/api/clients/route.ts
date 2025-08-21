import { NextResponse } from 'next/server';

// Mock client data
const mockClients = [
  {
    id: "1",
    name: "أحمد محمد",
    company: "شركة التقنية المتقدمة",
    email: "ahmed@tech-advanced.com",
    phone: "+970-59-123-4567",
    createdAt: "2024-01-15",
    status: "active",
    deals: 3,
    tasks: 2,
    tickets: 1,
  },
  {
    id: "2",
    name: "فاطمة أحمد",
    company: "مؤسسة الابتكار",
    email: "fatima@innovation.ps",
    phone: "+970-59-234-5678",
    createdAt: "2024-01-20",
    status: "active",
    deals: 1,
    tasks: 0,
    tickets: 0,
  },
  {
    id: "3",
    name: "محمد علي",
    company: "شركة البناء الحديث",
    email: "mohammed@modern-build.com",
    phone: "+970-59-345-6789",
    createdAt: "2024-02-01",
    status: "inactive",
    deals: 0,
    tasks: 1,
    tickets: 2,
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({ data: mockClients });
}