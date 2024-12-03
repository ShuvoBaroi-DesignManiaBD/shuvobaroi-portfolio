import Image from "next/image";

const Logo = ({className='', src}:{className?:string, src?:string}) => {
    return (
        <Image src={src ||"/shuvo-baroi-logo.webp"} alt="logo" width={100} height={100} className={`w-[220px] ${className}`}></Image>
    );
};

export default Logo;