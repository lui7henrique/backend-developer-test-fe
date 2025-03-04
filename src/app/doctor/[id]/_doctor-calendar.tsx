"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Calendar } from "@/components/ui/calendar";
import { useGetAvailableSlotsSuspense } from "@/http/api";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { useQueryState } from "nuqs";
import * as React from "react";
import type { DayContentProps } from "react-day-picker";
import { DayContent } from "react-day-picker";
import { DoctorAvailableSlot } from "./_doctor-available-slot";

type CalendarProps = {
	id: string;
};

export function DoctorCalendar({ id }: CalendarProps) {
	const [startDate, setStartDate] = useQueryState("startDate", {
		defaultValue: format(new Date(), "yyyy-MM-dd"),
	});
	const [endDate, setEndDate] = useQueryState("endDate", {
		defaultValue: format(addDays(new Date(), 30), "yyyy-MM-dd"),
	});
	const [selectedDate, setSelectedDate] = useQueryState("selectedDate", {
		defaultValue: format(new Date(), "yyyy-MM-dd"),
	});

	const { data } = useGetAvailableSlotsSuspense(id, {
		startDate: startDate,
		endDate: endDate,
	});

	const currentData = data?.availableSlots.find(
		(slot) => slot.date === selectedDate,
	);

	const datesWithSlots =
		data?.availableSlots
			.filter((slot) => slot.slots.length > 0)
			.map((slot) => new Date(`${slot.date}T00:00:00`)) || [];

	const hasSlots = (date: Date) => {
		return datesWithSlots.some((d) => d.toDateString() === date.toDateString());
	};

	return (
		<div className="flex lg:flex-row flex-col gap-4">
			<div>
				<Calendar
					mode="single"
					selected={new Date(`${selectedDate}T00:00:00`)}
					onSelect={(date) => {
						if (date) {
							setSelectedDate(format(date, "yyyy-MM-dd"));
						}
					}}
					onMonthChange={(date) => {
						if (date) {
							setStartDate(format(date, "yyyy-MM-dd"));
							setEndDate(format(addDays(date, 30), "yyyy-MM-dd"));
						}
					}}
					className="p-0"
					classNames={{
						months:
							"flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
						month: "space-y-4 w-full flex flex-col",
						table: "w-full h-full border-collapse space-y-1",
						head_row: "",
						row: "w-full mt-2",
					}}
					fromDate={new Date()}
					components={{
						DayContent: (props: DayContentProps) => {
							const date = props.date;
							const hasAvailableSlots = date ? hasSlots(date) : false;

							return (
								<div className="relative flex items-center justify-center w-full h-full">
									<DayContent {...props} />

									{hasAvailableSlots && (
										<div className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-500" />
									)}
								</div>
							);
						},
					}}
				/>
			</div>

			<div className="flex flex-col gap-2 lg:border-l lg:pl-4 flex-1">
				<h2 className="text-lg font-medium">
					Available Slots at{" "}
					{format(new Date(`${selectedDate}T00:00:00`), "MMM d, yyyy")}
				</h2>

				<div className="flex flex-col gap-2">
					{currentData?.slots.length === 0 ? (
						<p className="text-muted-foreground">
							No available slots for this date. Please select another day.
						</p>
					) : (
						currentData?.slots.map((slot, index) => (
							<BlurFade key={slot.id} delay={0.6 + 0.2 * index}>
								<DoctorAvailableSlot slot={slot} />
							</BlurFade>
						))
					)}
				</div>
			</div>
		</div>
	);
}
