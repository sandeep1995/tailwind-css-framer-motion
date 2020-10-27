function Nav() {
  return (
    <div className="flex justify-between items-center px-2 py-2 bg-purple-600">
      <div className="pl-3">
        <h2 className="text-white">fronten.dev</h2>
      </div>
      <div className="flex">
        {/* <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-purple-400 rounded-md">
            Pricing
          </a> */}
        <a className="px-3 py-1 text-white text-sm cursor-pointer hover:bg-purple-400 rounded-md">
          About Us
        </a>
      </div>
    </div>
  );
}
export default Nav;
