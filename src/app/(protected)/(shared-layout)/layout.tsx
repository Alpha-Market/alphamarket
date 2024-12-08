import Header from "@/components/UI/common/Header";
import Sidebar from "@/components/UI/common/Sidebar";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full h-full flex flex-col bg-black">
			<Header />

			<div className="flex h-full">
				{/* <Suspense> */}
				<Sidebar />
				{/* </Suspense> */}
				{children}
			</div>
		</div>
	);
}
