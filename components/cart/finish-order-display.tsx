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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useContext, useState } from "react";
import z from "zod";
import { isValidCpf } from "@/utils/cpf";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createOrder } from "@/app/[slug]/menu/actions/create-order";
import { useParams, useSearchParams } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";
import { CartContext } from "@/app/[slug]/menu/contexts/cart";

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
  // const [open, setOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
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
      await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });
      // setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      {/* <form onSubmit={}> */}
      <DialogTrigger asChild>
        <Button className="w-full rounded-full py-6">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Quase lá!</DialogTitle>
          <DialogDescription>
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
                    {/* <FormDescription>This is your plubic</FormDescription> */}
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
                    {/* <FormDescription>This is your plubic</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="rounded-full">
                  Cancelar
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="submit"
                  variant={"destructive"}
                  className="w-full rounded-full"
                >
                  Finalizar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      {/* </form> */}
    </Dialog>
  );
}
