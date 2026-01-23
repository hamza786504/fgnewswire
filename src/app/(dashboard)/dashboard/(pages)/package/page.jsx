import PlanCard from "@/app/(pages)/Componenets/PlanCard";

// This runs on the server
async function getPackages() {
    try {
        const response = await fetch('https://api.glassworld06.com/api/packages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            next: { revalidate: 60 } // This works in server components
        });


        if (!response.ok) {
            throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        return data.data || data || [];
    } catch (error) {
        console.error('Error fetching packages:', error);
        return [];
    }
}



const Package = async () => {
    const allPackages = await getPackages();



    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-y-scoll container mx-auto px-0 pb-8">
                    <h1 className="text-2xl font-bold text-start mb-8">Press Release Packages</h1>


                    <div className="mt-7 grid grid-cols-3 space-y-5">
                        {/* Client component for tabs */}
                        {allPackages.filter(p => p.type === "press_release").map((plan, idx) => <PlanCard plan={plan} idx={idx} />)}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Package;