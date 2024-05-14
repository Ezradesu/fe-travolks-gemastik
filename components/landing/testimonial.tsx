"use client";
import Image from "next/image";
import Lapon from "@/public/Lapon.png.jpg";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { dataTesti } from "@/constant/data";

export default function Testimonial() {
  return (
    <div className="card testi flex flex-col items-center justify-around gap-y-6 ">
      <div className="flex flex-col items-center text-center gap-y-4">
        <p className=" text-xs md:text-xl font-sans text-custom-Ultra-Indigo font-bold">
          TESTIMONIAL DESTINIZE
        </p>
        <h1 className="font-bold text-2xl md:text-5xl">
          🏋️° Apa Kata Mereka Tentang Kami
        </h1>
        <p className="md:text-base text-xs max-w-sm md:max-w-4xl ">
          Penasaran apa saja review dari pengguna yang memakai aplikasi dan
          website Destinize buat nentuin kemana liburan mereka selanjutnya? Yuk
          cek dibawah!
        </p>
      </div>
      <div className="flex gap-5 flex-wrap justify-around items-center">
        {dataTesti.map((data) => {
          const { img, review, reviewer, job } = data;
          return (
            <>
              <Card
                key={review}
                className="min-w-0 max-w-xs h-[500px] border rounded-lg flex flex-col justify-center items-center shadow-xl px-2 m-2">
                <CardHeader>
                  
                    <div>
                      <Image
                        className="w-56 rounded-full"
                        src={img}
                       alt={reviewer}
                      />
                    </div>
                  
                </CardHeader>
                <CardDescription className="flex flex-col gap-y-4 mx-2 items-center text-center">
                  <p className="text-custom-Asphalt-Blue text-base  ">
                    {review}
                  </p>
                  <div className="flex gap-x-2 ">
                    <Star className="text-orange-500 " />
                    <Star className="text-orange-500" />
                    <Star className="text-orange-500" />
                    <Star className="text-orange-500" />
                  </div>
                  <p className="font-semibold  text-custom-Lightish-Blue">
                    {reviewer}
                  </p>
                  <p className="font-bold text-custom-River-Styx">{job}</p>
                </CardDescription>
              </Card>
            </>
          );
        })}
      </div>
    </div>
  );
}