import type { FC, PropsWithChildren } from "react";

import { Logo } from "@/util/Icons";

import Link from "next/link";

const OnBoardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<div className="fixed inset-0 bg-[url('/auth_bg.png')] bg-cover bg-no-repeat after:absolute after:w-full after:h-full sm:scale-[2] scale-[1.2] blur-[52px]"></div>
			<Link href="/">
				<Logo
					className="absolute top-[20px] right-[30.5px] z-[100] cursor-pointer"
					color="white"
				/>
			</Link>

			{children}
		</div>
	);
};

export default OnBoardLayout;
