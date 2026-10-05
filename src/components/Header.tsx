import Image from "next/image";
import Userinfo from "./Userinfo";

const Header = () => {

    const date = new Date().toLocaleDateString("bn-bd", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka"
    });


    return (
        <div className="container mx-auto grid items-center gap-4 px-4 py-4 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex items-center justify-self-center gap-3 lg:col-start-2">
                <Image
                    src="/logo.webp"
                    alt="Logo"
                    width={50}
                    height={50}
                />
                <div>
                    <span className="font-bold text-xl sm:text-2xl text-red-700">Bangla News24</span>
                    <div className="mt-1 text-xs sm:text-sm">{date}</div>
                </div>
            </div>
            <Userinfo></Userinfo>
            
        </div>
    );
};

export default Header;
