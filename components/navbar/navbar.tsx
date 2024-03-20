import { CircleUserRound } from 'lucide-react';
import Image from "next/image";
export const Navbar = () => {
  return (
    <div className="w-full h-12 p-2 flex relative drop-shadow-md border">
      <div className="h-full w-32 relative flex flex-1 justify-start items-start">
        <Image src="/images/logo.svg" alt="logo" width={40} height={35} />
      </div>
      <div className='flex justify-center flex-1'>
        <h1 className="text-1xl font-extrabold ">Bookmark App</h1>
      </div>
      <div className="flex flex-1 justify-end">
        <div><CircleUserRound /></div>
      </div>
    </div>
  );
};