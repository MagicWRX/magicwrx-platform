import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-black">
      {/* To change the hero image, update the src below (index-01.jpg, index-02.jpg, etc.) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src="/hero-images/index-01.jpg"
          alt="B2B Technology Magic Hero"
          fill
          style={{ objectFit: 'cover', opacity: 0.5 }}
          priority
        />
        {/* TODO: Add SVG overlays for sparkles, pixie dust, smoke, glowing circuits */}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Transform Your Business
            <span className="block text-yellow-300">With Magic WRX</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-100 max-w-3xl mx-auto">
            Premium templates, powerful tools, and professional solutions to elevate your online presence. 
            From startups to enterprises, we have everything you need to succeed.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/sites/new"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
            >
              Build Your Site
            </Link>
            <Link
              href="/templates"
              className="rounded-md border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Templates
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-200">
            <span>✨ Premium Quality</span>
            <span>🚀 Lightning Fast</span>
            <span>💎 Professional Grade</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
        <div className="h-64 w-64 rounded-full bg-white bg-opacity-10 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
        <div className="h-96 w-96 rounded-full bg-white bg-opacity-10 blur-3xl"></div>
      </div>
    </section>
  )
}
