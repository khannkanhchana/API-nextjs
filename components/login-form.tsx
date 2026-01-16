// react-hook-form with zod validation and elements simple components
"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


type LoginType = {
  email: string;
  password: string;
};


const formShcema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(8, "At least 8 characters"),
});

export default function LoginForm() {
  // 1. Define form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formShcema>>({
    resolver: zodResolver(formShcema),
  });

  function LoginForm(data: LoginType) {
    console.log("on-clicked: ", data);
  }

  console.log(watch("email"));

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(LoginForm)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              <p className="text-red-500 text-sm">
                {errors.email?.message}
              </p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              <p className="text-red-500 text-sm">
                {errors.password?.message}
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
