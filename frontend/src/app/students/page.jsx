"use client";

import StickyHeaderTable from "@/components/StickyHeaderTable";

const columns = [
  { id: "studentName", label: "نام", minWidth: 150 },
  { id: "studentLastName", label: "نام خانوادگی", minWidth: 150 },
  { id: "studentClassroom", label: "کلاس", minWidth: 150 },
  { id: "studentID", label: "کد ملی", minWidth: 150 },
];

function createData(
  studentName,
  studentLastName,
  studentClassroom,
  studentID,
  repossessionDate,
) {
  return {
    studentName,
    studentLastName,
    studentClassroom,
    studentID,
    repossessionDate,
  };
}

const rows = [
  createData("قاسم", "ابدخافی", "۱۱۵", "۱۲۳۴۵۶۷۸۹۰", "۱۴۰۳-۰۶-۱۷"),
  createData("محمد", "سومبول", "۱۱۴", "۰۹۸۷۶۵۴۳۲۱", "۱۴۰۳-۱۱-۰۵"),
];

export default function StudentsPage() {
  return <StickyHeaderTable rows={rows} columns={columns} />;
}
