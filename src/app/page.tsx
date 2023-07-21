"use client";

import styles from "./page.module.css";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import useSWR from "swr";

import type { MyValue } from "../types";

export default function Home() {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const {
    data: rows,
    error,
    isLoading,
  } = useSWR<MyValue[]>(`/api/user?page=${pageIndex}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  if (error) return <div>Something went wrong...</div>;

  return (
    <main className={styles.main}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading && <CircularProgress />}
          {!isLoading && rows && (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {rows.map((row: MyValue) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            onClick={() => {
              setPageIndex(0);
            }}
          >
            First
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setPageIndex(1);
            }}
          >
            Second
          </Button>
        </div>
      </div>
    </main>
  );
}
