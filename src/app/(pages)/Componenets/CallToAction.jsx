import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="bg-white py-12 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-8">
                    Ready to publish your press release?
                </h2>

                <div className="flex flex-col sm:flex-row justify-center gap-4">

                    <Link
                        href="/"
                        className="my-2 text-center hover:bg-transparent hover:border-blue-500 border border-blue-500 bg-blue-500 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 hover:text-white px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    >
                        Request a quote
                    </Link>
                    <Link
                        href="/"
                        className="my-2 text-center hover:bg-transparent hover:border-blue-500 border border-blue-500 bg-blue-500 uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 hover:text-white px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 wow animate__animated animate__pulse"
                    >
                        Start publishing
                    </Link>
                </div>
            </div>
        </section>
    );
}
