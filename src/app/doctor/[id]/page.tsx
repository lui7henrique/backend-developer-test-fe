export default function DoctorPage({ params }: { params: { id: string } }) {
	return <div>Doctor {params.id}</div>;
}
