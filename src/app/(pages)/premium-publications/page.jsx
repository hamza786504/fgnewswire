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
              Feature Your Story on Top Platforms.

            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Get your content featured on high-authority websites to maximize visibility, credibility, and impact for your brand.
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
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              Welcome to FG Newswire
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                FG Newswire is your go-to platform for sharing stories, press releases,
                and guest posts on trusted websites. With our services, you can easily
                publish your content, connect with your target audience, and improve
                your brand’s online presence.
              </p>
              <p>
                Whether you’re announcing a new product, sharing company news, or posting
                insightful articles, we make it simple and effective.
              </p>
            </div>
          </div>

          {/* Why Choose FG Newswire */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              Why Choose FG Newswire
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Our platform is designed to give you the maximum exposure with minimum
                effort. We focus on quality, authority, and results, ensuring that your
                content reaches the right audience.
              </p>
              <p>
                Every guest post or press release is placed on high-authority websites,
                helping you improve SEO, attract traffic, and build trust. With FG
                Newswire, your news doesn’t just get published — it gets noticed.
              </p>
              <p>
                We work with businesses of all sizes, offering flexible packages and
                personalized support so you can achieve your goals without hassle.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              Benefits of Using FG Newswire
            </h2>
            <div className="prose max-w-none text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Reach a Wider Audience:</strong> Get your content in front of
                  real readers on trusted websites.
                </li>
                <li>
                  <strong>Boost Your SEO:</strong> High-quality backlinks improve search
                  engine rankings.
                </li>
                <li>
                  <strong>Build Brand Credibility:</strong> Publishing on reputable
                  platforms strengthens your authority.
                </li>
                <li>
                  <strong>Fast and Efficient:</strong> Content gets live quickly, giving
                  you immediate results.
                </li>
                <li>
                  <strong>Affordable and Flexible:</strong> Plans for every budget and
                  business size.
                </li>
              </ul>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              How FG Newswire Works
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Get featured on top-tier, high-authority websites to give your content
                maximum visibility and impact. We ensure your articles, press releases,
                and guest posts reach the right audience, boosting both traffic and
                credibility.
              </p>

              <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                Step 1: Choose Your Service
              </h3>
              <p>
                Select either guest posting or press release distribution depending on
                your goals.
              </p>

              <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                Step 2: Share Your Content
              </h3>
              <p>
                Provide your article, news, or topic details. If needed, our team can
                write it for you.
              </p>

              <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                Step 3: Review & Approve
              </h3>
              <p>
                We draft the content and let you review it before publication.
              </p>

              <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                Step 4: Publish on Trusted Sites
              </h3>
              <p>
                Your content is published on high-authority websites relevant to your
                niche.
              </p>

              <h3 className="text-xl font-semibold mt-6 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
                Step 5: Track Your Results
              </h3>
              <p>
                Receive live links and performance reports to measure visibility,
                traffic, and engagement.
              </p>

              <p className="mt-4">
                Our premium publications are handpicked for relevance, authority, and
                engagement, helping you establish your brand as a trusted voice in your
                industry.
              </p>
            </div>
          </div>

          {/* Our Services */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              Our Services
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                FG Newswire offers two main services to help your brand grow:{" "}
                <strong>Guest Posting</strong> and{" "}
                <strong>Press Release Distribution</strong>. Each service is designed to
                maximize your reach, improve SEO, and build credibility.
              </p>
              <p>
                Our guest posting service places your articles on high-quality websites,
                giving you valuable backlinks and attracting new visitors. Meanwhile,
                our press release service ensures that your news is delivered to
                journalists, bloggers, and readers who matter most.
              </p>
              <p>
                With both services, you get professional content, fast publishing, and
                measurable results, all tailored to your brand’s unique needs.
              </p>
            </div>
          </div>

          {/* Get Started */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent">
              Get Started with FG Newswire
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Starting with FG Newswire is simple and hassle-free. Choose a plan,
                share your content, and let our team handle the rest.
              </p>
              <p>
                Whether you’re a small startup or an established brand, we provide the
                tools, guidance, and support to ensure your news reaches the right
                audience and generates measurable results.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}