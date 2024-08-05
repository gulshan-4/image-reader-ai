'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { MdHome } from "react-icons/md";

const Navbar: React.FC = () => {
  const currentPath = usePathname();
  const [showDropdown , setShowDropdown] = useState<Boolean>(false)

  return (
    <nav className="relative">
      <div className="logo-wrapper pt-3 pb-2 border-b border-b-[#00000040]">
        <Link className="relative" href="/">
        <Image
          src="/logo.svg"
          priority
          className=" !relative max-w-[78%] !h-auto mx-auto"
          fill
          alt="Picscribe - a image to text website"
        />
        </Link>
      </div>
      <ul className="menu relative flex gap-2 justify-between px-2 py-[10px] bg-[#F3F3F3]">
        <li className={` nav-home ${currentPath === '/' ? 'active' : ''} text-primary_color p-[1px] rounded w-max`}>
          <Link href="/">
            <MdHome size={32} />
          </Link>
        </li>
        <li className={`links bg-[#d3d3d3] ${showDropdown?'flex':'hidden'} flex-col items-start gap-2 absolute top-[54px] right-0 px-4 py-2`}>
          <Link className={` navlink ${currentPath === '/extract-text-from-images' ? 'active' : ''} text-[#757575] w-max flex gap-[1px]`} href="/extract-text-from-images">
            <div className="icon text-[24px]">
              <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none">
                <path
                  d="M2.5 5V19H14.5V17H12.5C11.39 17 10.5 16.11 10.5 15V9C10.5 7.89 11.39 7 12.5 7H14.5V5M14.5 7V9H16.5V7M14.5 9H12.5V15H14.5M14.5 15V17H16.5V15M5.5 7H7.5C8.61 7 9.5 7.89 9.5 9V15C9.5 16.11 8.61 17 7.5 17H5.5C4.39 17 3.5 16.11 3.5 15V9C3.5 7.89 4.39 7 5.5 7ZM17.5 7V17H19.5V13H20.5V14H21.5V17H23.5V14H22.5V12H23.5V8H22.5V7M5.5 9V15H7.5V9M19.5 9H21.5V11H19.5V9Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span>Image To Text</span>
          </Link>
          <Link className={` navlink ${currentPath === '/ai-image-description-tool' ? 'active' : ''} text-[#757575] w-max flex gap-[1px]`} href="/ai-image-description-tool">
            <div className="icon text-[24px]">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3334 3H4.66669C3.25002 3 2.16669 4.08355 2.16669 5.5005V17.1695C2.16669 18.5865 3.25002 19.67 4.66669 19.67H16.3334C17.75 19.67 18.8334 18.5865 18.8334 17.1695V5.5005C18.8334 4.08355 17.75 3 16.3334 3ZM17.1667 12.9187L15.5834 11.335C14.5834 10.4182 13 10.4182 12.0834 11.335L11.3334 12.0851L8.91669 9.668C7.91669 8.75115 6.33335 8.75115 5.41669 9.668L3.83335 11.2516V5.5005C3.83335 5.0004 4.16669 4.667 4.66669 4.667H16.3334C16.8334 4.667 17.1667 5.0004 17.1667 5.5005V12.9187Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span>Describe Image</span>
          </Link>
        </li>
        <button onClick={()=>{
          setShowDropdown((prev)=> !prev)
        }} className=" mobile-menu-btn text-[32px] text-primary_color"> {showDropdown? <CgClose /> : <IoMenu />}</button>
      </ul>
    </nav>
  );
};
export default Navbar;
