import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Doctor Appointment",
	description: "Get an appointment with your doctor",
	icons: {
		icon: [
			{
				url: "data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍⚕️</text></svg>",
				sizes: "any",
				type: "image/svg+xml",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<Providers>
				<html lang="en">
					<body className={`${inter.className} bg-[#f9f5f3] mx-4 my-12`}>
						<main className="mx-auto max-w-2xl bg-white border rounded-lg p-4">
							{children}
						</main>
					</body>
				</html>
			</Providers>
		</ViewTransitions>
	);
}
