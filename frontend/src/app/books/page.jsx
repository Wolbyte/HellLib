"use client";

import StickyHeaderTable from "@/components/StickyHeaderTable";

import useSWR from "swr";

const columns = [
  { id: "title", label: "نام کتاب", minWidth: 200 },
  { id: "author", label: "نویسنده", minWidth: 200 },
  { id: "publisher", label: "ناشر", minWidth: 200 },
  { id: "isbn", label: "شناسه", minWidth: 200 },
  { id: "copies", label: "کپی‌ها", minWidth: 100 },
];

export default function BooksPage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/books", fetcher);

  if (error) return <div>خطایی در دریافت داده‌ها پیش آمد!</div>;
  if (isLoading) return <div>درحال دریافت داده‌ها...</div>;

  return <StickyHeaderTable rows={data} columns={columns} />;
}
