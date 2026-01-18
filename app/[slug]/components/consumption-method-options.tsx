import { Button } from "@/components/ui/button";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionsProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  slug: string;
  option: ConsumptionMethod;
}

export default function ConsumptionMethodOptions({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug
}: ConsumptionMethodOptionsProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-[75px] w-[75px]">
          <Image src={imageUrl} alt={imageAlt} fill />
        </div>
        <Button variant="default" className="bg-gray-200 hover:bg-gray-300">
          <Link href={`${slug}/menu?consumptionMethod=${option}`}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
}
