"use client";

import CollapsibleTable from "@/components/CollapsibleTable";
import Container from "@mui/material/Container";
import SearchField from "@/components/SearchField";

import useSWR from "swr";

export function BookSearchResult(query) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/books/search/${query}`,
    fetcher,
  );

  if (error) return <div>خطایی در دریافت داده‌ها پیش آمد!</div>;
  if (isLoading) return <div>درحال دریافت داده‌ها...</div>;

  return (
    <Container>
      <SearchField value={query} sx={{ marginBottom: 40 }} />
      <CollapsibleTable rows={data.books} />
    </Container>
  );
}

export default function BooksSearch(request) {
  const query = request.searchParams["q"] ? request.searchParams["q"] : "";

  if (query === "") {
    return (
      <Container>
        <SearchField />
      </Container>
    );
  }

  return BookSearchResult(query);
}
