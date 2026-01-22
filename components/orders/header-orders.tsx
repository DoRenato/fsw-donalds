import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

export default function HeaderOrdersButtons() {
  return (
    <div className="flex flex-col pb-5 pl-7 pt-6">
      <div className="pb-7">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="rounded-full bg-gray-200 p-6"
        >
          <Link href={"/fsw-donalds"}>
            <ChevronLeftIcon />
          </Link>
        </Button>
      </div>
      <div className="flex gap-3">
        <ScrollTextIcon />
        <h1 className="text-lg font-semibold">Meus Pedidos</h1>
      </div>
    </div>
  );
}
