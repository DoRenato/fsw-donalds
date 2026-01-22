"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { isValidCpf, removeCpfPunctuation } from "@/utils/cpf";
import z from "zod/v3";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
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

export default function ListOrders() {
  const [isPendng, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });
  const onSubmit = async (data: FormSchema) => {
    try {
      startTransition(async () => {
        router.push(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center gap-3 px-5 pb-10"
        >
          <div className="">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input placeholder="Digite seu CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <Button
              type="submit"
              variant={"destructive"}
              className="rounded-full"
              disabled={isPendng}
            >
              Buscar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
