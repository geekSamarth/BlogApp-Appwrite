import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index.js";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-[#111111]   border-t-white/10 border-t-[1px] text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="170px" />
              </div>
              <div>
                <p className="text-sm ">
                  &copy; Copyright 2024. All Rights Reserved by Dev.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-sm font-semibold uppercase text-white">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-white/70">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-sm font-semibold uppercase text-white">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-white/70">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-sm font-semibold uppercase text-white">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium text-white/70">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium text-white/70">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
