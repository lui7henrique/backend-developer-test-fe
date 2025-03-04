import { BlurFade } from "@/components/magicui/blur-fade";
import { getDoctors } from "@/http/api";
import Link from "next/link";

export default async function Home() {
	const doctors = await getDoctors();

	return (
		<section className="space-y-4">
			<div className="space-y-2">
				<BlurFade delay={0.2}>
					<h1 className="text-4xl font-bold">Doctor Appointment</h1>
				</BlurFade>

				<BlurFade delay={0.4}>
					<p className="text-lg text-muted-foreground">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						quos.
					</p>
				</BlurFade>
			</div>

			<div className="space-y-4">
				{doctors.map((doctor, index) => (
					<BlurFade delay={0.6 + index * 0.1} key={doctor.id}>
						<Link
							key={doctor.id}
							href={`/doctor/${doctor.id}`}
							className="flex items-center gap-4 cursor-pointer"
						>
							<div className="w-10 h-10 rounded-sm bg-foreground flex items-center justify-center text-background">
								{doctor.firstName.charAt(0)}
							</div>

							<div>
								<h2 className="text-lg font-bold">
									{doctor.firstName} {doctor.lastName}
								</h2>
								<p className="text-sm text-muted-foreground">{doctor.email}</p>
							</div>
						</Link>
					</BlurFade>
				))}
			</div>
		</section>
	);
}
