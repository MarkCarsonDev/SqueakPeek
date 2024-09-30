import Link from "next/link";
import Image from "next/image";

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="name-logo">
          <div className="logo">
            <Image src="/ratlogo.png" height={100} width={100} alt="RAT logo" />
          </div>
          SqueakPeek
        </Link>

        <div className="nav-menu">
          <ul className="nav-links">
            <li className="nav-list">
              <Link href="/explore" className="nav-item">
                Explore
              </Link>
            </li>

            <li className="nav-list">
              <Link href="/message" className="nav-item">
                Message
              </Link>
            </li>

            <li className="nav-list">
              <Link href="/track" className="nav-item">
                Tracking
              </Link>
            </li>

            <li className="nav-list">
              <Link href="/profile" className="nav-item">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
