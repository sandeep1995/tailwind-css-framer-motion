import Link from "next/link";

function Nav() {
  return (
    <div className="flex justify-between items-center px-0 bg-purple-600">
      <div className="pl-3">
        <Link href="/">
          <a className="text-white">RemoteFine.com</a>
        </Link>
      </div>
      <div className="flex">
        <a
          target="_blank"
          href="https://watchnetspeed.com"
          className="px-3 py-3 text-white cursor-pointer hover:bg-purple-500"
        >
          Realtime Mac Bandwidth Monitor
        </a>
        <a
          target="_blank"
          href="https://paypal.me/sandeep1995/20USD"
          className="px-3 py-3 text-white cursor-pointer hover:bg-purple-500"
        >
          Donate
        </a>
      </div>
    </div>
  );
}
export default Nav;
