"use client";

import { Text, Flex, Button, IconButton } from "@chakra-ui/react";
import { MotionFlex, MotionBox } from "./class";

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
    <MotionFlex
      justify="center"
      align="center"
      gap={1}
      mt={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }} >
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
            bg={active ? "black" : "white"}
            variant={active ? "solid" : "outline"}
            onClick={() => onChange(p)}
          >
            {active ? <Text color="white">{p}</Text> : <Text color="black">{p}</Text>}
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
    </MotionFlex>
  );
}