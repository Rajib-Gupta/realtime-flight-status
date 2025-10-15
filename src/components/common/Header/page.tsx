import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col  row-start-1 sm:p-10">
        <Link href="/">
          <Image
            className="items-start hover:opacity-80 transition-opacity"
            aria-hidden
            src="/airstatus-logo.svg"
            alt="AirStatus Logo"
            width={120}
            height={40}
          />
        </Link>

        <nav className="flex gap-[24px] flex-wrap items-center justify-center text-gray-700">
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all"
            href="/"
          >
            Home
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 transition-all"
            href="/about"
          >
            About
          </Link>
        </nav>

    </header>
  );
}
