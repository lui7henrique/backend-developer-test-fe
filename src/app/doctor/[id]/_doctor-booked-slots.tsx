"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { useGetBookedSlotsSuspense } from "@/http/api";
import { format } from "date-fns";

type DoctorBookedSlotsProps = {
	id: string;
};

export function DoctorBookedSlots({ id }: DoctorBookedSlotsProps) {
	const { data } = useGetBookedSlotsSuspense(id);

	if (!data) return null;

	if (data.bookedSlots.length === 0) {
		return (
			<div className="flex flex-col gap-4">
				<p className="text-sm text-muted-foreground">No booked slots.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			{data.bookedSlots.map((slot, index) => (
				<BlurFade key={slot.id} delay={index * 0.1}>
					<div className="flex flex-col gap-1 p-3 border-b">
						<div className="flex justify-between items-center">
							<h5 className="text-lg font-bold">{slot.patientEmail}</h5>
							<p className="text-sm font-medium">
								{format(new Date(slot.startTime), "MMM d, yyyy")}
							</p>
						</div>
						<p className="text-sm text-muted-foreground">
							{format(new Date(slot.startTime), "h:mm a")} -{" "}
							{format(new Date(slot.endTime), "h:mm a")}
						</p>
					</div>
				</BlurFade>
			))}
		</div>
	);
}
