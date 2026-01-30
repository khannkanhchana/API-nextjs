"use client"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  toast
} from "sonner"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "./ui/field"
import {
  Button
} from "./ui/button"
import {
  Input
} from "./ui/input"
import {
  Textarea
} from "./ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"
import { Form } from "./ui/form"
import { useState } from "react"

const formSchema = z.object({
  title: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(2),
  description: z.string(),
  images: z.string()
});

export default function ProductForm() {

  const [files, setFiles] = useState < File[] | null > (null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      description: "",
      images: "",
    },
  })

  //
  const {
    handleSubmit, 
    register,
    formState:{ errors }
} = form;

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <Field>
  <FieldLabel htmlFor="title">Title</FieldLabel>
  <Input 
    id="title" 
    placeholder="Mac book pro 16 inch"
    
    {...register("title")}
  />
  <FieldDescription>This is your public title of product.</FieldDescription>
  <FieldError>{form.formState.errors.title?.message}</FieldError>
</Field>
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            <Field>
  <FieldLabel htmlFor="price">price</FieldLabel>
  <Input 
    id="price" 
    placeholder="200 USD"
    type="number"
    
    
    {...register("price", { valueAsNumber: true })}
  />
  <FieldDescription>This is input price of product</FieldDescription>
  <FieldError>{errors.price?.message}</FieldError>
</Field>
          </div>
          
          <div className="col-span-6">
            <Field>
  <FieldLabel htmlFor="category">Category</FieldLabel>
  <Select 
    
    {...register("category")}
  >
    <SelectTrigger id="category">
      <SelectValue placeholder="Select a verified email to display" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </Select>
  <FieldDescription>Category of product</FieldDescription>
  <FieldError>{errors.category?.message}</FieldError>
</Field>
          </div>
          
        </div>
        <Field>
  <FieldLabel htmlFor="description">description of product</FieldLabel>
  <Textarea 
    id="description" 
    placeholder="Description of product"
    
    {...register("description")}
  />
  <FieldDescription>Description of product</FieldDescription>
  <FieldError>{errors.description?.message}</FieldError>
</Field>
        <Field>
  <FieldLabel htmlFor="images">Product image</FieldLabel>
  <Input 
    id="images" 
    placeholder="Placeholder"
    {...register("images")}
  />
  <FieldDescription>Select a file to upload.</FieldDescription>
  <FieldError>{errors.images?.message}</FieldError>
</Field>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}