import type { GetAvailableSlots200AvailableSlotsItemSlotsItem } from "@/http/api";
import { format } from "date-fns";

type DoctorAvailableSlotProps = {
	slot: GetAvailableSlots200AvailableSlotsItemSlotsItem;
};

export function DoctorAvailableSlot({ slot }: DoctorAvailableSlotProps) {
	return (
		<div
			key={slot.id}
			className="flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2"
		>
			<p>{format(new Date(slot.startTime), "h:mm a")}</p>-
			<p>{format(new Date(slot.endTime), "h:mm a")}</p>
		</div>
	);
}
