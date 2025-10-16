import Link from "next/link";

export default function PremiumPublications() {
    // Data for the publications table
    const publicationsData = [
        { url: "https://www.forbes.com/", da: "95", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.inc.com/", da: "95", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.bloomberg.com/", da: "94", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Press Release" },
        { url: "https://www.usatoday.com/", da: "94", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://finance.yahoo.com/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Press Release" },
        { url: "https://www.chicagotribune.com/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://nl.mashable.com/", da: "93", tat: "2-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.sfgate.com/", da: "93", tat: "2-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "https://www.nydailynews.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.mercurynews.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.chron.com/", da: "92", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "http://eonline.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://venturebeat.com/", da: "92", tat: "3-5 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "http://billboard.com/", da: "92", tat: "3-5 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.nasdaq.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.makeuseof.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.ibtimes.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.makeuseof.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.washingtontimes.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "https://www.miamiherald.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.azcentral.com/", da: "90", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "https://www.inquirer.net/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://dailycaller.com/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.dallasnews.com/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.digitaljournal.com/", da: "88", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.benzinga.com/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.maxim.com/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
        { url: "https://www.villagevoice.com/", da: "85", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.techtimes.com/", da: "84", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://hackernoon.com/", da: "84", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.mensjournal.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
        { url: "https://goodmenproject.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes / No" },
        { url: "https://www.intouchweekly.com/", da: "82", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.sfexaminer.com/", da: "80", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.lifeandstylemag.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://okmagazine.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.tmcnet.com/", da: "80", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.closerweekly.com/", da: "78", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.laweekly.com/", da: "77", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://hauteliving.com/", da: "73", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
        { url: "https://www.sfweekly.com/", da: "73", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.financemagnates.com/", da: "71", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.bbntimes.com/", da: "71", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "https://www.geekextreme.com/", da: "70", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://techbullion.com/", da: "61", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "UK Magazines", da: "DA", tat: "Cost", linkType: "Link Type", sponsored: "Sponsored" },
        { url: "https://www.mirror.co.uk/", da: "94", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.dailymail.co.uk/", da: "94", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.express.co.uk/", da: "93", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://metro.co.uk/", da: "93", tat: "2-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.dailystar.co.uk/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.ibtimes.co.uk/", da: "90", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.manchestereveningnews.co.uk/", da: "90", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.walesonline.co.uk/", da: "89", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.liverpoolecho.co.uk/", da: "88", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.birminghammail.co.uk/", da: "87", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.dailyrecord.co.uk/", da: "85", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "https://www.thisismoney.co.uk/", da: "81", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
        { url: "https://www.femalefirst.co.uk/", da: "78", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.deadlinenews.co.uk/", da: "75", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.bristolpost.co.uk/", da: "80", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Yes" },
        { url: "Other Magazines", da: "DA", tat: "Cost", linkType: "Link Type", sponsored: "Sponsored" },
        { url: "http://africa.businessinsider.com/", da: "94", tat: "2-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.entrepreneur.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.entrepreneur.com/", da: "92", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.jpost.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Discrete" },
        { url: "https://www.timesofisrael.com/", da: "91", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "Yes" },
        { url: "https://www.livemint.com/", da: "91", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://guardian.ng/", da: "87", tat: "1-3 weeks", linkType: "Do Follow", sponsored: "No" },
        { url: "https://www.khaleejtimes.com/", da: "86", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.arabianbusiness.com/", da: "84", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://gulfbusiness.com/", da: "72", tat: "1-3 weeks", linkType: "No Follow", sponsored: "Discrete" },
        { url: "https://www.forbesmiddleeast.com/", da: "72", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
        { url: "https://www.ibtimes.sg/", da: "70", tat: "1-3 weeks", linkType: "No Follow", sponsored: "No" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
            <main className="container mx-auto px-4 py-8">
                {/* Header Section with Gradient Text */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                        Premium Publications
                    </h1>
                </header>

                {/* Introduction Section */}
                <section className="mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            High Quality, High Traffic Publications
                        </h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Looking to get your brand featured on the worlds biggest publications? Look no further! See below 👇
                        </p>
                    </div>
                </section>

                {/* Publications Table */}
                <section className="mb-16 overflow-x-auto">
                    <div className="overflow-x-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                        <table className="overflow-x-auto min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-700 text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        US Magazines
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        DA
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        Cost
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        TAT
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        Link Type
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                                        Sponsored
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {publicationsData.map((pub, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {pub.url.includes('http') ? (
                                                <span className="text-blue-600 hover:text-purple-700 hover:underline transition-colors">
                                                    {pub.url}
                                                </span>
                                            ) : (
                                                <span className="font-bold text-purple-700">{pub.url}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.da}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <a href="https://worldwidebacklink.spp.io/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-purple-700 hover:underline transition-colors">
                                                Contact Us!
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.tat}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.linkType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{pub.sponsored}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex my-10 items-center justify-center">
                        <Link href="/signin" className="hidden md:inline-flex ml-6 hover:bg-transparent bg-[#163316] justify-center uppercase bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform">VIEW ALL PUBLICATIONS</Link>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="space-y-12">
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            Boost Your SEO with Our Premium Authority Guest Posting Service
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>Welcome to our premium authority guest posting service. If you've been seeking a surefire way to enhance your website's visibility, you're in the right place.</p>
                            <p>Guest posts on high-authority sites not only get your brand in front of a larger audience but also improve your website's ranking on search engines.</p>
                            <p>Through our service, we'll help you establish your brand's voice across the web, boost your SEO, and drive targeted traffic to your site. Let's take a closer look at what authority guest posting is and how our expert services can give your online presence a substantial lift.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            What Are Authority Guest Posts?
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>Authority guest posts are articles that we create and place on high-authority, reputable websites on your behalf. The term 'authority' here refers to the strength and credibility of a website in the eyes of search engines such as Google. Websites with high authority are well-respected, trustworthy, and often have a substantial number of visitors.</p>
                            <p>Furthermore, the key idea behind authority guest posts is simple. We write high-quality, engaging articles relevant to your business, and we post them on these high-authority websites.</p>
                            <p>Each post we create includes a backlink to your website. These backlinks are like votes of confidence in the eyes of search engines. The more of these 'votes' you have from high-authority sites, the more credible your website becomes.</p>
                            <p>Not only does this strategy increase your website's credibility, but it also drives quality traffic your way. When readers on these high-authority websites see your guest post and find it interesting, they'll likely click the link to your website to learn more about you.</p>
                            <p>Therefore, authority guest posts serve a dual purpose: improving your SEO and attracting interested readers.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            Why Choose Our Authority Guest Post Service?
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>You might wonder, why choose our authority guest post service? Here's why:</p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li><strong>Extensive network:</strong> We've built relationships with hundreds of high-authority websites across various niches. This means your guest posts will appear on platforms that already have a large, engaged audience.</li>
                                <li><strong>Quality content:</strong> Our team of professional writers creates high-quality, engaging content tailored to your brand. Additionally, we ensure that each guest post not only captures readers' attention but also encourages them to visit your website.</li>
                                <li><strong>SEO expertise:</strong> We understand the intricacies of SEO. Each guest post we craft is optimized with the right keywords to effectively boost your search engine rankings.</li>
                                <li><strong>Transparent process:</strong> With us, you'll always be in the loop. Moreover, we provide regular updates about the websites we're targeting, the content we're creating, and the results we're achieving.</li>
                                <li><strong>Result-driven strategy:</strong> We don't just aim for short-term success. Our goal is to provide you with a sustainable SEO strategy that brings in consistent traffic and boosts your website's authority in the long run.</li>
                            </ol>
                            <p>By choosing our authority guest post service, you're not just getting backlinks but building a solid foundation for your online presence.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            How Does Our Process Work?
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>We believe in maintaining transparency with our clients, and that starts with explaining our process. Our authority guest posting service follows a proven, five-step approach that assures quality and results:</p>

                            <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Step 1 - Understanding Your Business</h3>
                            <p>The first step is all about getting to know your business. We dig deep to understand your industry, target audience, goals, and competitors. This process helps us to tailor our guest posting strategy to your unique needs and create content that will truly resonate with your audience.</p>

                            <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Step 2 - Identifying Potential Websites</h3>
                            <p>Next, we leverage our extensive network to identify high-authority websites that align with your business niche. Moreover, this ensures your guest posts will reach an audience interested in your products or services.</p>

                            <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Step 3 - Crafting Compelling Content</h3>
                            <p>Once we have a clear strategy in place, our team of experienced writers gets to work. They create engaging, insightful content that not only meets the standards of high-authority websites but also captures readers' interest. Our content creation process focuses on:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li><strong>Relevance:</strong> The content aligns with your business and the host website's audience.</li>
                                <li><strong>Quality:</strong> We create well-researched, original articles that provide value to readers.</li>
                                <li><strong>SEO optimization:</strong> Each post is optimized with the right keywords to help improve your search engine rankings.</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Step 4 - Pitching and Posting</h3>
                            <p>After the content is ready, we reach out to our partner websites to get your guest post published. Our long-standing relationships with these websites help ensure a smooth and quick process.</p>

                            <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">Step 5 - Reporting and Analysis</h3>
                            <p>Finally, we monitor each guest post's performance and provide you with detailed reports. This process allows you to see the direct impact of our services on your website traffic and search engine rankings.</p>

                            <p className="mt-4">From start to finish, our process is designed to take the stress out of guest posting and deliver results you can see and measure.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            Expected Results and Benefits
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>What kind of results can you expect when you invest in our authority guest post service? Firstly, you will see a measurable increase in your website's search engine rankings.</p>
                            <p>This happens because each high-quality backlink from an authority site signals to search engines that your website is trustworthy and relevant, boosting your SEO.</p>
                            <p>However, the benefits extend beyond just SEO. By publishing content on well-respected sites, your brand gains exposure to a broader audience.</p>
                            <p>Moreover, this not only drives more traffic to your website but also raises your brand's reputation. Over time, as we publish more guest posts, your website's authority will grow, leading to a sustainable increase in organic traffic.</p>
                            <p>Additionally, by offering valuable content to readers through guest posts, you're also building a positive relationship with potential customers. They'll see your brand as an expert and a helpful resource in your industry, which can lead to increased customer trust and higher conversion rates.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                            Take the First Step Towards Boosting Your Online Presence Today!
                        </h2>
                        <div className="prose max-w-none text-gray-700">
                            <p>Ready to supercharge your SEO strategy and enhance your brand's online presence? Let our authority guest post service pave the way to your success. It's time to get your brand in front of a broader audience on high-authority sites.</p>
                            <p>Don't wait to start your journey towards higher search engine rankings and increased website traffic. Get in touch with us today. We're excited to work with you and help you reach new heights in your digital marketing efforts. Your online success is just a click away!</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}