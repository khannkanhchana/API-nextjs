"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import { SelectValue } from "@radix-ui/react-select";
import ImageUpload from "../image-upload";
import { uploadImageToServer} from "@/lib/data/upload-file";

//1. set up validation rule

// interface ImageFile {
//   file: File;
//   preview: string;
// }
// ==========================
// ZOD SCHEMA
// ==========================
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Product title must be at least 5 characters.")
    .max(200, "Product title must be at most 200 characters."),
  price: z.coerce.number().positive(),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(100, "Description must be at most 100 characters."),
  category: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific category.",
    }),
  images: z.array(z.instanceof(File)).default([]),
});

type FormValues = z.infer<typeof formSchema>;

// ==========================
// COMPONENT
// ==========================
export function ProductForm2() {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      description: "",
      images: [],
    },
  });

    // Connects the ImageUpload component to React Hook Form
  const onhandleImageChange = (images: ImageFile[]) => {
    const files = images.map((img) => img.file);
    form.setValue("images", files, { shouldValidate: true });
  };

   async function onSubmit(data: FormValues) {
    const loadingToast = toast.loading("Uploading product and images...");
    
    try {
      // 1. Map through images and upload each
      const uploadPromises = data.images.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        // This calls your Axios function
        const res = await uploadImageToServer(formData);
        
        console.log("Axios API Response:", res);

        /**
         * URL EXTRACTION LOGIC
         * Depending on your API, the URL might be in different places.
         * Common keys: url, location, link, or the first item of an array.
         */
        const extractedUrl = 
          res?.data?.location || 
          res?.data?.url || 
          res?.data?.link || 
          (Array.isArray(res?.data) ? res.data[0]?.location || res.data[0]?.url : null);

        if (!extractedUrl) {
          throw new Error("API success, but no URL found in response");
        }

        return extractedUrl;
      });

      // 2. Wait for all uploads to finish
      const imageUrls = await Promise.all(uploadPromises);

      // 3. Create the final object to send to your Database
      const finalPayload = {
        ...data,
        images: imageUrls, // Replaces File[] with string[] (URLs)
      };

      toast.dismiss(loadingToast);
      toast.success("Submission Successful!");

      console.log("FINAL DATA FOR DATABASE:", finalPayload);

      // Show final result in a toast
      toast("Payload Sent", {
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-900 p-4 text-white text-[10px] overflow-x-auto">
            {JSON.stringify(finalPayload, null, 2)}
          </pre>
        ),
      });

     } catch (error: unknown) {
        toast.dismiss(loadingToast);
        if (error instanceof Error) {
          toast.error(error.message || "Failed to submit form");
          console.error("Submit Error:", error);
        } else {
          toast.error("Failed to submit form");
          console.error("Submit Error:", error);
        }
      }
  }
// ==========================
// IMAGE TYPE
// ==========================
  interface ImageFile {
    id: string;
    file: File;
    preview: string;
    progress: number;
    status: "uploading" | "completed" | "error";
    error?: string;
  }


    //  store uploaded image URLs
  // const [imageUrls, setImageUrls] = React.useState<string[]>([]);
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: "",
  //     description: "",
  //     price: 0,
  //     category: "",
  //   },
  // });

  // ==========================
  // IMAGE UPLOAD HANDLER
  // ==========================
//   const onHandleImagesChange = async (images: ImageFile[]) => {
//   const urls: string[] = [];

//   for (const image of images) {
//     const formData = new FormData();
//     formData.append("file", image.file);

//     const res = await uploadImageToServer(formData);

//     // MUST return URL from server
//     if (res?.url) {
//       urls.push(res.url);
//     }
//   }

//   setImageUrls(urls);
// };




  // const onHandleImagesChange = async (images: ImageFile[]) => {
  //   const urls: string[] = [];

  //   for (const image of images) {
  //     const formData = new FormData();
  //     formData.append("file", image.file);

  //     const res = await uploadImageToServer(formData);

  //     // ⚠️ adjust if your API response key is different
  //     if (res?.data?.url) {
  //       urls.push(res.data.url);
  //     }
  //   }

  //   setImageUrls(urls);
  // };


  // ==========================
  // SUBMIT
  // ==========================
  // function onSubmit(data: z.infer<typeof formSchema>) {

  //   const payload = {
  //     title: data.title,
  //     price: data.price,
  //     description: data.description,
  //     categoryId: Number(data.category),
  //     images: imageUrls,
  //   };

  //   console.log("FINAL SUBMIT DATA : ", payload);

  //   toast("Submitted!", {
  //     description: (
  //       <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4">
  //         <code>{JSON.stringify(payload, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  // }

  // function onSubmit(data: z.infer<typeof formSchema>) {
  //   toast("You submitted the following values:", {
  //     description: (
  //       <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
  //         <code>{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //     position: "bottom-right",
  //     classNames: {
  //       content: "flex flex-col gap-2",
  //     },
  //     style: {
  //       "--border-radius": "calc(var(--radius)  + 4px)",
  //     } as React.CSSProperties,
  //   });
  //   // console.log(data);
  // }
//   function onSubmit(data: z.infer<typeof formSchema>) {
//   const payload = {
//     title: data.title,
//     price: data.price,
//     description: data.description,
//     categoryId: Number(data.category),
//     images: imageUrls, 
//   };

//   console.log("FINAL SUBMIT ", payload);

//   toast("You submitted the following values:", {
//     description: (
//       <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4">
//         <code>{JSON.stringify(payload, null, 2)}</code>
//       </pre>
//     ),
//     position: "bottom-right",
//   });
// }


  // const onhadleImagesChange = async (images: ImageFile[]) => {
  //   // console.log('images: ', images)
  //   const formData = new FormData()
  //   for(const image of images){
  //     formData.append("file", image.file)
  //     const res = await uploadImageToServer(formData)
  //     console.log("res: ", res)
  //   }

  //   // uploadImageToServer()
  // };



  // ==========================
  // JSX
  // ==========================

  return (
    <Card className="w-2/4">
      <CardHeader>
        <CardTitle>Product Form</CardTitle>
        <CardDescription>
          Help us improve by reporting product you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Price Field */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-price">
                    Product Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login botton not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex">
            {/* Price Field */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-price">
                    Product Price
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="1000"
                    type="number"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Category Field */}
            {/* <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Category Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Provide a concise title for your bug report.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* category Field */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  orientation="responsive"
                  data-invalid={fieldState.invalid}
                >
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-language">
                      Spoken Language
                    </FieldLabel>
                    <FieldDescription>
                      For best results, select the language you speak.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-select-language"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            </div>
            {/* Description Field */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Image upload */}
            {/* <ImageUpload onImagesChange={onhadleImagesChange} /> */}

            {/* IMAGES */}
            <div className="space-y-2">
              <FieldLabel>Images</FieldLabel>
              <ImageUpload onImagesChange={onhandleImageChange} />
              {form.formState.errors.images && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.images.message}
                </p>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
