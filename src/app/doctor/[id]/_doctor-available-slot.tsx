import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	type GetAvailableSlots200AvailableSlotsItemSlotsItem,
	getAvailableSlots,
	getGetAvailableSlotsQueryKey,
	useCreateAppointment,
} from "@/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type DoctorAvailableSlotProps = {
	slot: GetAvailableSlots200AvailableSlotsItemSlotsItem;
};

const formSchema = z.object({
	patientEmail: z.string().email(),
});

export function DoctorAvailableSlot({ slot }: DoctorAvailableSlotProps) {
	const startTime = new Date(slot.startTime);
	const endTime = new Date(slot.endTime);

	const { mutateAsync: createAppointment } = useCreateAppointment();

	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			patientEmail: "",
		},
	});

	const queryClient = useQueryClient();

	const [startDate, _setStartDate] = useQueryState("startDate", {
		defaultValue: format(startTime, "yyyy-MM-dd"),
	});
	const [endDate, _setEndDate] = useQueryState("endDate", {
		defaultValue: format(addDays(startTime, 1), "yyyy-MM-dd"),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await createAppointment(
			{
				data: {
					patientEmail: values.patientEmail,
					startTime: startTime.toISOString(),
					endTime: endTime.toISOString(),
				},
				slotId: slot.id,
			},
			{
				onSuccess: () => {
					toast.success("Appointment created successfully");
					setOpen(false);

					const queryKey = getGetAvailableSlotsQueryKey(slot.doctorId, {
						startDate: startDate,
						endDate: endDate,
					});

					queryClient.invalidateQueries({
						queryKey: queryKey,
						exact: true,
					});
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div
					key={slot.id}
					className="flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-2"
				>
					<p>{format(startTime, "h:mm a")}</p>-
					<p>{format(endTime, "h:mm a")}</p>
				</div>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-3xl font-bold">
						{format(startTime, "MMM d, yyyy")}
					</DialogTitle>
					<DialogDescription>
						{" "}
						{format(startTime, "h:mm a")} - {format(endTime, "h:mm a")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="patientEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Patient Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button disabled={form.formState.isSubmitting} type="submit">
								{form.formState.isSubmitting ? "Booking..." : "Book"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
