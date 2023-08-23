// components/Sidebar.js
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="bg-blue-500 w-[20%] p-6">
        <nav className="mt-6">
          <ul>
            <li className="my-2">
              <Link href="/">
                <AiOutlineHome className="h-6 w-6" />
              </Link>
            </li>
            <li className="my-2">
              <Link href="/about">About</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </div>
      <div className="w-3/4 p-6">Content goes here</div>
    </div>
  );
};

export default Sidebar;
