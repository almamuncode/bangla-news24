
const Footer = () => {
    return (
        <div className="container mx-auto mt-auto grid grid-cols-1 items-center gap-2 px-4 py-4 sm:grid-cols-2">
            <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Bangla News24
            </p>
            <p className="text-center text-sm text-gray-500">
                Source: BBC Bangla
            </p>
        </div>
    );
};

export default Footer;