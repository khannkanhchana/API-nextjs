export default function DashboardLayout(
    {children,}: {children: React.ReactNode;}): React.ReactNode {
    return<section className="bg-gray-400">{children}</section>;
}