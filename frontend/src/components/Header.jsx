import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="flex h-24 px-16 w-full justify-between items-center fixed border-b-2 border-slate-200">
      <img src={logo} alt="logo" className="h-16 w-16 rounded-full" />
      <section>
        <input
          type="text"
          placeholder="Search"
          className="h-10 w-96 border-2 border-slate-200 rounded-full px-4"
        />
      </section>
      <nav>
        <ul className="flex gap-3 text-black">
          <li>
            <p>Home</p>
          </li>
          <li>
            <p>Friends</p>
          </li>
          <li>
            <p>Messages</p>
          </li>
          <li>
            <p>Notifications</p>
          </li>
          <li>
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
