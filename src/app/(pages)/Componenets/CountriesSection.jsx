"use client";

import { useEffect, useState } from "react";

const FILTERS = ["All", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
const countries = [
  { "name": "Afghanistan", "flag": "https://flagcdn.com/w40/af.png", "continent": "Asia" },
  { "name": "Albania", "flag": "https://flagcdn.com/w40/al.png", "continent": "Europe" },
  { "name": "Algeria", "flag": "https://flagcdn.com/w40/dz.png", "continent": "Africa" },
  { "name": "Andorra", "flag": "https://flagcdn.com/w40/ad.png", "continent": "Europe" },
  { "name": "Angola", "flag": "https://flagcdn.com/w40/ao.png", "continent": "Africa" },
  { "name": "Antigua and Barbuda", "flag": "https://flagcdn.com/w40/ag.png", "continent": "North America" },
  { "name": "Argentina", "flag": "https://flagcdn.com/w40/ar.png", "continent": "South America" },
  { "name": "Armenia", "flag": "https://flagcdn.com/w40/am.png", "continent": "Asia" },
  { "name": "Australia", "flag": "https://flagcdn.com/w40/au.png", "continent": "Oceania" },
  { "name": "Austria", "flag": "https://flagcdn.com/w40/at.png", "continent": "Europe" },
  { "name": "Azerbaijan", "flag": "https://flagcdn.com/w40/az.png", "continent": "Asia" },
  { "name": "Bahamas", "flag": "https://flagcdn.com/w40/bs.png", "continent": "North America" },
  { "name": "Bahrain", "flag": "https://flagcdn.com/w40/bh.png", "continent": "Asia" },
  { "name": "Bangladesh", "flag": "https://flagcdn.com/w40/bd.png", "continent": "Asia" },
  { "name": "Barbados", "flag": "https://flagcdn.com/w40/bb.png", "continent": "North America" },
  { "name": "Belarus", "flag": "https://flagcdn.com/w40/by.png", "continent": "Europe" },
  { "name": "Belgium", "flag": "https://flagcdn.com/w40/be.png", "continent": "Europe" },
  { "name": "Belize", "flag": "https://flagcdn.com/w40/bz.png", "continent": "North America" },
  { "name": "Benin", "flag": "https://flagcdn.com/w40/bj.png", "continent": "Africa" },
  { "name": "Bhutan", "flag": "https://flagcdn.com/w40/bt.png", "continent": "Asia" },
  { "name": "Bolivia", "flag": "https://flagcdn.com/w40/bo.png", "continent": "South America" },
  { "name": "Bosnia and Herzegovina", "flag": "https://flagcdn.com/w40/ba.png", "continent": "Europe" },
  { "name": "Botswana", "flag": "https://flagcdn.com/w40/bw.png", "continent": "Africa" },
  { "name": "Brazil", "flag": "https://flagcdn.com/w40/br.png", "continent": "South America" },
  { "name": "Brunei", "flag": "https://flagcdn.com/w40/bn.png", "continent": "Asia" },
  { "name": "Bulgaria", "flag": "https://flagcdn.com/w40/bg.png", "continent": "Europe" },
  { "name": "Burkina Faso", "flag": "https://flagcdn.com/w40/bf.png", "continent": "Africa" },
  { "name": "Burundi", "flag": "https://flagcdn.com/w40/bi.png", "continent": "Africa" },
  { "name": "Cabo Verde", "flag": "https://flagcdn.com/w40/cv.png", "continent": "Africa" },
  { "name": "Cambodia", "flag": "https://flagcdn.com/w40/kh.png", "continent": "Asia" },
  { "name": "Cameroon", "flag": "https://flagcdn.com/w40/cm.png", "continent": "Africa" },
  { "name": "Canada", "flag": "https://flagcdn.com/w40/ca.png", "continent": "North America" },
  { "name": "Central African Republic", "flag": "https://flagcdn.com/w40/cf.png", "continent": "Africa" },
  { "name": "Chad", "flag": "https://flagcdn.com/w40/td.png", "continent": "Africa" },
  { "name": "Chile", "flag": "https://flagcdn.com/w40/cl.png", "continent": "South America" },
  { "name": "China", "flag": "https://flagcdn.com/w40/cn.png", "continent": "Asia" },
  { "name": "Colombia", "flag": "https://flagcdn.com/w40/co.png", "continent": "South America" },
  { "name": "Comoros", "flag": "https://flagcdn.com/w40/km.png", "continent": "Africa" },
  { "name": "Costa Rica", "flag": "https://flagcdn.com/w40/cr.png", "continent": "North America" },
  { "name": "Croatia", "flag": "https://flagcdn.com/w40/hr.png", "continent": "Europe" },
  { "name": "Cuba", "flag": "https://flagcdn.com/w40/cu.png", "continent": "North America" },
  { "name": "Cyprus", "flag": "https://flagcdn.com/w40/cy.png", "continent": "Asia" },
  { "name": "Czech Republic", "flag": "https://flagcdn.com/w40/cz.png", "continent": "Europe" },
  { "name": "Democratic Republic of the Congo", "flag": "https://flagcdn.com/w40/cd.png", "continent": "Africa" },
  { "name": "Denmark", "flag": "https://flagcdn.com/w40/dk.png", "continent": "Europe" },
  { "name": "Djibouti", "flag": "https://flagcdn.com/w40/dj.png", "continent": "Africa" },
  { "name": "Dominica", "flag": "https://flagcdn.com/w40/dm.png", "continent": "North America" },
  { "name": "Dominican Republic", "flag": "https://flagcdn.com/w40/do.png", "continent": "North America" },
  { "name": "Ecuador", "flag": "https://flagcdn.com/w40/ec.png", "continent": "South America" },
  { "name": "Egypt", "flag": "https://flagcdn.com/w40/eg.png", "continent": "Africa" },
  { "name": "El Salvador", "flag": "https://flagcdn.com/w40/sv.png", "continent": "North America" },
  { "name": "Equatorial Guinea", "flag": "https://flagcdn.com/w40/gq.png", "continent": "Africa" },
  { "name": "Eritrea", "flag": "https://flagcdn.com/w40/er.png", "continent": "Africa" },
  { "name": "Estonia", "flag": "https://flagcdn.com/w40/ee.png", "continent": "Europe" },
  { "name": "Eswatini", "flag": "https://flagcdn.com/w40/sz.png", "continent": "Africa" },
  { "name": "Ethiopia", "flag": "https://flagcdn.com/w40/et.png", "continent": "Africa" },
  { "name": "Fiji", "flag": "https://flagcdn.com/w40/fj.png", "continent": "Oceania" },
  { "name": "Finland", "flag": "https://flagcdn.com/w40/fi.png", "continent": "Europe" },
  { "name": "France", "flag": "https://flagcdn.com/w40/fr.png", "continent": "Europe" },
  { "name": "Gabon", "flag": "https://flagcdn.com/w40/ga.png", "continent": "Africa" },
  { "name": "Gambia", "flag": "https://flagcdn.com/w40/gm.png", "continent": "Africa" },
  { "name": "Georgia", "flag": "https://flagcdn.com/w40/ge.png", "continent": "Asia" },
  { "name": "Germany", "flag": "https://flagcdn.com/w40/de.png", "continent": "Europe" },
  { "name": "Ghana", "flag": "https://flagcdn.com/w40/gh.png", "continent": "Africa" },
  { "name": "Greece", "flag": "https://flagcdn.com/w40/gr.png", "continent": "Europe" },
  { "name": "Grenada", "flag": "https://flagcdn.com/w40/gd.png", "continent": "North America" },
  { "name": "Guatemala", "flag": "https://flagcdn.com/w40/gt.png", "continent": "North America" },
  { "name": "Guinea", "flag": "https://flagcdn.com/w40/gn.png", "continent": "Africa" },
  { "name": "Guinea-Bissau", "flag": "https://flagcdn.com/w40/gw.png", "continent": "Africa" },
  { "name": "Guyana", "flag": "https://flagcdn.com/w40/gy.png", "continent": "South America" },
  { "name": "Haiti", "flag": "https://flagcdn.com/w40/ht.png", "continent": "North America" },
  { "name": "Honduras", "flag": "https://flagcdn.com/w40/hn.png", "continent": "North America" },
  { "name": "Hungary", "flag": "https://flagcdn.com/w40/hu.png", "continent": "Europe" },
  { "name": "Iceland", "flag": "https://flagcdn.com/w40/is.png", "continent": "Europe" },
  { "name": "India", "flag": "https://flagcdn.com/w40/in.png", "continent": "Asia" },
  { "name": "Indonesia", "flag": "https://flagcdn.com/w40/id.png", "continent": "Asia" },
  { "name": "Iran", "flag": "https://flagcdn.com/w40/ir.png", "continent": "Asia" },
  { "name": "Iraq", "flag": "https://flagcdn.com/w40/iq.png", "continent": "Asia" },
  { "name": "Ireland", "flag": "https://flagcdn.com/w40/ie.png", "continent": "Europe" },
  { "name": "Israel", "flag": "https://flagcdn.com/w40/il.png", "continent": "Asia" },
  { "name": "Italy", "flag": "https://flagcdn.com/w40/it.png", "continent": "Europe" },
  { "name": "Jamaica", "flag": "https://flagcdn.com/w40/jm.png", "continent": "North America" },
  { "name": "Japan", "flag": "https://flagcdn.com/w40/jp.png", "continent": "Asia" },
  { "name": "Jordan", "flag": "https://flagcdn.com/w40/jo.png", "continent": "Asia" },
  { "name": "Kazakhstan", "flag": "https://flagcdn.com/w40/kz.png", "continent": "Asia" },
  { "name": "Kenya", "flag": "https://flagcdn.com/w40/ke.png", "continent": "Africa" },
  { "name": "Kiribati", "flag": "https://flagcdn.com/w40/ki.png", "continent": "Oceania" },
  { "name": "Kuwait", "flag": "https://flagcdn.com/w40/kw.png", "continent": "Asia" },
  { "name": "Kyrgyzstan", "flag": "https://flagcdn.com/w40/kg.png", "continent": "Asia" },
  { "name": "Laos", "flag": "https://flagcdn.com/w40/la.png", "continent": "Asia" },
  { "name": "Latvia", "flag": "https://flagcdn.com/w40/lv.png", "continent": "Europe" },
  { "name": "Lebanon", "flag": "https://flagcdn.com/w40/lb.png", "continent": "Asia" },
  { "name": "Lesotho", "flag": "https://flagcdn.com/w40/ls.png", "continent": "Africa" },
  { "name": "Liberia", "flag": "https://flagcdn.com/w40/lr.png", "continent": "Africa" },
  { "name": "Libya", "flag": "https://flagcdn.com/w40/ly.png", "continent": "Africa" },
  { "name": "Liechtenstein", "flag": "https://flagcdn.com/w40/li.png", "continent": "Europe" },
  { "name": "Lithuania", "flag": "https://flagcdn.com/w40/lt.png", "continent": "Europe" },
  { "name": "Luxembourg", "flag": "https://flagcdn.com/w40/lu.png", "continent": "Europe" },
  { "name": "Madagascar", "flag": "https://flagcdn.com/w40/mg.png", "continent": "Africa" },
  { "name": "Malawi", "flag": "https://flagcdn.com/w40/mw.png", "continent": "Africa" },
  { "name": "Malaysia", "flag": "https://flagcdn.com/w40/my.png", "continent": "Asia" },
  { "name": "Maldives", "flag": "https://flagcdn.com/w40/mv.png", "continent": "Asia" },
  { "name": "Mali", "flag": "https://flagcdn.com/w40/ml.png", "continent": "Africa" },
  { "name": "Malta", "flag": "https://flagcdn.com/w40/mt.png", "continent": "Europe" },
  { "name": "Marshall Islands", "flag": "https://flagcdn.com/w40/mh.png", "continent": "Oceania" },
  { "name": "Mauritania", "flag": "https://flagcdn.com/w40/mr.png", "continent": "Africa" },
  { "name": "Mauritius", "flag": "https://flagcdn.com/w40/mu.png", "continent": "Africa" },
  { "name": "Mexico", "flag": "https://flagcdn.com/w40/mx.png", "continent": "North America" },
  { "name": "Micronesia", "flag": "https://flagcdn.com/w40/fm.png", "continent": "Oceania" },
  { "name": "Moldova", "flag": "https://flagcdn.com/w40/md.png", "continent": "Europe" },
  { "name": "Monaco", "flag": "https://flagcdn.com/w40/mc.png", "continent": "Europe" },
  { "name": "Mongolia", "flag": "https://flagcdn.com/w40/mn.png", "continent": "Asia" },
  { "name": "Montenegro", "flag": "https://flagcdn.com/w40/me.png", "continent": "Europe" },
  { "name": "Morocco", "flag": "https://flagcdn.com/w40/ma.png", "continent": "Africa" },
  { "name": "Mozambique", "flag": "https://flagcdn.com/w40/mz.png", "continent": "Africa" },
  { "name": "Myanmar", "flag": "https://flagcdn.com/w40/mm.png", "continent": "Asia" },
  { "name": "Namibia", "flag": "https://flagcdn.com/w40/na.png", "continent": "Africa" },
  { "name": "Nauru", "flag": "https://flagcdn.com/w40/nr.png", "continent": "Oceania" },
  { "name": "Nepal", "flag": "https://flagcdn.com/w40/np.png", "continent": "Asia" },
  { "name": "Netherlands", "flag": "https://flagcdn.com/w40/nl.png", "continent": "Europe" },
  { "name": "New Zealand", "flag": "https://flagcdn.com/w40/nz.png", "continent": "Oceania" },
  { "name": "Nicaragua", "flag": "https://flagcdn.com/w40/ni.png", "continent": "North America" },
  { "name": "Niger", "flag": "https://flagcdn.com/w40/ne.png", "continent": "Africa" },
  { "name": "Nigeria", "flag": "https://flagcdn.com/w40/ng.png", "continent": "Africa" },
  { "name": "North Korea", "flag": "https://flagcdn.com/w40/kp.png", "continent": "Asia" },
  { "name": "North Macedonia", "flag": "https://flagcdn.com/w40/mk.png", "continent": "Europe" },
  { "name": "Norway", "flag": "https://flagcdn.com/w40/no.png", "continent": "Europe" },
  { "name": "Oman", "flag": "https://flagcdn.com/w40/om.png", "continent": "Asia" },
  { "name": "Pakistan", "flag": "https://flagcdn.com/w40/pk.png", "continent": "Asia" },
  { "name": "Palau", "flag": "https://flagcdn.com/w40/pw.png", "continent": "Oceania" },
  { "name": "Palestine", "flag": "https://flagcdn.com/w40/ps.png", "continent": "Asia" },
  { "name": "Panama", "flag": "https://flagcdn.com/w40/pa.png", "continent": "North America" },
  { "name": "Papua New Guinea", "flag": "https://flagcdn.com/w40/pg.png", "continent": "Oceania" },
  { "name": "Paraguay", "flag": "https://flagcdn.com/w40/py.png", "continent": "South America" },
  { "name": "Peru", "flag": "https://flagcdn.com/w40/pe.png", "continent": "South America" },
  { "name": "Philippines", "flag": "https://flagcdn.com/w40/ph.png", "continent": "Asia" },
  { "name": "Poland", "flag": "https://flagcdn.com/w40/pl.png", "continent": "Europe" },
  { "name": "Portugal", "flag": "https://flagcdn.com/w40/pt.png", "continent": "Europe" },
  { "name": "Qatar", "flag": "https://flagcdn.com/w40/qa.png", "continent": "Asia" },
  { "name": "Republic of the Congo", "flag": "https://flagcdn.com/w40/cg.png", "continent": "Africa" },
  { "name": "Romania", "flag": "https://flagcdn.com/w40/ro.png", "continent": "Europe" },
  { "name": "Russia", "flag": "https://flagcdn.com/w40/ru.png", "continent": "Europe" },
  { "name": "Rwanda", "flag": "https://flagcdn.com/w40/rw.png", "continent": "Africa" },
  { "name": "Saint Kitts and Nevis", "flag": "https://flagcdn.com/w40/kn.png", "continent": "North America" },
  { "name": "Saint Lucia", "flag": "https://flagcdn.com/w40/lc.png", "continent": "North America" },
  { "name": "Saint Vincent and the Grenadines", "flag": "https://flagcdn.com/w40/vc.png", "continent": "North America" },
  { "name": "Samoa", "flag": "https://flagcdn.com/w40/ws.png", "continent": "Oceania" },
  { "name": "San Marino", "flag": "https://flagcdn.com/w40/sm.png", "continent": "Europe" },
  { "name": "Sao Tome and Principe", "flag": "https://flagcdn.com/w40/st.png", "continent": "Africa" },
  { "name": "Saudi Arabia", "flag": "https://flagcdn.com/w40/sa.png", "continent": "Asia" },
  { "name": "Senegal", "flag": "https://flagcdn.com/w40/sn.png", "continent": "Africa" },
  { "name": "Serbia", "flag": "https://flagcdn.com/w40/rs.png", "continent": "Europe" },
  { "name": "Seychelles", "flag": "https://flagcdn.com/w40/sc.png", "continent": "Africa" },
  { "name": "Sierra Leone", "flag": "https://flagcdn.com/w40/sl.png", "continent": "Africa" },
  { "name": "Singapore", "flag": "https://flagcdn.com/w40/sg.png", "continent": "Asia" },
  { "name": "Slovakia", "flag": "https://flagcdn.com/w40/sk.png", "continent": "Europe" },
  { "name": "Slovenia", "flag": "https://flagcdn.com/w40/si.png", "continent": "Europe" },
  { "name": "Solomon Islands", "flag": "https://flagcdn.com/w40/sb.png", "continent": "Oceania" },
  { "name": "Somalia", "flag": "https://flagcdn.com/w40/so.png", "continent": "Africa" },
  { "name": "South Africa", "flag": "https://flagcdn.com/w40/za.png", "continent": "Africa" },
  { "name": "South Korea", "flag": "https://flagcdn.com/w40/kr.png", "continent": "Asia" },
  { "name": "South Sudan", "flag": "https://flagcdn.com/w40/ss.png", "continent": "Africa" },
  { "name": "Spain", "flag": "https://flagcdn.com/w40/es.png", "continent": "Europe" },
  { "name": "Sri Lanka", "flag": "https://flagcdn.com/w40/lk.png", "continent": "Asia" },
  { "name": "Sudan", "flag": "https://flagcdn.com/w40/sd.png", "continent": "Africa" },
  { "name": "Suriname", "flag": "https://flagcdn.com/w40/sr.png", "continent": "South America" },
  { "name": "Sweden", "flag": "https://flagcdn.com/w40/se.png", "continent": "Europe" },
  { "name": "Switzerland", "flag": "https://flagcdn.com/w40/ch.png", "continent": "Europe" },
  { "name": "Syria", "flag": "https://flagcdn.com/w40/sy.png", "continent": "Asia" },
  { "name": "Tajikistan", "flag": "https://flagcdn.com/w40/tj.png", "continent": "Asia" },
  { "name": "Tanzania", "flag": "https://flagcdn.com/w40/tz.png", "continent": "Africa" },
  { "name": "Thailand", "flag": "https://flagcdn.com/w40/th.png", "continent": "Asia" },
  { "name": "Timor-Leste", "flag": "https://flagcdn.com/w40/tl.png", "continent": "Asia" },
  { "name": "Togo", "flag": "https://flagcdn.com/w40/tg.png", "continent": "Africa" },
  { "name": "Tonga", "flag": "https://flagcdn.com/w40/to.png", "continent": "Oceania" },
  { "name": "Trinidad and Tobago", "flag": "https://flagcdn.com/w40/tt.png", "continent": "North America" },
  { "name": "Tunisia", "flag": "https://flagcdn.com/w40/tn.png", "continent": "Africa" },
  { "name": "Turkey", "flag": "https://flagcdn.com/w40/tr.png", "continent": "Asia" },
  { "name": "Turkmenistan", "flag": "https://flagcdn.com/w40/tm.png", "continent": "Asia" },
  { "name": "Tuvalu", "flag": "https://flagcdn.com/w40/tv.png", "continent": "Oceania" },
  { "name": "Uganda", "flag": "https://flagcdn.com/w40/ug.png", "continent": "Africa" },
  { "name": "Ukraine", "flag": "https://flagcdn.com/w40/ua.png", "continent": "Europe" },
  { "name": "United Arab Emirates", "flag": "https://flagcdn.com/w40/ae.png", "continent": "Asia" },
  { "name": "United Kingdom", "flag": "https://flagcdn.com/w40/gb.png", "continent": "Europe" },
  { "name": "United States", "flag": "https://flagcdn.com/w40/us.png", "continent": "North America" },
  { "name": "Uruguay", "flag": "https://flagcdn.com/w40/uy.png", "continent": "South America" },
  { "name": "Uzbekistan", "flag": "https://flagcdn.com/w40/uz.png", "continent": "Asia" },
  { "name": "Vanuatu", "flag": "https://flagcdn.com/w40/vu.png", "continent": "Oceania" },
  { "name": "Vatican City", "flag": "https://flagcdn.com/w40/va.png", "continent": "Europe" },
  { "name": "Venezuela", "flag": "https://flagcdn.com/w40/ve.png", "continent": "South America" },
  { "name": "Vietnam", "flag": "https://flagcdn.com/w40/vn.png", "continent": "Asia" },
  { "name": "Yemen", "flag": "https://flagcdn.com/w40/ye.png", "continent": "Asia" },
  { "name": "Zambia", "flag": "https://flagcdn.com/w40/zm.png", "continent": "Africa" },
  { "name": "Zimbabwe", "flag": "https://flagcdn.com/w40/zw.png", "continent": "Africa" }
]

export default function CountriesSection() {
  const [activeFilter, setActiveFilter] = useState("All");


  const filteredCountries =
    activeFilter === "All"
      ? countries
      : countries.filter((c) => c.continent === activeFilter);


  return (
    <section className="py-16 px-6 md:px-12 lg:px-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Explore {" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Top Websites 
        </span>
        {" "}by Country
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Find and explore high-traffic websites in different countries to target your audience effectively.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 border-b pb-4">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeFilter === filter
                ? "text-white bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Countries Grid */}
      <div className="flex flex-row flex-wrap justify-center items-start gap-4">
        {filteredCountries.map((country, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-3 py-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              src={country.flag}
              alt={country.name}
              className="w-6 h-4 object-cover rounded-sm"
            />
            <span className="text-xs font-medium">{country.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
