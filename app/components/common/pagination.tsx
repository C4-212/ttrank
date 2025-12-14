"use client";

import { Flex, Button, IconButton } from "@chakra-ui/react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const range = 2;
  const start = Math.max(1, page - range);
  const end = Math.min(totalPages, page + range);

  return (
    <Flex justify="center" align="center" gap={1} mt={4}>
      <IconButton
        aria-label="이전 페이지"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        size="sm"
      >
        ◀
      </IconButton>

      {Array.from({ length: end - start + 1 }).map((_, i) => {
        const p = start + i;
        const active = p === page;

        return (
          <Button
            key={p}
            size="sm"
            variant={active ? "solid" : "outline"}
            onClick={() => onChange(p)}
          >
            {p}
          </Button>
        );
      })}

      <IconButton
        aria-label="다음 페이지"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        size="sm"
      >
        ▶
      </IconButton>
    </Flex>
  );
}