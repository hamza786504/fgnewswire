import PlanCard from '@/app/(pages)/Componenets/PlanCard';


async function getPackages() {
    try {
        const res = await fetch("https://api.glassworld06.com/api/packages", {
            cache: "no-store",  // IMPORTANT for SSR fresh data
        });

        if (!res.ok) throw new Error("Failed to fetch packages");

        const data = await res.json();
        return data || [];
    } catch (error) {
        console.error("SSR Fetch Error:", error);
        return [];
    }
}
const PressReleasePackages = async () => {
    const allPackages = await getPackages();


    return (
        <main className="flex-1 rounded-bl-4xl bg-[#ebecf0] min-h-full p-4 md:pb-6 md:px-4">
            <div className="max-w-7xl mx-auto">
                <div className="overflow-y-scoll container mx-auto px-0 pb-8">
                    <h1 className="text-2xl font-bold text-start mb-8">Press Release Packages</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {allPackages.filter(p => p.type === "press_release").map((plan, idx) => <PlanCard plan={plan} idx={idx} />)}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PressReleasePackages;