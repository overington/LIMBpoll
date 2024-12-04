"use client";

import Link from "next/link";
import LIMBQRCode from "@/components/QRCode";
import { PROD_ADDRESS } from "@/data/config";
import Card from "@/components/Card";

export default function InstructionsPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Card className="text-xl">
            <p className="text-center sm:text-left">
              Welcome to Link In My Bio! Follow these simple steps to
              participate:
            </p>
            <p className="text-center sm:text-left">Connect to WiFi:</p>
            <p className="text-center sm:text-left">Network: Link In My Bio</p>
            <p className="text-center sm:text-left">Password: linkinmybio</p>
            <p className="text-center sm:text-left">
              NB, your device might show an error message similar to the
              screenshot below - saying that the WiFi network “Link In My Bio”
              is not connected to the internet, and asking to switch to a better
              WiFi network. You need to decline this option and stay connected
              to this network for the duration of the performance, otherwise you
              will not be able to connect to the voting system and participate
              in the interactive experience.
            </p>
            <p className="text-center sm:text-left">
              Scan the QR code below to connect to the voting system:
            </p>
          </Card>

          <LIMBQRCode qrData={`${PROD_ADDRESS}`} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link href="/">Vote</Link>
        <Link href="/admin">admin</Link>
        <Link href="/connect">Connect QR Code</Link>
      </footer>
    </div>
  );
}
