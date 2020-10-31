function UserCard(user) {
  return (
    <div
      className="flex items-center ml-4 mt-4 bg-white w-64 shadow-md hover:shadow-xl rounded-xl cursor-pointer overflow-hidden"
      onClick={() => {
        user.handleCardClick(user.login);
      }}
    >
      <img
        className="w-32 h-32 object-cover object-center"
        src={user.cardImg}
      />
      <a
        href={user.html_url}
        className="text-sm ml-3 text-blue-600 hover:text-blue-800 truncate"
      >
        {user.login}
      </a>
    </div>
  );
}
export default UserCard;
