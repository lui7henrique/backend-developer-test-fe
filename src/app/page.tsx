import { BlurFade } from "@/components/magicui/blur-fade";
import DoctorsList from "./_doctors-list";

export default async function Home() {
	return (
		<section className="space-y-4">
			<div className="space-y-2">
				<BlurFade delay={0.2}>
					<h1 className="text-4xl font-bold">Doctor Appointment</h1>
				</BlurFade>

				<BlurFade delay={0.4}>
					<p className="text-lg text-muted-foreground">
						Schedule medical appointments quickly and efficiently. Find the best
						available specialists and manage all your healthcare appointments in
						one place.
					</p>
				</BlurFade>
			</div>

			<DoctorsList />
		</section>
	);
}
