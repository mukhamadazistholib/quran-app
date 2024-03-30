import Search from "../Search"
import DeveloperUtility from "../TopBar/DeveloperUtility/DeveloperUtility"

const Header = ({children, className}) => {
  return (
    <div className="mr-4 ml-4 flex lg:justify-between lg:items-center lg:flex-row flex-col xl:px-0">
      <div className="w-full flex items-center justify-between lg:pr-5 align-middle">
        <h1 className={"text-xl font-bold text-emerald-500 " + className}>{children}</h1>
        <DeveloperUtility/>
     </div>
      <Search/>
    </div>
  )
}

export default Header