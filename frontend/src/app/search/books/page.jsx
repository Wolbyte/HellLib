import CollapsibleTable from "@/components/CollapsibleTable";
import { enToFaDigit } from "@/helpers";

export default function Home() {
  function createData(name, writer, publisher, copies) {
    return {
      name,
      writer,
      publisher,
      copies: enToFaDigit(copies.toString()),
      history: [
        {
          customerName: "محمد",
          customerLastName: "سومبول",
          customerClassroom: 114,
          repossessionDate: "2020-01-05",
        },
        {
          customerName: "قاسم",
          customerLastName: "ابدخافی",
          customerClassroom: 115,
          repossessionDate: "2020-01-02",
        },
      ],
    };
  }

  const rows = [
    createData("روزی روزگاری قلمبه", "قلمبه", "انتشارات قلمبه", 24, 3.99),
    createData("روزی روزگاری تلمبه", "تلمبه", "انتشارات تلمبه", 37, 4.99),
    createData("روزی روزگاری سلمبه", "سلمبه", "انتشارات سلمبه", 24, 3.79),
    createData("روزی روزگاری ملمبه", "ملمبه", "انتشارات ملمبه", 67, 2.5),
    createData("روزی روزگاری فلمبه", "فلمبه", "انتشارات فلمبه", 49, 1.5),
    createData("روزی روزگاری شلمبه", "شلمبه", "انتشارات شلمبه", 50, 2),
    createData("روزی روزگاری ذلمبه", "ذلمبه", "انتشارات ذلمبه", 50, 2),
  ];

  return <CollapsibleTable rows={rows} />;
}
