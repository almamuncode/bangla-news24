
const Footer = () => {
    return (
        <div className="grid grid-cols-2 items-center container mx-auto">
            <p className="text-center text-sm text-gray-500 py-4">
                &copy; {new Date().getFullYear()} Bangla News24
            </p>
            <p className="text-center text-sm text-gray-500 py-4">
                Source: BBC Bangla
            </p>
        </div>
    );
};

export default Footer;