import Link from "next/link";
import { Karla } from "next/font/google";
import './home.css'

const karla = Karla({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1 className=" text-[26px] leading-tight text-[#232323] font-semibold max-w-[90%] pt-6 pb-5 pl-0 mx-auto">
        Choose Your Image Processing Task :
      </h1>
      <div className="tools flex gap-4 flex-col items-center pb-6 border-b border-[rgba(35,35,35,0.35)]">
        <button className=" w-[92%] bg-primary_color border-2 border-primary_color p-[10px] tracking-[0.04em] leading-[1.1] text-left rounded-lg">
          <Link className="flex justify-between items-center" href="/extract-text-from-images">
            <div className="icon text-white text-[52px] mr-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.83636 10.2818C2.83636 8.55791 3.52118 6.90461 4.74017 5.68562C5.95916 4.46663 7.61246 3.78181 9.33636 3.78181H22.3364C24.0603 3.78181 25.7136 4.46663 26.9326 5.68562C28.1515 6.90461 28.8364 8.55791 28.8364 10.2818V20.0318C28.8364 21.7557 28.1515 23.409 26.9326 24.628C25.7136 25.847 24.0603 26.5318 22.3364 26.5318H9.33636C7.61246 26.5318 5.95916 25.847 4.74017 24.628C3.52118 23.409 2.83636 21.7557 2.83636 20.0318V10.2818ZM20.7114 16.7818H10.9614C10.5304 16.7818 10.1171 16.953 9.81232 17.2578C9.50757 17.5625 9.33636 17.9758 9.33636 18.4068C9.33636 18.8378 9.50757 19.2511 9.81232 19.5559C10.1171 19.8606 10.5304 20.0318 10.9614 20.0318H20.7114C21.1423 20.0318 21.5557 19.8606 21.8604 19.5559C22.1652 19.2511 22.3364 18.8378 22.3364 18.4068C22.3364 17.9758 22.1652 17.5625 21.8604 17.2578C21.5557 16.953 21.1423 16.7818 20.7114 16.7818ZM10.9614 10.2818C10.5304 10.2818 10.1171 10.453 9.81232 10.7578C9.50757 11.0625 9.33636 11.4758 9.33636 11.9068C9.33636 12.3378 9.50757 12.7511 9.81232 13.0559C10.1171 13.3606 10.5304 13.5318 10.9614 13.5318H20.7114C21.1423 13.5318 21.5557 13.3606 21.8604 13.0559C22.1652 12.7511 22.3364 12.3378 22.3364 11.9068C22.3364 11.4758 22.1652 11.0625 21.8604 10.7578C21.5557 10.453 21.1423 10.2818 20.7114 10.2818H10.9614ZM9.33311 41.1568V29.7818H12.5831V41.1568C12.5831 41.9108 12.7521 42.6193 13.0576 43.2596L24.9266 31.3906C25.9627 30.3546 27.3679 29.7726 28.8331 29.7726C30.2983 29.7726 31.7035 30.3546 32.7396 31.3906L44.6086 43.2596C44.9217 42.6028 45.0838 41.8844 45.0831 41.1568V18.4068C45.0831 17.1139 44.5695 15.8739 43.6553 14.9597C42.741 14.0454 41.501 13.5318 40.2081 13.5318H32.0831V10.2818H40.2081C42.363 10.2818 44.4296 11.1378 45.9534 12.6616C47.4771 14.1853 48.3331 16.2519 48.3331 18.4068V41.1568C48.3331 43.3117 47.4771 45.3783 45.9534 46.9021C44.4296 48.4258 42.363 49.2818 40.2081 49.2818H17.4581C15.3032 49.2818 13.2366 48.4258 11.7129 46.9021C10.1891 45.3783 9.33311 43.3117 9.33311 41.1568ZM42.3109 45.5573L30.4419 33.6883C30.2306 33.477 29.9798 33.3094 29.7038 33.1951C29.4277 33.0808 29.1319 33.0219 28.8331 33.0219C28.5343 33.0219 28.2385 33.0808 27.9625 33.1951C27.6864 33.3094 27.4356 33.477 27.2244 33.6883L15.3554 45.5573C15.9924 45.8628 16.7041 46.0318 17.4581 46.0318H40.2081C40.9621 46.0318 41.6706 45.8596 42.3109 45.5573ZM40.2081 21.6633C40.2081 22.527 39.865 23.3553 39.2543 23.966C38.6436 24.5767 37.8153 24.9198 36.9516 24.9198C36.0879 24.9198 35.2596 24.5767 34.6489 23.966C34.0382 23.3553 33.6951 22.527 33.6951 21.6633C33.6951 20.7996 34.0382 19.9713 34.6489 19.3606C35.2596 18.7499 36.0879 18.4068 36.9516 18.4068C37.8153 18.4068 38.6436 18.7499 39.2543 19.3606C39.865 19.9713 40.2081 20.7996 40.2081 21.6633Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className=" title text-white font-koulen text-[23px]">
              Extract Image Text <span className="text-[20px]">(OCR)</span>
            </span>
            <div className="arrow-icon text-white text-[55px]">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 55 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.6896 25.7083H9.16672V30.2917H36.6896V37.1667L45.8334 28L36.6896 18.8333V25.7083Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        </button>
        <button className=" w-[92%] bg-primary_color p-[10px] tracking-[0.04em] leading-[1.1] text-left rounded-lg">
          <Link className="flex justify-between items-center" href="/ai-image-description-tool">
            <div className="icon text-white text-[55px] mr-2">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16665 6.875H4.58331V48.125H50.4166V6.875H9.16665ZM45.8333 11.4583V43.5417H9.16665V11.4583H45.8333ZM32.0833 20.625H27.5V25.2083H22.9166V29.7917H18.3333V34.375H13.75V38.9583H18.3333V34.375H22.9166V29.7917H27.5V25.2083H32.0833V29.7917H36.6666V34.375H41.25V29.7917H36.6666V25.2083H32.0833V20.625ZM18.3333 16.0417H13.75V20.625H18.3333V16.0417Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className=" text-white font-koulen text-[23px] flex flex-col">
              <span className="title">AI Image Description</span>{" "}
              <span className={"text-[13px] " + karla.className}>
                Identify objects and things in images
              </span>
            </span>
            <div className="arrow-icon text-white text-[55px]">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 55 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.6896 25.7083H9.16672V30.2917H36.6896V37.1667L45.8334 28L36.6896 18.8333V25.7083Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        </button>
        <button className="w-[92%] coming-soon text-[23px] font-bold text-[#016A6A] hover:text-white hover:bg-primary_color border-[3.5px] border-primary_color rounded-lg p-[10px]">
          More Coming Soon
        </button>
      </div>

      <div className="about-us max-w-[90%] mx-auto">
        <h2 className="text-[23px] text-[#232323] font-bold pt-8">
          What we do?
        </h2>
        <p className=" text-[rgba(0,0,0,0.83)]">
          We provide vision tools to get data from images, Our tools are free to
          use, Using our app you can get extract text from images, describe
          image, get image desciption with AI, OCR tools etc. Our Services are
          free to use but any amount of support is much appreciated, even a
          dollar will be enough to motivate us to continue and improve our
          services.
        </p>
      </div>
    </main>
  );
}
