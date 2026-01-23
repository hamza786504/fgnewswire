import GuestPostingPackageCard from "@/app/(pages)/Componenets/GuestPostingPackageCard";
const Package = async () => {
    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-y-scoll container mx-auto px-0 pb-8">
                    <h1 className="text-2xl font-bold text-start mb-8">Guest Posting Packages</h1>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <GuestPostingPackageCard />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Package;