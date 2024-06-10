import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../reducers/AuthSlice";
import admin_icon from "../../assets/images/admin_icon.png";
import { FaCircleUser } from "react-icons/fa6";

export default function HeaderContent() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className="p-3 mx-auto max-w-7xl lg:px-8 border-b-2 border-black"
      aria-label="Global"
    >
      <ul className="flex items-center justify-between ">
        <li className="flex-none mr-6">
          <GiHamburgerMenu className="sm:hidden" />
        </li>
        <li className="justify-end mr-0">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <FaCircleUser className="text-3xl" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/profile/edit'
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700 w-full"
                      )}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      </ul>
    </nav>
  );
}
