"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createroom } from "@/serveractions/createroom"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    roomname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
      description: z.string().min(5, {
        message: "description must be at least 5 characters.",
      }),
      githubrepo: z.string().min(2, {
        message: "repo must be at least 2 characters.",
      }),
      language: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
})

export type roomschema= z.infer<typeof formSchema>;

const CreateForm = () => {
    const router=useRouter();
    const { toast } = useToast()
    const form = useForm<roomschema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomname: "",
            description:"",
            githubrepo:"",
            language:""
        },
      })

      const onSubmit=async (values:roomschema)=> {
        try {
          const res=await createroom(values);
          toast({
            title:"Room created",
           })
           router.push(`/room/${res}`);
        } catch (error) {
          toast({
            title:"Room not created",
            description: "There was a problem with your request.",
            variant:"destructive"
          })
        } 
         
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="roomname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Name</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormDescription>
              This is your public display room name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Description</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormDescription>
              Please describe what your room planning to do.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="githubrepo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>GitHub</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormDescription>
              Provide Github repo Link.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Programming Language</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormDescription>
              Please provide core language used .
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  );
}

export default CreateForm;
