"use client";

import Button from "@mui/material/Button";

import StickyHeaderTable from "@/components/StickyHeaderTable";

import useSWR from "swr";

const columns = [
  { id: "student.first_name", label: "نام دانش‌آموز" },
  { id: "student.last_name", label: "نام‌خانوادگی دانش‌آموز" },
  { id: "student.class_number", label: "کلاس" },
  { id: "student.national_code", label: "کد ملی" },
  { id: "book.title", label: "نام کتاب" },
  { id: "return_date", label: "تاریخ باز پس‌گیری" },
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function HistoryActions(recordData, rowList, setRowList) {
  return (
    <Button
      onClick={() => {
        fetch(`/api/books/repossess/${recordData.id}`);

        setRowList(rowList.filter((row) => row.id != recordData.id));
      }}
    >
      پس‌گرفتن
    </Button>
  );
}

export default function HistoryPage() {
  const { data, error, isLoading } = useSWR(
    "/api/books/active_records",
    fetcher,
  );

  if (error) return <div>خطایی در دریافت داده‌ها پیش آمد!</div>;
  if (isLoading) return <div>درحال دریافت داده‌ها...</div>;

  return (
    <StickyHeaderTable
      columns={columns}
      rows={data}
      actionFn={HistoryActions}
    />
  );
}
