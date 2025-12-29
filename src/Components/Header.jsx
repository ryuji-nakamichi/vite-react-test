function Header({ page, difficulty }) {
  const mainTitle = page?.title || 'Undefined Title';
  const subTitle = difficulty
    ? `${mainTitle}（${difficulty}）`
    : mainTitle;
  return (
    <header>
      <h1 className="text-4xl md:text-6xl font-black mb-2 
               text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300"
      >
        三國志 仮想戦史
      </h1>
      <h2 className="text-2xl text-yellow-300/80 mb-10 italic">
        {subTitle}
      </h2>
    </header>
  );
}

export default Header;