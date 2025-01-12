import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex items-center justify-center custom-min-h-screen">
      <div className="w-full max-w-6xl px-4 py-4 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="flex flex-col w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 pt-4">
            Hi, I&apos;m Reji Capoquia
          </h1>
          <p className="text-lg md:text-3xl mb-6">Full Stack Developer</p>
          <div>
            <Link href="/projects">
              <Button variant="outline" className="py-4 px-8">
                View My Work
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:mt-0 md:ml-8 flex justify-center">
          <img
            src="/reji.jpg"
            alt="Reji Capoquian"
            className="rounded-2xl w-full max-w-[500px] float-animation"
            width={500}
            height={500}
            // layout="intrinsic"
          />
        </div>
      </div>
    </section>
  );
}
