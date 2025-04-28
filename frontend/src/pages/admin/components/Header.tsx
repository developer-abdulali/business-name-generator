// import { UserButton } from "@clerk/clerk-react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-3 mb-8">
//         <Link to="/" className="rounded-lg">
//           <img src="/spotify.png" className="size-10 text-black" />
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold">Music Manager</h1>
//           <p className="text-zinc-400 mt-1">Manage your music catalog</p>
//         </div>
//       </div>
//       <UserButton />
//     </div>
//   );
// };
// export default Header;

import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="flex items-center gap-3">
        <Link to="/" className="rounded-lg">
          <img src="/spotify.png" className="size-8 md:size-10" alt="Logo" />
        </Link>
        <div>
          <h1 className="text-xl md:text-3xl font-bold">Music Manager</h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">
            Manage your music catalog
          </p>
        </div>
      </div>
      <div className="self-end md:self-auto">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
