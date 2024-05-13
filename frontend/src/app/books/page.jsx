"use client";

import StickyHeaderTable from "@/components/StickyHeaderTable";

const columns = [
  { id: "name", label: "نام کتاب", minWidth: 200 },
  { id: "writer", label: "نویسنده", minWidth: 200 },
  { id: "publisher", label: "ناشر", minWidth: 200 },
  { id: "copies", label: "کپی‌ها", minWidth: 100 },
];

function createData(name, writer, publisher, copies) {
  return { name, writer, publisher, copies };
}

const rows = [
  createData("روزی روزگاری قلمبه", "قلمبه", "انتشارات قلمبه", "۲۴"),
  createData("روزی روزگاری تلمبه", "تلمبه", "انتشارات تلمبه", "۳۷"),
  createData("روزی روزگاری سلمبه", "سلمبه", "انتشارات سلمبه", "۲۵"),
  createData("روزی روزگاری ملمبه", "ملمبه", "انتشارات ملمبه", "۶۷"),
  createData("روزی روزگاری فلمبه", "فلمبه", "انتشارات فلمبه", "۴۹"),
  createData("روزی روزگاری شلمبه", "شلمبه", "انتشارات شلمبه", "۵۰"),
  createData("روزی روزگاری ذلمبه", "ذلمبه", "انتشارات ذلمبه", "۵۵"),
];

export default function BooksPage() {
  return <StickyHeaderTable rows={rows} columns={columns} />;
}
