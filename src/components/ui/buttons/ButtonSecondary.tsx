export const ButtonSecondary = ({children, className, filled}:{children: React.ReactNode | string, className?: string, filled?:boolean}) => {
  return (
    <button className={`${className} px-8 py-2.5 rounded-full ${filled ?"bg-gradient-to-b from-purple to-blue-900" : "border-2"} hover:bg-gradient-to-b from-purple to-blue-900 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200`}>
  {children}
</button>
  )
}
