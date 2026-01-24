import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import React, { useContext, useState, useTransition } from "react";
import z from "zod";
import { isValidCpf, removeCpfPunctuation } from "@/utils/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createOrder } from "@/app/[slug]/menu/actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";
import { toast } from "sonner";
import { Check } from "lucide-react";
import Link from "next/link";

interface FinishOrderDisplayProps {
  children: React.ReactNode;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome é obrigatório.",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório.",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF Inválido.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function FinishOrderDisplay({
  children,
}: FinishOrderDisplayProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [sucessOpen, setSucessOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const [isPendng, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });
  const onSubmit = async (data: FormSchema) => {
    try {
      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;
      startTransition(async () => {
        await createOrder({
          consumptionMethod,
          customerCpf: removeCpfPunctuation(data.cpf),
          customerName: data.name,
          products,
          slug,
        });
        setFormOpen(false);
        setSucessOpen(true);
        toast.success("Pedido finalizado com sucesso!");
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogTrigger asChild>
          <Button className="w-full rounded-full py-6">{children}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106.25 md:w-100">
          <DialogHeader>
            <DialogTitle className="text-center">Quase lá!</DialogTitle>
            <DialogDescription className="text-center">
              Para finalizar o seu pedido, insira os dados abaixo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="pb-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu nome</FormLabel>
                      <FormControl className="mb-0">
                        <Input placeholder="Digite seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pb-7">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu CPF" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* footer */}
              <div className="flex gap-2">
                <div className="w-full">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="w-full rounded-full"
                      disabled={isPendng}
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                </div>
                <div className="w-full">
                  <Button
                    type="submit"
                    variant={"destructive"}
                    className="w-full rounded-full"
                    disabled={isPendng}
                  >
                    Finalizar
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={sucessOpen} onOpenChange={setSucessOpen}>
        <form>
          {/* <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger> */}
          <DialogContent className="sm:max-w-106.25 md:w-100" showCloseButton={false}>
            <DialogHeader>
              <div className="flex justify-center pb-5">
                <Check className="w-15 h-15 rounded-full border bg-red-600 p-3 text-white" />
              </div>
              <DialogTitle>Pedido Efetuado!</DialogTitle>
              <DialogDescription className="pb-5">
                Seu pedido foi realizado com suecesso!
              </DialogDescription>
            </DialogHeader>
              <div className="grid grid-cols-2 gap-2">
                <Link href={"/orders"}>
                  <DialogClose asChild>
                    <Button className="w-full rounded-full bg-red-600 text-white">
                      Ver Pedidos
                    </Button>
                  </DialogClose>
                </Link>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    className="rounded-full font-semibold"
                  >
                    Continuar
                  </Button>
                </DialogClose>
              </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
