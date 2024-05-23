"use client";

import StickyHeaderTable from "@/components/StickyHeaderTable";

import useSWR from "swr";

const columns = [
  { id: "first_name", label: "نام", minWidth: 150 },
  { id: "last_name", label: "نام خانوادگی", minWidth: 150 },
  { id: "class_number", label: "کلاس", minWidth: 150 },
  { id: "national_code", label: "کد ملی", minWidth: 150 },
];

export default function StudentsPage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/students", fetcher);

  if (error) return <div>خطایی در دریافت داده‌ها پیش آمد!</div>;
  if (isLoading) return <div>درحال دریافت داده‌ها...</div>;

  return <StickyHeaderTable rows={data} columns={columns} />;
}
