"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
             Level Up Your Career with AI Support
            <br />
            Your Future Awaits
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Advance confidently with AI-assisted career coaching, preparation resources, and expert guidance.
          </p>
        </div>
       <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
  <Link href="/dashboard">
    <Button
      size="lg"
      className="px-4 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 focus:ring-4 focus:ring-purple-300 active:scale-95 transition transform duration-300"
    >
      Begin Your Journey
    </Button>
  </Link>

  <Link href="https://www.youtube.com/roadsidecoder">
    <Button
      size="lg"
      variant="outline"
      className="px-4 sm:px-8 py-3 border-teal-500 text-teal-500 font-semibold rounded-lg hover:bg-teal-500 hover:text-white focus:ring-4 focus:ring-teal-200 active:scale-95 transition transform duration-300"
    >
      Preview Features
    </Button>
  </Link>
</div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;