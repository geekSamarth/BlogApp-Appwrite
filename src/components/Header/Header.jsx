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
        <nav className="flex items-center justify-between py-1">
          <div className="mr-4 flex items-center">
            <Link to="/">
              <Logo width="140px" />
            </Link>
          </div>
          <div className="">
            <ul className="flex ml-auto gap-2.5 items-center">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name} className="">
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-bock px-6 py-1.5 duration-200 hover:bg-blue-100 rounded-xl hover:text-black transition-all ease-in-out "
                    >
                      {item.name}
                    </button>
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
