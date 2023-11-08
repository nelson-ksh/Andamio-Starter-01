"use client";

import { CardanoWallet } from "@meshsdk/react";
import Link from "next/link";

const GlobalNav = () => (
  <div className="flex px-24 py-2 justify-between items-center bg-gray-800 font-bold">
    <div>
      <Link href={"/course"}>Course</Link>
    </div>
    <div>
      <Link href={"/course-management"}>Course Management</Link>
    </div>
    <div>
      <Link href={"/contributor-platform"}>Contributor Platform</Link>
    </div>
    <div>
      <Link href={"/test"}>Test</Link>
    </div>
    <CardanoWallet />
  </div>
);

export default GlobalNav;
