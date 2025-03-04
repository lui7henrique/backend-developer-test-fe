"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDoctorsSuspense } from "@/http/api";
import { Link } from "next-view-transitions";

export default function DoctorsList() {
	const { data: doctors } = useGetDoctorsSuspense();

	return (
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
	);
}
