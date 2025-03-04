import { BlurFade } from "@/components/magicui/blur-fade";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDoctorById } from "@/http/api";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";
import { DoctorCalendar } from "./_doctor-calendar";
import { DoctorBookedSlots } from "./_doctor-schedule";

export default async function DoctorPage({
	params,
}: { params: { id: string } }) {
	const { doctor } = await getDoctorById(params.id);

	if (!doctor) {
		return redirect("/");
	}

	return (
		<>
			<div className="flex flex-col gap-6">
				<Link href="/">
					<ArrowLeftIcon className="size-4" />
				</Link>

				<div className="space-y-2">
					<BlurFade delay={0.1}>
						<h1 className="text-4xl font-bold">
							{doctor.firstName} {doctor.lastName}
						</h1>
					</BlurFade>

					<BlurFade delay={0.2}>
						<p className="text-muted-foreground">{doctor.email}</p>
					</BlurFade>
				</div>

				<Tabs className="space-y-2" defaultValue="available">
					<BlurFade delay={0.3}>
						<TabsList>
							<TabsTrigger value="available">Available</TabsTrigger>
							<TabsTrigger value="booked">Booked</TabsTrigger>
						</TabsList>
					</BlurFade>

					<TabsContent value="available">
						<BlurFade delay={0.4}>
							<DoctorCalendar id={params.id} />
						</BlurFade>
					</TabsContent>

					<TabsContent value="booked">
						<BlurFade delay={0.4}>
							<DoctorBookedSlots id={params.id} />
						</BlurFade>
					</TabsContent>
				</Tabs>
			</div>
		</>
	);
}
