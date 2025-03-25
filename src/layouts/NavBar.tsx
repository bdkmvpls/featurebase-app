import React from 'react';
import { Link } from 'react-router';
const NavBar: React.FC = () => {
  return (
    <div className="w-full mt-4 flex justify-center">
      <div className="w-full flex h-10 justify-start gap-4 items-center">
        <div>
          <Link to={'/'}>Feedback</Link>
        </div>
        <div>
          <Link to={'/roadmap'}>Roadmap</Link>
        </div>
        <div>
          <Link to={'/changelog'}>Changelog</Link>
        </div>
        <div>
          <Link to={'https://help.featurebase.app/'} target="_blank">
            Help Center
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
