import { ScrollTextIcon } from "lucide-react";
import ButtonBack from "../geral/ButtonBack";

export default function HeaderOrdersButtons() {
  return (
    <div className="flex flex-col pb-5 pl-7 pt-6">
      <div className="pb-7">
        <ButtonBack type="2"/>
      </div>
      <div className="flex gap-3">
        <ScrollTextIcon />
        <h1 className="text-lg font-semibold">Meus Pedidos</h1>
      </div>
    </div>
  );
}
