"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {buttonVariants } from "@/components/ui/button";
import SigninForm from "@/components/auth/SigninForm";

// fixing bug saat mobile
export default function page() {
  return (
    <>
      <div className="container relative  h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"> 
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 hover:bg-custom-Fennel-Flower bg-custom-Lightish-Blue text-custom-Cloudless hover:text-custom-Flax-Bloom"
          )}>
          Signup
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-custom-BlueOyster-Cult" /> {/* Mengubah warna latar belakang */}
          <div className="relative z-20 flex items-center text-lg font-medium text-custom-Grams-Hair"> {/* Mengubah warna teks */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Travolks!
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg text-custom-Grams-Hair"> {/* Mengubah warna teks */}
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm text-custom-Cloudless">Travolks developer</footer> {/* Mengubah warna teks */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-custom-Fly-byNight">
                Insert an account
              </h1>
              <p className="text-sm text-muted-foreground text-custom-Bright-Manatee">
                Enter your email below to signin to your account
              </p>
            </div>
            <SigninForm />
            <p className="px-8 text-center text-sm text-muted-foreground text-custom-Strong-Iris">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
