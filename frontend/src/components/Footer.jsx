import React from 'react';

const Footer = () => {
	return (
		<footer className="flex flex-col items-center justify-between bg-emerald-green py-5 text-xs font-bold text-white">
			<span>
				Made with 💚 by{' '}
				<span className="text-creased-khaki">Terrell Turner</span> @{' '}
				<span className="text-egyptian-earth">RellSoft</span>
			</span>
			<span>Copyright © {new Date().getFullYear()}</span>
		</footer>
	);
};

export default Footer;
