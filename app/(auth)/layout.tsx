import AuthNavbar from "./_components/navbar/AuthNavbar"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-full">
      <AuthNavbar />
      <div>{children}</div>
    </div>
  )
}
