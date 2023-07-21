import { NextApiRequest, NextApiResponse } from "next";
import type { MyValue, errorMessage } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MyValue[] | errorMessage>
) {
  const data: MyValue[] = [
    { id: 1, name: "John", value: 45, group: "A" },
    { id: 2, name: "Sarah", value: 72, group: "B" },
    { id: 3, name: "David", value: 17, group: "A" },
    { id: 4, name: "Emily", value: 94, group: "C" },
    { id: 5, name: "Michael", value: 28, group: "B" },
    { id: 6, name: "Jessica", value: 62, group: "C" },
    { id: 7, name: "Andrew", value: 39, group: "A" },
    { id: 8, name: "Grace", value: 81, group: "B" },
    { id: 9, name: "Anthony", value: 12, group: "A" },
    { id: 10, name: "Rachel", value: 76, group: "C" },
    { id: 11, name: "Thomas", value: 55, group: "B" },
    { id: 12, name: "Olivia", value: 89, group: "A" },
    { id: 13, name: "Daniel", value: 33, group: "C" },
    { id: 14, name: "Madison", value: 70, group: "B" },
    { id: 15, name: "Nicholas", value: 25, group: "A" },
    { id: 16, name: "Lauren", value: 60, group: "C" },
    { id: 17, name: "Christopher", value: 47, group: "B" },
    { id: 18, name: "Ava", value: 97, group: "A" },
    { id: 19, name: "Tyler", value: 20, group: "C" },
    { id: 20, name: "Sophia", value: 84, group: "B" },
  ];

  const { page = 0, limit = 10 } = req.query;
  try {
    const parsedPage = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const start = parsedLimit * parsedPage;
    const end = start + parsedLimit;
    const result = data.slice(start, end);
    // Make the api more realistic by adding a delay
    await delay(2000);
    return res.status(200).json(result);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.status(500).json({ message: e });
    } else if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
  }
}
