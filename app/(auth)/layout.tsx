import ProtectedRoute from "@/fetch/auth/ProtectedRoute";


export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ProtectedRoute>{children}</ProtectedRoute>;
}
