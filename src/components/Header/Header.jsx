import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Your Posts",
      slug: "/your-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="text-[rgba(255,255,255,0.65)] bg-[rgba(17,17,17,0.4)] backdrop-blur-2xl border-[rgba(255,255,255,0.10)] border-b-[1px] fixed top-0  w-full z-20">
      <Container>
        <nav className="flex items-center justify-between py-2 md:mr-3">
          <div className="mr-4 flex items-center">
            <Link to="/">
              <Logo width="140px" />
            </Link>
          </div>
          <div className="">
            <ul className="flex ml-auto gap-1  md:gap-2.5 items-center">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="flex">
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `font-medium mr-1.5 md:mr-5 p-1 text-[13px] whitespace-nowrap md:text-[18px] ${
                          isActive
                            ? "text-white/90 border-b  transition-all duration-300"
                            : "text-white/65 hover:text-white/90 "
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
