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
import type { GetAvailableSlots200AvailableSlotsItemSlotsItem } from "@/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
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

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			patientEmail: "",
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Dialog>
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
					<form onSubmit={form.handleSubmit(onSubmit)}>
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
					</form>
				</Form>

				<DialogFooter>
					<Button>Book</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
