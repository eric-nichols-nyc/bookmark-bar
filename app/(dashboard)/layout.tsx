import { Navbar } from "./_components/navbar/navbar";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
        <Navbar />
        <div className="h-full">{children}</div>
    </div>
  )
}
