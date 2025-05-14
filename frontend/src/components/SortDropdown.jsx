import React, { useState } from 'react';
import { FaFilter, FaSortDown, FaSortUp } from 'react-icons/fa';

function SortDropdown({ headers, sortedField, sortedDirection, onSort }) {
	const [mobileSortToggle, setMobileSortToggle] = useState(false);

	const getSortingIcon = (colKey) => {
		if (sortedField !== colKey) {
			return null;
		}

		return sortedDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
	};

	return (
		<button className="relative flex h-12 w-full flex-row place-items-center rounded-lg bg-creased-khaki p-3">
			<div
				onClick={() => {
					setMobileSortToggle(!mobileSortToggle);
				}}
				className="z-50 flex w-full flex-row place-items-center space-x-2 bg-creased-khaki p-2 text-xl font-semibold"
			>
				<FaFilter />
				<span>Sort By</span>
			</div>

			<ul
				className={`absolute right-0 z-40 flex w-full flex-col overflow-hidden rounded-b-lg bg-creased-khaki p-5 transition-all delay-75 ease-in-out ${
					mobileSortToggle
						? 'top-10 max-h-96 rounded-t-none'
						: 'top-0 max-h-0 rounded-t-lg'
				}`}
			>
				{headers.map((header) => (
					<li
						onClick={() => {
							onSort(header.queryName);
							setMobileSortToggle(!mobileSortToggle);
						}}
						className="m-1 flex flex-row space-x-2 rounded-lg bg-noir-de-vigne p-3 text-lg font-bold text-creased-khaki"
						key={header.queryName}
					>
						<span>{header.displayName}</span>
						{getSortingIcon(header.queryName)}
					</li>
				))}
			</ul>
		</button>
	);
}

export default SortDropdown;
