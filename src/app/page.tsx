import { getDoctors } from "@/http/api";
import Link from "next/link";

export default async function Home() {
	const doctors = await getDoctors();

	return (
		<section className="space-y-4">
			<div className="space-y-2">
				<h1 className="text-4xl font-bold">Doctor Appointment</h1>
				<p className="text-lg text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
					quos.
				</p>
			</div>

			<div className="space-y-2">
				{doctors.map((doctor) => (
					<Link
						key={doctor.id}
						href={`/doctor/${doctor.id}`}
						className="flex items-center gap-4 cursor-pointer"
					>
						<div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center text-muted-foreground">
							{doctor.firstName.charAt(0)}
						</div>

						<div>
							<h2 className="text-lg font-bold">
								{doctor.firstName} {doctor.lastName}
							</h2>
							<p className="text-sm text-muted-foreground">{doctor.email}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
