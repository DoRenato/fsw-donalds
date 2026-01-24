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
  slug,
}: ConsumptionMethodOptionsProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="h-19 w-19 relative">
          <Image src={imageUrl} alt={imageAlt} fill />
        </div>

        <Link href={`${slug}/menu?consumptionMethod=${option}`}>
          <Button variant="secondary">{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
}
